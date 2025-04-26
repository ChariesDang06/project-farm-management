import { useState, useEffect } from "react";


type Props = {
  camId: string;
  isOccupied?: boolean;
  personCount?: number;
  latestEvent?: { event_time?: string };
};


export default function CameraFeed({ camId, isOccupied, personCount,latestEvent }: Props) {
  const [isConnected, setIsConnected] = useState(true);
  const [showFeed, setShowFeed] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch(`http://localhost:8000/video_feed/${camId}`);
        setIsConnected(res.ok);
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

      {latestEvent && (
        <div className="absolute bottom-2 left-2 bg-black/50 px-3 py-2 rounded-lg text-white text-sm shadow-md">
          <p className={`${isOccupied ? "text-green-400" : "text-red-400"} font-semibold`}>
            {isOccupied
              ? `🟢 Có người trong khu vực (${personCount} người)`
              : "🔴 Không có người"}
          </p>
          {latestEvent.event_time && (
            <p className="text-xs text-gray-200 mt-1">
              Lần cuối: {new Date(latestEvent.event_time).toLocaleString()}
            </p>
          )}
        </div>
      )}


      {/* Video feed */}
      <div className="w-full aspect-video bg-black flex items-center justify-center">
        {showFeed ? (
          isConnected ? (
            <img crossOrigin="anonymous"
              data-camid={camId}
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
