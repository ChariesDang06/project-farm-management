import { useEffect, useRef, useState } from "react";
import { useNotification } from "../../contexts/NotificationContext";

interface Camera {
  _id: string;
  location?: string;
  rtsp_url?: string;
}

interface LatestEvent {
  event_type: string;
  currentCount: number;
  cameraID: string;
}

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
          if (data.event_type !== lastEvent) {
            if (data.event_type === "Object leaving detected") {
              addNotification(`Người đã rời khỏi - ${data.cameraID}`, "Không còn người trong vùng giám sát");
            } else if (data.currentCount > 0) {
              addNotification(`Phát hiện bất thường - ${data.cameraID}`, `${data.event_type} (${data.currentCount})`);
            }

            lastEventsRef.current[cam._id] = data.event_type;
          }
        } catch (error) {
          console.error(`Lỗi fetch latest event từ camera ${cam._id}:`, error);
        }
      }, 10000)
    );

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [cameraList, addNotification]);

  return null;
};

export default GlobalDetectionListener;
