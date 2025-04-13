import React, { useState } from "react";

interface EventData {
  _id?: { $oid: string };
  event_type?: string;
  cameraID?: string;
  event_time?: string;
  video_recorded?: string;
  previousCount?: number;
  currentCount?: number;
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
  } = event;

  const timestamp = event_time ? new Date(event_time).toLocaleString() : "Invalid Date";
  const videoUrl = video_recorded ? `/api/videos/${video_recorded}` : null;
  const [showVideo, setShowVideo] = useState(false);

  const getCamLocation = async (cam_id: string): Promise<string> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/cameras");
      const data = await response.json();
  
      // Assuming the response contains a list of cameras in `data.cameras`
      const camera = data.cameras.find((camera: { _id: string }) => camera._id === cam_id);
  
      return camera?.location || "Unknown Location";
    } catch (error) {
      console.error("Error fetching camera location:", error);
      return "Unknown Location";
    }
  };

  const [cameraLocation, setCameraLocation] = React.useState<string>("Loading...");

  React.useEffect(() => {
    if (cameraID) {
      getCamLocation(cameraID).then(setCameraLocation).catch(() => setCameraLocation("Unknown Location"));
    }
  }, [cameraID]);

  const renderEventDetails = () => {
    switch (event_type) {
      case "Object leaving detected":
        return (
          <>
            <p className="text-[#F44336] text-sm mt-1">Camera: {cameraID}</p>
            <p className="text-[#F44336] text-sm mt-1">Phát hiện đối tượng rời khu vực {cameraLocation}</p>
          </>
        );
      
      case "Human detect":
        return (
          <>
            <p className="text-[#F44336] text-sm mt-1">Camera: {cameraID}</p>
            <p className="text-[#F44336] text-sm mt-1">Phát hiện người vào khu vực {cameraLocation}</p>
            {video_recorded && (
              <>
                <button
                  onClick={() => setShowVideo(true)}
                  className="text-[#F44336] text-sm font-medium mt-1 underline cursor-pointer"
                >
                  View recorded video
                </button>
                {showVideo && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                      <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-bold">Recorded Video - {cameraID}</h3>
                        <button 
                          onClick={() => setShowVideo(false)}
                          className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="p-4">
                        <video 
                          controls 
                          autoPlay 
                          className="w-full max-h-[70vh]"
                          onEnded={() => setShowVideo(false)}
                        >
                          <source src={videoUrl || undefined} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        );
      
      case "Object count changes":
        return (
          <>
            <p className="text-[#F44336] text-sm mt-1">Camera: {cameraID}</p>
            <p className="text-[#F44336] text-sm mt-1">Phát hiện thay đổi số lượng đối tượng tại {cameraLocation}</p>
            {previousCount !== undefined && currentCount !== undefined && (
              <p className="text-[#F44336] text-sm mt-1">
                Số lượng đổi từ {previousCount} sang {currentCount}
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
                Count: {previousCount} ➡ {currentCount}
              </p>
            )}
            {video_recorded && (
             <a
             href={`/api/videos/${video_recorded}`}
             target="_blank"
             rel="noopener noreferrer"
             className="text-[#F44336] text-sm font-medium mt-1 underline"
            >
                View recorded video
              </a>
            )}
          </>
        );
    }
  };

  return (
    <div className="flex border border-red-300 text-[#F44336] rounded-xl p-3 items-start bg-[#FFEBEE] shadow-md w-full">
      <div className="ml-2 flex flex-col text-left w-full">
        <h3 className="text-[#F44336] font-bold text-sm">{event_type}</h3>
        <p className="text-[#F44336] text-xs italic">{timestamp}</p>
        
        {/* Render specific details based on event type */}
        {renderEventDetails()}
      </div>
    </div>
  );
};

export default AbnormalDetectionCard;