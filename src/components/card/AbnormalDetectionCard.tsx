import React, { useState, useEffect } from "react";

interface EventData {
  _id?: { $oid: string };
  event_type?: string;
  cameraID?: string;
  event_time?: string;
  video_recorded?: string;
  previousCount?: number;
  currentCount?: number;
  snapshot_id?: string;
}

interface AbnormalDetectionCardProps {
  event?: EventData;
}

const AbnormalDetectionCard: React.FC<AbnormalDetectionCardProps> = ({ event }) => {
  if (!event) return null;

  const {
    event_type = "Alert",
    cameraID,
    event_time,
    video_recorded,
    previousCount,
    currentCount,
    snapshot_id,
  } = event;

  const timestamp = event_time ? new Date(event_time).toLocaleString() : "Invalid Date";
  const videoUrl = video_recorded ? `http://127.0.0.1:8000/api/videos/${video_recorded}` : null;
  const [showVideo, setShowVideo] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // Lưu trữ vị trí camera trong state
  const [cameraLocation, setCameraLocation] = useState<string>("Loading...");

  // Sử dụng useEffect để gọi API khi cameraID thay đổi
  useEffect(() => {
    if (cameraID) {
      // getCamLocation(cameraID).then(setCameraLocation).catch(() => setCameraLocation("Unknown Location"));
    }
  }, [cameraID]); // Gọi lại chỉ khi cameraID thay đổi

  // Hàm gọi API để lấy thông tin camera
  // const getCamLocation = async (cam_id: string): Promise<string> => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/cameras");
  //     const data = await response.json();

  //     const camera = data.cameras.find((camera: { _id: string }) => camera._id === cam_id);

  //     return camera?.location || "Unknown Location";
  //   } catch (error) {
  //     console.error("Error fetching camera location:", error);
  //     return "Unknown Location";
  //   }
  // };

  // Hàm để lấy tiêu đề sự kiện
  const getEventTitle = () => {
    switch (event_type) {
      case "Object leaving detected":
        if (cameraID === "PIG_CROSS_LINE_CAM") {
          return "Heo rời chuồng";
        }
        return "Người ra khỏi khu vực";
      
      case "Object count changes":
        return "Thay đổi số lượng đối tượng";

      case "Pig count changes":
        return "Số lượng heo thay đổi"; 

      case "Human detect":
        return "Phát hiện người";

      default:
        return event_type || "Alert";
    }
  };

  // Hàm để render chi tiết sự kiện
  const renderEventDetails = () => {
    switch (event_type) {
      case "Object leaving detected":
        if (cameraID === "PIG_CROSS_LINE_CAM") {
          return (
            <>
              <p className="text-[#F44336] text-sm mt-1">Camera: {cameraID}</p>
              <p className="text-[#F44336] text-sm mt-1">Địa điểm: Chuồng 1</p>
              {snapshot_id && (
                <button
                  onClick={() => setShowPopup(true)}
                  className="text-[#F44336] text-sm mt-1 underline cursor-pointer"
                >
                  Xem ảnh chụp
                </button>
              )}
            </>
          );
        } else {
          return (
            <>
              <p className="text-[#F44336] text-sm mt-1">Camera: {cameraID}</p>
              <p className="text-[#F44336] text-sm mt-1">Địa điểm: {cameraLocation}</p>
            </>
          );
        }
        
      case "Human detect":
        return (
          <>
            <p className="text-[#F44336] text-sm mt-1">Camera: {cameraID}</p>
            <p className="text-[#F44336] text-sm mt-1">Địa điểm {cameraLocation}</p>
            {video_recorded && (
              <>
                <div
                className="cursor-pointer gap-1 inline-flex transition mt-1 underline"
                onClick={() => {
                  window.open(
                    `http://localhost:8000/download/${video_recorded}`,
                    "_blank"
                  );
                }}
              >
                <p className="ml-2">Tải Video</p>
              </div>
              </>
            )}
          </>
        );

      case "Object count changes":
        return (
          <>
            <p className="text-[#F44336] text-sm mt-1">Camera: {cameraID}</p>
            <p className="text-[#F44336] text-sm mt-1">Địa điểm: {cameraLocation}</p>
            {previousCount !== undefined && currentCount !== undefined && (
              <p className="text-[#F44336] text-sm mt-1">
                Số lượng: {previousCount} ➡ {currentCount}
              </p>
            )}
          </>
        );

      case "Pig count changes":
        return (
          <>
            <p className="text-[#F44336] text-sm mt-1">Camera: {cameraID}</p>
            <p className="text-[#F44336] text-sm mt-1">Địa điểm: Chuồng 1</p>
            {previousCount !== undefined && currentCount !== undefined && (
              <p className="text-[#F44336] text-sm mt-1">
                Số lượng: {previousCount} ➡ {currentCount}
              </p>
            )}
          </>
        );

      default:
        return (
          <>
            {cameraID && <p className="text-[#F44336] text-sm mt-1">Camera: {cameraID}</p>}
            {(previousCount !== undefined && currentCount !== undefined) && (
              <p className="text-[#F44336] text-sm mt-1">
                Số lượng: {previousCount} ➡ {currentCount}
              </p>
            )}
            {video_recorded && (
              <div
                className="mt-1 underline cursor-pointer gap-1 inline-flex transition"
                onClick={() => {
                  window.open(
                    `http://localhost:8000/download/${video_recorded}`,
                    "_blank"
                  );
                }}
              >
                <p className="ml-2">Tải Video</p>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="flex border border-red-300 text-[#F44336] rounded-xl p-3 items-start bg-[#FFEBEE] shadow-md w-full">
      <div className="ml-2 flex flex-col text-left w-full">
        <h3 className="text-[#F44336] font-bold text-sm">Loại sự kiện: {getEventTitle()}</h3>
        <p className="text-[#F44336] text-xs italic">{timestamp}</p>

        {renderEventDetails()}
        {showPopup && snapshot_id && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg relative max-w-3xl w-full">
              <img
                src={`http://localhost:8000/snapshot/${snapshot_id}`}
                alt="Snapshot"
                className="max-w-full max-h-[80vh] mx-auto"
              />
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handlePopupClose}
                  className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded"
                >
                  Đóng
                </button>
                <a
                  href={`http://localhost:8000/snapshot/${snapshot_id}`}
                  download={snapshot_id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded"
                >
                  Tải hình
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbnormalDetectionCard;
