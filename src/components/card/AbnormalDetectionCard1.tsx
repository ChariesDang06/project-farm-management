import React from "react";

interface EventData {
  _id?: string;
  event_type: string;
  message?: string;
  cameraID?: string;
  camera_id?: string;
  event_time?: string;
  video_recorded?: string;
  snapshot_id?: string;  // Thêm snapshot_id
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
    snapshot_id,  // Lấy snapshot_id từ event
    previousCount,
    currentCount,
  } = event;

  // Map event_type từ tiếng Anh sang tiếng Việt
  const eventTypeMap: { [key: string]: string } = {
    "Object leaving detected": "Phát hiện vật thể rời đi",
    "Pig count changes": "Thay đổi số lượng heo",
    "Human detect": "Phát hiện người",
    "Object count changes": "Thay đổi số lượng vật thể",
  };

  const camDisplay = cameraID || camera_id;
  const timestamp = event_time ? new Date(event_time).toLocaleString() : "Invalid Date";

  const isHumanDetected =
    event_type.trim().toLowerCase() === "human detect" ||
    (event_type.trim().toLowerCase() === "object count changes" && currentCount && currentCount > 0);

  // Lấy event_type bằng tiếng Việt nếu có
  const eventTypeVi = eventTypeMap[event_type] || event_type;

  // Check if the event type is "Object leaving detected" and cameraID is "PIG_CROSS_LINE_CAM"
  const isPigLeaving =
    event_type === "Object leaving detected" && cameraID === "PIG_CROSS_LINE_CAM";

  return (
    <div className="flex border border-red-300 text-[#F44336] rounded-xl p-3 items-start bg-[#FFEBEE] shadow-md w-full">
      <div className="ml-2 flex flex-col text-left w-full">
        <h3 className="text-[#F44336] font-bold text-sm">{eventTypeVi}</h3>
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
          <p className="text-[#F44336] text-sm mt-1">{message}</p>
        )}

        {/* Display message if it's a pig leaving event */}
        {isPigLeaving && (
          <p className="text-orange-600 text-sm mt-1 font-medium">
            Heo rời đi
          </p>
        )}

        {isHumanDetected && (
          <p className="text-green-600 text-sm mt-1 font-medium">
            Phát hiện người trong khu vực
          </p>
        )}

        {video_recorded && (
          <a
            href={`http://127.0.0.1:8000/api/videos/${video_recorded}`}
            className="text-[#F44336] text-sm mt-1 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Xem video đã ghi
          </a>
        )}

        {/* Hiển thị snapshot_id nếu có */}
        {snapshot_id && (
          <p className="text-[#F44336] text-sm mt-1">
            Snapshot ID: {snapshot_id}
          </p>
        )}
      </div>
    </div>
  );
};

export default AbnormalDetectionCard1;
