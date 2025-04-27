
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCameras } from "./services/api";
import { Camera } from "./types/camera";

type EventData = {
  event_type: string;
  event_time: string;
  cameraID: string;
  previousCount?: number;
  currentCount?: number;
};

function CameraStream() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [eventMap, setEventMap] = useState<Record<string, EventData | null>>({});
  const [isConnectedMap, setIsConnectedMap] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCameras().then((res) => {
      setCameras(res.cameras);
    });
  }, []);

  // Fetch event + connection status cho từng camera
  useEffect(() => {
    cameras.forEach(async (cam) => {
      try {
        const res = await fetch(`http://localhost:8000/latest_event/${cam._id}`);
        if (res.ok) {
          const data: EventData = await res.json();
          setEventMap((prev) => ({ ...prev, [cam._id]: data }));
          setIsConnectedMap((prev) => ({ ...prev, [cam._id]: true }));
        } else {
          setIsConnectedMap((prev) => ({ ...prev, [cam._id]: false }));
        }
      } catch {
        setIsConnectedMap((prev) => ({ ...prev, [cam._id]: false }));
      }
    });
  }, [cameras]);

  const navigateToDetails = (camId: string) => {
    navigate(`Chuong12D311/${camId}`);
  };

  const renderEventContent = (event: EventData | null) => {
    if (!event) return "Không có dữ liệu";
    if (event.event_type === "Object leaving detected") {
      return "Người/vật rời đi";
    }
    if (event.event_type === "Object count changes") {
      return `${event.previousCount} ➡ ${event.currentCount}`;
    }
    return `Không có người`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl text left font-bold mb-4">Camera Monitor</h1>

      <div className="grid grid-cols-1  gap-6">
        {cameras.map((cam) => {
          const event = eventMap[cam._id];
          const isConnected = isConnectedMap[cam._id];

          return (
            <div
              key={cam._id}
              className="relative rounded-lg overflow-hidden border shadow bg-black"
            >
              <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded text-sm text-black font-medium shadow">
                {renderEventContent(event)}
              </div>

              <button
                onClick={() => navigateToDetails(cam._id)}
                className="absolute top-2 right-2 px-3 py-1 bg-white text-sm text-black rounded-full shadow hover:bg-gray-200"
              >
                Chi tiết
              </button>

              <div className="w-full aspect-video bg-black flex items-center justify-center">
                {
                  isConnected ? (
                    <div className="w-full">
                      <img
                        src={`http://localhost:8000/video_feed/${cam._id}`}
                        alt="Live Feed"
                        className="w-full h-auto rounded border shadow"
                      />
                    </div>
                  ) : (
                    <p className="text-red-500 font-semibold">🚫 Mất kết nối</p>
                  )
               }
              </div>

              <p className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded-md">
                {cam.name || cam._id}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CameraStream;
