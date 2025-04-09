
 // C:\Users\ADMIN>curl -4 ifconfig.me

import React, { useEffect, useRef, useState } from "react";
import { useNotification } from "../../contexts/NotificationContext";

interface CameraStreamProps {
  camId: string;
  onAbnormalDetect?: (data: {
    _id: string;
    videoId: string;
    imageUrl: string;
    title: string;
    timestamp: string;
    description: string;
    link: string;
  }) => void;
}

const CameraStream: React.FC<CameraStreamProps> = ({ camId, onAbnormalDetect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [eventMessage, setEventMessage] = useState("Đang tải...");
  const [personCount, setPersonCount] = useState<number | null>(null);
  const [hasPerson, setHasPerson] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { addNotification } = useNotification();

  const handleGoToDetail = () => {
    window.location.href = `herds/2000/Chuong12D311/${camId}`;
  };


  const sendDetectRequest = async (imageData: string) => {
    try {
      const blob = dataURItoBlob(imageData);
      
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");
  
       await fetch("http://127.0.0.1:8000/detect", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Error sending detection request:", error);
    }
  };
  
  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: "image/jpeg" });
  };
  

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/stream/${camId}`);
    ws.binaryType = "arraybuffer";
    let timeout: ReturnType<typeof setTimeout>;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsConnected(false), 5000);
    };

    ws.onopen = () => {
      setIsConnected(true);
      resetTimeout();
    };

    ws.onmessage = (event) => {
      setIsConnected(true);
      resetTimeout();
      const bytes = new Uint8Array(event.data);
      const blob = new Blob([bytes], { type: "image/jpeg" });
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      img.onload = async () => {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx && canvasRef.current) {
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imageData = canvasRef.current.toDataURL("image/jpeg");
          
          // Gửi yêu cầu phát hiện người tới /detect
          await sendDetectRequest(imageData);
        }
      };
    };

    ws.onerror = () => setIsConnected(false);
    ws.onclose = () => setIsConnected(false);

    return () => {
      ws.close();
      clearTimeout(timeout);
    };
  }, [camId]);

  const wasPersonDetectedRef = useRef(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/latest_event/${camId}`);
        const data = await res.json();
        // setEventMessage(data.message || "Không có thông tin sự kiện");
        setHasPerson(data.currentCount > 0);

        if (data.currentCount !== undefined) {
          setPersonCount(data.currentCount);
        }

        if (
          data.currentCount > 0 &&
          !wasPersonDetectedRef.current &&
          canvasRef.current &&
          onAbnormalDetect
        ) {
          const canvas = canvasRef.current;
          const imageUrl = canvas.toDataURL("image/jpeg");
          onAbnormalDetect({
            _id: `${data._id}`,
            videoId: data.video_recorded,
            imageUrl,
            title: `Sự kiện: ${data.event_type} từ ${data.cameraID}`,
            timestamp: new Date().toLocaleString(),
            description: `${data.message} (${data.currentCount})`,
            link: `/camera/${data.cameraID}/events/${data._id}`,
          });

          addNotification(`PH bất thường - ${data.cameraID}`, `Có người xuất hiện (${data.currentCount}) ${new Date().toLocaleString()}`);
          wasPersonDetectedRef.current = true;
        }

        if (data.currentCount === 0) {
          wasPersonDetectedRef.current = false;
        }

      } catch (error) {
        console.log("err",error)
        // setEventMessage("Lỗi khi lấy sự kiện");
      }
    };

    fetchEvent();
    const interval = setInterval(fetchEvent, 3000);
    return () => clearInterval(interval);
  }, [camId, onAbnormalDetect, addNotification]);

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div
        className="w-full aspect-video bg-black relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <canvas ref={canvasRef} className="w-full h-full rounded-lg object-cover" />

        {!isConnected && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <span className="text-white text-sm font-semibold">Mất kết nối</span>
          </div>
        )}

        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 z-10">
            <button
              onClick={handleGoToDetail}
              className="bg-white text-sm px-3 py-2 rounded-lg shadow hover:bg-gray-100"
            >
              📄 Chi tiết
            </button>
          </div>
        )}
      </div>

      <div className="absolute top-2 left-2 bg-gray-100/60 text-white text-xs px-2 py-1 rounded">
        {camId}
      </div>

      <div className="absolute top-2 right-2 bg-white bg-opacity-80 text-gray-800 text-xs px-2 py-1 rounded flex items-center gap-2">
        <span className={`font-semibold ${hasPerson ? "text-green-600" : "text-red-500"}`}>
          {hasPerson ? "Có người" : "Không người"}
        </span>
        {personCount !== null && (
          <span className="text-gray-600 text-xs">({personCount})</span>
        )}
      </div>
    </div>
  );
};

export default CameraStream;


// import React, { useEffect, useRef, useState } from "react";
// import { useNotification } from "../../contexts/NotificationContext";

// interface CameraStreamProps {
//   camId: string;
//   onAbnormalDetect?: (data: {
//     _id: string;
//     videoId: string;
//     imageUrl: string;
//     title: string;
//     timestamp: string;
//     description: string;
//     link: string;
//   }) => void;
// }

// const CameraStream: React.FC<CameraStreamProps> = ({ camId, onAbnormalDetect }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [eventMessage, setEventMessage] = useState("Đang tải...");
//   const [personCount, setPersonCount] = useState<number | null>(null);
//   const [hasPerson, setHasPerson] = useState<boolean>(false);
//   const [isConnected, setIsConnected] = useState(true);
//   const [isHovered, setIsHovered] = useState(false);
//   const { addNotification } = useNotification();
  
