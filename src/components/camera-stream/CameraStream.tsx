import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCameras } from "./services/api";
import { Camera } from "./types/camera";

function CameraStream() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [showFeed, setShowFeed] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCameras().then((res) => {
      setCameras(res.cameras);
    });
  }, []);

  const handleToggle = () => setShowFeed(!showFeed);

  // Chuyển đến trang chi tiết của camera
  const navigateToDetails = (camId: string) => {
    navigate(`2000/Chuong12D311/${camId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-bold mb-4">📷 Camera Monitor</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cameras.map((cam) => (
          <div
            key={cam._id}
            className="relative rounded-lg overflow-hidden border shadow bg-black"
          >
            <button
              onClick={handleToggle}
              className="absolute top-2 left-2 w-5 h-5 border-2 border-white bg-white rounded-full shadow hover:bg-green-300 transition"
              title="Hiển thị / Ẩn camera"
            />

            <button
              onClick={() => navigateToDetails(cam._id)}
              className="absolute top-2 right-2 px-3 py-1 bg-white text-sm text-black rounded-full shadow hover:bg-gray-200"
            >
              Chi tiết
            </button>

            <div className="w-full aspect-video bg-black flex items-center justify-center">
              {showFeed ? (
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
              ) : (
                <p className="text-gray-400 italic">📴 Camera đã tắt</p>
              )}
            </div>

            <p className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded-md">
              {cam.name || cam._id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CameraStream;
