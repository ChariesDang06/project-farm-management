import { useState, useEffect } from "react";

type Props = {
  camId: string;
};

export default function CameraFeed({ camId }: Props) {
  const [isConnected, setIsConnected] = useState(true);
  const [showFeed, setShowFeed] = useState(true);

  // Kiểm tra kết nối mỗi khi thay đổi camId
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch(`http://localhost:8000/video_feed/${camId}`);
        if (res.ok) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkConnection();
  }, [camId]);

  const handleToggleFeed = () => {
    setShowFeed(!showFeed);
  };

  return (
    <div className="relative w-full">
      <p className="absolute top-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded-md">
        Camera: {camId}
      </p>

      <button
        onClick={handleToggleFeed}
        className="absolute top-2 right-2 px-3 py-1 bg-white text-sm text-black rounded-full shadow hover:bg-gray-200"
      >
        {showFeed ? "Tắt" : "Bật"} Feed
      </button>

      <div className="w-full aspect-video bg-black flex items-center justify-center">
        {showFeed ? (
          isConnected ? (
            <img
              src={`http://localhost:8000/video_feed/${camId}`}
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
    </div>
  );
}
