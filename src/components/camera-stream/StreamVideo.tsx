import React, { useState } from "react";

interface StreamVideoProps {
  camId: string;
}

const StreamVideo: React.FC<StreamVideoProps> = ({ camId }) => {
  const [loading, setLoading] = useState(true);
  const videoUrl = `http://localhost:8000/video_feed/${camId}`;

  return (
    <div className="flex flex-col items-center">
      {loading && <p className="text-gray-500 mb-2">Loading stream...</p>}
      <img
        src={videoUrl}
        alt="Camera Stream"
        onLoad={() => setLoading(false)}
        className="rounded-lg shadow-lg w-[640px] h-[480px] object-cover"
      />
    </div>
  );
};

export default StreamVideo;
