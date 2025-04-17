import { useEffect, useState } from "react";
import { fetchCameras } from "./services/api";
import { Camera } from "./types/camera";

type Props = {
  onSelect: (camId: string) => void;
  selectedCam: string;
};

export default function CameraList({ onSelect, selectedCam }: Props) {
  const [cameras, setCameras] = useState<Camera[]>([]);

  useEffect(() => {
    fetchCameras().then((res) => {
      setCameras(res.cameras);
    });
  }, []);

  return (
    <div className="space-y-2">
      {cameras.map((cam) => (
        <button
          key={cam._id}
          onClick={() => onSelect(cam._id)}
          className={`w-full p-3 text-left border rounded hover:bg-blue-50 ${
            selectedCam === cam._id ? "bg-blue-100 border-blue-500" : ""
          }`}
        >
          {cam.name || cam._id}
        </button>
      ))}
    </div>
  );
}
