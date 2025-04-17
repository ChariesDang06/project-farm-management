import React from "react";

interface EventData {
  _id?: string;
  event_type: string;
  message?: string;
  cameraID?: string;
  camera_id?: string;
  event_time?: string;
  video_recorded?: string;
  previousCount?: number;
  currentCount?: number;
}


interface AbnormalDetectionCardProps {
  event: EventData;
}

const AbnormalDetectionCard1: React.FC<AbnormalDetectionCardProps> = ({ event }) => {
  const {
    event_type = "Alert",
    message,
    cameraID,
    camera_id,
    event_time,
    video_recorded,
    previousCount,
    currentCount,
  } = event;

  const camDisplay = cameraID || camera_id;
  const timestamp = event_time ? new Date(event_time).toLocaleString() : "Invalid Date";

  const isHumanDetected = event_type.toLowerCase().includes("human");

  return (
    <div className="flex border border-red-300 text-[#F44336] rounded-xl p-3 items-start bg-[#FFEBEE] shadow-md w-full">
      <div className="ml-2 flex flex-col text-left w-full">
        <h3 className="text-[#F44336] font-bold text-sm">{event_type}</h3>
        <p className="text-[#F44336] text-xs italic">{timestamp}</p>

        {camDisplay && (
          <p className="text-[#F44336] text-sm mt-1">Camera: {camDisplay}</p>
        )}

        {(previousCount !== undefined && currentCount !== undefined) && (
          <p className="text-[#F44336] text-sm mt-1">
            {previousCount} ➡ {currentCount}
          </p>
        )}

        {message && (
          <p className="text-[#F44336] text-sm mt-1">📢 {message}</p>
        )}

        {isHumanDetected && (
          <p className="text-green-600 text-sm mt-1 font-medium">
            ✅ Phát hiện người trong khu vực
          </p>
        )}

        {video_recorded && (
          <a
            href={`/api/videos/${video_recorded}`}
            className="text-[#F44336] text-sm mt-1 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            🎥 Xem video đã ghi
          </a>
        )}
      </div>
    </div>
  );
};

export default AbnormalDetectionCard1;
