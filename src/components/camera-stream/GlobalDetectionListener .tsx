import { useEffect, useRef, useState } from "react";
import { useNotification } from "../../contexts/NotificationContext";

const GlobalDetectionListener = () => {
  const { addNotification } = useNotification();
  const lastEventsRef = useRef<Record<string, string | null>>({});
  const [cameraIds, setCameraIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/cameras");
        const data = await res.json();
        const ids = data.map((cam: any) => cam._id); 
        setCameraIds(ids);
        ids.forEach((camId: string) => {
          lastEventsRef.current[camId] = null;
        });
      } catch (error) {
        console.error("Lỗi fetch camera list:", error);
      }
    };

    fetchCameras();
  }, []);

  useEffect(() => {
    if (cameraIds.length === 0) return;

    const intervalIds = cameraIds.map((camId) =>
      setInterval(async () => {
        try {
          const res = await fetch(`http://127.0.0.1:8000/latest_event/${camId}`);
          const data = await res.json();
          console.log(data);
          // const lastEventType = lastEventsRef.current[camId];

          // if (data.event_type !== lastEventType) {// sự khác biệt
          if (data.event_type === "Object leaving detected") {
            addNotification(
              `Người đã rời khỏi - ${data.cameraID}`,
              `Không còn người trong vùng giám sát`
            );
          } else if (data.currentCount > 0) {
              addNotification(
                `Phát hiện bất thường - ${data.cameraID}`,
                `${data.event_type} (${data.currentCount})`
              );
            }
            lastEventsRef.current[camId] = data.event_type;
          // }
        } catch (error) {
          console.error(`Lỗi fetch camera ${camId}:`, error);
        }
      }, 10000)
    );

    return () => {
      intervalIds.forEach(clearInterval);
    };
  }, [cameraIds, addNotification]);

  return null;
};

export default GlobalDetectionListener;
