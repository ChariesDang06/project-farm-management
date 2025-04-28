import { useEffect, useRef, useState } from "react";
import { useNotification } from "../../contexts/NotificationContext";

interface Camera {
  _id: string;
  location?: string;
  rtsp_url?: string;
}

interface LatestEvent {
  event_type: string;
  currentCount?: number;
  previousCount?: number;
  cameraID: string;
}

const eventTypeMap: { [key: string]: string } = {
  "Object leaving detected": "Phát hiện vật thể rời đi",
  "Pig count changes": "Thay đổi số lượng heo",
  "Human detect": "Phát hiện người",
  "Object count changes": "Thay đổi số lượng vật thể",
};

const GlobalDetectionListener = () => {
  const { addNotification } = useNotification();
  const lastEventsRef = useRef<Record<string, string | null>>({});
  const [cameraList, setCameraList] = useState<Camera[]>([]);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/cameras");
        const data = await res.json();
        const cameras: Camera[] = data.cameras;
        setCameraList(cameras);
        const initialEvents: Record<string, string | null> = {};
        cameras.forEach((cam) => {
          initialEvents[cam._id] = null;
        });
        lastEventsRef.current = initialEvents;
      } catch (error) {
        console.error("Lỗi khi fetch danh sách camera:", error);
      }
    };

    fetchCameras();
  }, []);

  useEffect(() => {
    if (cameraList.length === 0) return;

    const intervals = cameraList.map((cam) =>
      setInterval(async () => {
        try {
          const res = await fetch(`http://127.0.0.1:8000/latest_event/${cam._id}`);
          const data: LatestEvent = await res.json();

          const lastEvent = lastEventsRef.current[cam._id];
          const camLocation = cam.location || "Chuồng 1"; // Nếu không có location thì gán "Chuồng 1"

          // if (data.event_type !== lastEvent) {
            const translatedEventType = eventTypeMap[data.event_type] || data.event_type;

            const isPigLeaving =
              data.event_type === "Object leaving detected" && data.cameraID === "PIG_CROSS_LINE_CAM";

            // Lấy thời gian hiện tại
            const now = new Date();
            const timeString = now.toLocaleTimeString("vi-VN", { hour12: false }); // ví dụ: 14:23:55

            if (isPigLeaving) {
              addNotification(
                `🐖 Heo rời khỏi khu vực (${camLocation}) - ${timeString}`,
                "Đã phát hiện heo vượt vạch giới hạn!"
              );
            } else if (data.event_type === "Object leaving detected") {
              addNotification(
                `${translatedEventType} (${camLocation}) - ${timeString}`,
                "Đối tượng rời khu vực giám sát."
              );
            } else if (data.event_type === "Pig count changes" || data.event_type === "Object count changes") {
              addNotification(
                `${translatedEventType} (${camLocation}) - ${timeString}`,
                `Số lượng: ${data.previousCount} ➔ ${data.currentCount}`
              );
            } else if (data.event_type === "Human detect") {
              addNotification(
                `🧍 ${translatedEventType} (${camLocation}) - ${timeString}`,
                "Phát hiện có người trong khu vực!"
              );
            } else {
              addNotification(
                `📋 ${translatedEventType} (${camLocation}) - ${timeString}`,
                `Sự kiện: ${translatedEventType}`
              );
            }

            lastEventsRef.current[cam._id] = data.event_type;
          // }
        } catch (error) {
          console.error(`Lỗi fetch latest event từ camera ${cam._id}:`, error);
        }
      }, 8000)
    );

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [cameraList, addNotification]);

  return null;
};

export default GlobalDetectionListener;
