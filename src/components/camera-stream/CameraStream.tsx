
//Ngang có thông báobáo
// import { useState, useEffect, useRef } from "react";
// import CameraStatus from "./CameraStatus";
// import { useNotification } from "../../contexts/NotificationContext";

// const API_URL = "http://127.0.0.1:8000";

// const CameraStream = ({ camIds }: { camIds: string[] }) => {
//     const { addNotification } = useNotification();
//     const [frames, setFrames] = useState<{ [key: string]: string }>({});
//     const [detections, setDetections] = useState<{ [key: string]: number }>({});
//     const [abnormalDetections, setAbnormalDetections] = useState<{ [key: string]: any[] }>({});
//     const [personDetected, setPersonDetected] = useState<{ [key: string]: boolean }>({});
//     const isProcessing = useRef<{ [key: string]: boolean }>({});

//     useEffect(() => {
//         camIds.forEach((camId) => {
//             const WS_URL = `ws://localhost:8765/${camId}`;
//             const ws = new WebSocket(WS_URL);

//             ws.onmessage = (event) => {
//                 const data = JSON.parse(event.data);

//                 if (data.type === "video_frame" && !isProcessing.current[camId]) {
//                     setFrames((prev) => ({ ...prev, [camId]: `data:image/jpeg;base64,${data.frame}` }));
//                     isProcessing.current[camId] = true;
//                     sendFrameToApi(camId, data.frame);
//                 }
//             };

//             ws.onopen = () => console.log(`Connected to WebSocket server for ${camId}`);
//             ws.onclose = () => console.log(`Disconnected from WebSocket server for ${camId}`);

//             return () => ws.close();
//         });
//     }, [camIds]);

//     const sendFrameToApi = async (camId: string, frame: any) => {
//         const formData = new FormData();
//         formData.append("file", dataURItoBlob(`data:image/jpeg;base64,${frame}`), "frame.jpg");

//         try {
//             const response = await fetch(`${API_URL}/detect`, { method: "POST", body: formData });
//             const result = await response.json();
//             if (result.person_detected) {
//                 addNotification("Phát hiện bất thường", `Có người xuất hiện trong khu vực ${camId}!`);
//                 setDetections((prev) => ({ ...prev, [camId]: (prev[camId] || 0) + 1 }));
//                 setAbnormalDetections((prev) => ({
//                     ...prev,
//                     [camId]: [
//                         ...(prev[camId] || []),
//                         {
//                             imageUrl: `data:image/jpeg;base64,${frame}`,
//                             title: "Phát hiện bất thường",
//                             timestamp: new Date().toLocaleString(),
//                             description: "Phát hiện có người xuất hiện trong khu vực.",
//                             link: "#",
//                         },
//                     ],
//                 }));
//                 setPersonDetected((prev) => ({ ...prev, [camId]: true }));
//             } else {
//                 setPersonDetected((prev) => ({ ...prev, [camId]: false }));
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         } finally {
//             isProcessing.current[camId] = false;
//         }
//     };

//     const dataURItoBlob = (dataURI: string) => {
//         const byteString = atob(dataURI.split(",")[1]);
//         const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: mimeString });
//     };

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start max-h-[900px] h-full">
//             {camIds.map((camId) => (
//                 <div key={camId} className="text-left flex flex-col h-full relative">
//                     <div className="relative">
//                         <img src={frames[camId]} alt={`Camera ${camId}`} className="w-full h-full max-h-[500px] object-contain" />
//                         <p className="absolute bottom-4 left-4 bg-gray-400 text-white text-sm px-2 py-1 rounded-md">{camId}</p>
//                         <p className={`absolute top-4 left-4 text-white text-lg font-bold px-4 py-2 rounded-md ${personDetected[camId] ? 'bg-red-500' : 'bg-green-500'}`}>{personDetected[camId] ? "Có người!" : "Không có người"}</p>
//                     </div>
//                     <CameraStatus
//                         totalAnimals={10010}
//                         detections={detections[camId] || 0}
//                         abnormalDetections={abnormalDetections[camId] || []}
//                     />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default CameraStream;





//Thẳng có thông báo
import { useState, useEffect, useRef } from "react";
import CameraStatus from "./CameraStatus";
import { useNotification } from "../../contexts/NotificationContext";

const API_URL = "http://127.0.0.1:8000";

const CameraStream = ({ camId }: { camId: string}) => {
    const { addNotification } = useNotification();
    const [frames, setFrames] = useState("");
    const [detections, setDetections] = useState(0);
    const [abnormalDetections, setAbnormalDetections] = useState<
    { imageUrl: string; title: string; timestamp: string; description: string; link: string; }[]
>([]);

    const [personDetected, setPersonDetected] = useState(false);
    const isProcessing = useRef<{ [key: string]: boolean }>({});

    useEffect(() => {
            const WS_URL = `ws://localhost:8765/${camId}`;
            const ws = new WebSocket(WS_URL);

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type === "video_frame" && !isProcessing.current[camId]) {
                    setFrames(`data:image/jpeg;base64,${data.frame}`);
                    isProcessing.current[camId] = true;
                    sendFrameToApi(camId, data.frame);
                }
            };

            ws.onopen = () => console.log(`Connected to WebSocket server for ${camId}`);
            ws.onclose = () => console.log(`Disconnected from WebSocket server for ${camId}`);

            return () => ws.close();
   
        }, [camId]);

    const sendFrameToApi = async (camId: string, frame: any) => {
        const formData = new FormData();
        formData.append("file", dataURItoBlob(`data:image/jpeg;base64,${frame}`), "frame.jpg");

        try {
            const response = await fetch(`${API_URL}/detect`, { method: "POST", body: formData });
            const result = await response.json();
            if (result.person_detected) {
                addNotification("Phát hiện bất thường", `Có người xuất hiện trong khu vực ${camId}!`);
                setDetections((prev) => prev + 1);
                setAbnormalDetections((prev) => [
                    ...prev,
                    {
                        imageUrl: `data:image/jpeg;base64,${frame}`,
                        title: "Phát hiện bất thường",
                        timestamp: new Date().toLocaleString(),
                        description: "Phát hiện có người xuất hiện trong khu vực.",
                        link: "#",
                    },
                ]);
                setPersonDetected(true);
            } else {
                setPersonDetected(false);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            isProcessing.current[camId] = false;
        }
    };

    const dataURItoBlob = (dataURI: string) => {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start max-h-[900px] h-full">
                    <div className="text-left md:col-span-2 flex flex-col h-full">
                        <div style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
                        {personDetected ? "Có người!" : "Không có người"}
                        </div>
                        <div className="relative">
                            <img src={frames} alt="Camera Feed" className="w-full h-full max-h-[500px] object-contain" />
                            <p className="absolute bottom-4 left-4 bg-gray-400 text-white text-sm px-2 py-1 rounded-md">{camId}</p>
                        </div>
                        
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:col-span-1 self-start h-auto min-h-0">
                        <CameraStatus
                            totalAnimals={10010}
                            // noChangeMessage={detections > 0 ? `Số lượng giảm ${detections}` : "Số lượng không thay đổi"}
                            detections={detections}
                            abnormalDetections={abnormalDetections}
                            personDetected={personDetected}
                        />
                    </div>
        
                </div>
    );
};

export default CameraStream;

