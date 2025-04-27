import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "./types/camera";

type EventData = {
  event_type: string;
  event_time: string;
  cameraID: string;
  previousCount?: number;
  currentCount?: number;
};

type Props = {
  camera: string;
};

export default function CameraCard({ camera }: Props) {
  const [event, setEvent] = useState<EventData | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [showFeed, setShowFeed] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/latest_human_count/${camera}`);
        if (res.ok) {
          const data: EventData = await res.json();
          setEvent(data);
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch {
        setIsConnected(false);
      }
    };

    fetchEvent();
    const interval = setInterval(fetchEvent, 50000); 
    return () => clearInterval(interval);
  }, [camera]);

  const renderEventContent = () => {
    if (!event) return "Không có dữ liệu";
    if (event.event_type === "Object leaving detected") return "Người/vật rời đi";
    if (event.event_type === "Object count changes") {
      return `${event.previousCount} ➡ ${event.currentCount}`;
    }
    return "Không có người";
  };

  return (
    <div className="relative rounded-lg overflow-hidden border shadow bg-black mb-4">
      <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded text-sm text-black font-medium shadow">
        {renderEventContent()}
      </div>

   

      <button
        onClick={() => navigate(`Chuong12D311/${camera}`)}
        className="absolute top-2 right-2 px-3 py-1 bg-white text-sm text-black rounded-full shadow hover:bg-gray-200"
      >
        Chi tiết
      </button>

      <div className="w-full aspect-video bg-black flex items-center justify-center">
        {showFeed ? (
          isConnected ? (
            <img
              src={`http://localhost:8000/video_feed/${camera}`}
              alt="Live Feed"
              className="w-full h-auto rounded border shadow"
            />
          ) : (
            <p className="text-red-500 font-semibold">🚫 Mất kết nối</p>
          )
        ) : (
          <p className="text-gray-400 italic">📴 Camera đã tắt</p>
        )}
      </div>

      <p className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded-md">
       {camera}
      </p>
    </div>
  );
}
 