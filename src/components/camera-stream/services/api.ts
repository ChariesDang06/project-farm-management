
export const API_BASE = "http://localhost:8000"; // chỉnh theo port của FastAPI

export async function fetchCameras() {
  const res = await fetch(`${API_BASE}/cameras`);
  return res.json();
}

export async function fetchLatestEvent(camId: string) {
  const res = await fetch(`${API_BASE}/latest_event/${camId}`);
  return res.json();
}