//   const previousPersonCountRef = useRef<number | null>(null);  // Store previous person count

//   const handleGoToDetail = () => {
//     window.location.href = `herds/2000/Chuong12D311/${camId}`;
//   };

//   const sendDetectRequest = async (imageData: string) => {
//     try {
//       const blob = dataURItoBlob(imageData);
      
//       const formData = new FormData();
//       formData.append("file", blob, "image.jpg");
  
//       await fetch("http://127.0.0.1:8000/detect", {
//         method: "POST",
//         body: formData,
//       });
//     } catch (error) {
//       console.error("Error sending detection request:", error);
//     }
//   };

//   const dataURItoBlob = (dataURI: string) => {
//     const byteString = atob(dataURI.split(",")[1]);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const uintArray = new Uint8Array(arrayBuffer);
//     for (let i = 0; i < byteString.length; i++) {
//       uintArray[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([uintArray], { type: "image/jpeg" });
//   };

//   useEffect(() => {
//     const ws = new WebSocket(`ws://127.0.0.1:8000/stream/${camId}`);
//     ws.binaryType = "arraybuffer";
//     let timeout: ReturnType<typeof setTimeout>;

//     const resetTimeout = () => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => setIsConnected(false), 5000);
//     };

//     ws.onopen = () => {
//       setIsConnected(true);
//       resetTimeout();
//     };

//     ws.onmessage = (event) => {
//       setIsConnected(true);
//       resetTimeout();
//       const bytes = new Uint8Array(event.data);
//       const blob = new Blob([bytes], { type: "image/jpeg" });
//       const img = new Image();
//       img.src = URL.createObjectURL(blob);
//       img.onload = async () => {
//         const ctx = canvasRef.current?.getContext("2d");
//         if (ctx && canvasRef.current) {
//           canvasRef.current.width = img.width;
//           canvasRef.current.height = img.height;
//           ctx.drawImage(img, 0, 0);
//           const imageData = canvasRef.current.toDataURL("image/jpeg");

//           // Only send detect request when person count changes
//           if (previousPersonCountRef.current !== personCount) {
//             await sendDetectRequest(imageData);
//           }
//         }
//       };
//     };

//     ws.onerror = () => setIsConnected(false);
//     ws.onclose = () => setIsConnected(false);

//     return () => {
//       ws.close();
//       clearTimeout(timeout);
//     };
//   }, [camId, personCount]);  // Add personCount to the dependencies

//   const wasPersonDetectedRef = useRef(false);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await fetch(`http://127.0.0.1:8000/latest_event/${camId}`);
//         const data = await res.json();
//         setEventMessage(data.message || "Không có thông tin sự kiện");
//         setHasPerson(data.currentCount > 0);

//         if (data.currentCount !== undefined) {
//           setPersonCount(data.currentCount);
//         }

//         if (
//           data.currentCount > 0 &&
//           !wasPersonDetectedRef.current &&
//           canvasRef.current &&
//           onAbnormalDetect
//         ) {
//           const canvas = canvasRef.current;
//           const imageUrl = canvas.toDataURL("image/jpeg");
//           onAbnormalDetect({
//             _id: `${data._id}`,
//             videoId: data.video_recorded,
//             imageUrl,
//             title: `Sự kiện: ${data.event_type} từ ${data.cameraID}`,
//             timestamp: new Date().toLocaleString(),
//             description: `${data.message} (${data.currentCount})`,
//             link: `/camera/${data.cameraID}/events/${data._id}`,
//           });

//           addNotification(`PH bất thường - ${data.cameraID}`, `Có người xuất hiện (${data.currentCount}) ${new Date().toLocaleString()}`);
//           wasPersonDetectedRef.current = true;
//         }

//         if (data.currentCount === 0) {
//           wasPersonDetectedRef.current = false;
//         }

//       } catch (error) {
//         setEventMessage("Lỗi khi lấy sự kiện");
//       }
//     };

//     fetchEvent();
//     const interval = setInterval(fetchEvent, 3000);
//     return () => clearInterval(interval);
//   }, [camId, onAbnormalDetect, addNotification]);

//   return (
//     <div className="relative rounded-lg overflow-hidden">
//       <div
//         className="w-full aspect-video bg-black relative group"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <canvas ref={canvasRef} className="w-full h-full rounded-lg object-cover" />

//         {!isConnected && (
//           <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
//             <span className="text-white text-sm font-semibold">Mất kết nối</span>
//           </div>
//         )}

//         {isHovered && (
//           <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 z-10">
//             <button
//               onClick={handleGoToDetail}
//               className="bg-white text-sm px-3 py-2 rounded-lg shadow hover:bg-gray-100"
//             >
//               📄 Chi tiết
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="absolute top-2 left-2 bg-gray-100/60 text-white text-xs px-2 py-1 rounded">
//         {camId}
//       </div>

//       <div className="absolute top-2 right-2 bg-white bg-opacity-80 text-gray-800 text-xs px-2 py-1 rounded flex items-center gap-2">
//         <span className={`font-semibold ${hasPerson ? "text-green-600" : "text-red-500"}`}>
//           {hasPerson ? "Có người" : "Không người"}
//         </span>
//         {personCount !== null && (
//           <span className="text-gray-600 text-xs">({personCount})</span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CameraStream;
