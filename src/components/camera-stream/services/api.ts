import axios from "axios";

export const API_URL = "http://localhost:8000"; // chỉnh theo port của FastAPI

export async function fetchCameras() {
  const res = await fetch(`http://localhost:8000/cameras`);
  return res.json();
}

export async function fetchLatestEvent(camId: string) {
  const res = await fetch(`http://localhost:8000/latest_event/${camId}`);
  return res.json();
}

export const getPersonStatus = async () => {
  return axios.get(`http://localhost:8000/personCount`);
};



export const getAllEvents = async () => {
  return axios.get(`http://localhost:8000/events`);
};


export const streamUrl = (camId: string) => {
  return `ws://localhost:8000/stream/${camId}`;
};