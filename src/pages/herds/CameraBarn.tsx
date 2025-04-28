import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import EventsTable from "./EventTable";
import BarnSelector, { Barn } from "../../components/barn-selector/BarnSelector";
import { MdOutlinePets } from "react-icons/md";
import DetectedEventTable from "./LatestEventTable";
import { TabView, TabPanel } from "primereact/tabview";
import CameraFeed from "../../components/camera-stream/CameraFeed";
import AbnormalDetectionCard1 from "../../components/card/AbnormalDetectionCard1";
import PigCrossLine from "../../components/camera-stream/PigCrossLine";
import PigFeed from "../../components/camera-stream/PigFeed";

// Import the PigCrossLine component

interface EventData {
  event_type: string;
  message?: string;
  camera_id: string;
  event_time: string;
  _id?: string;
  previousCount?: number;
  currentCount?: number;
  imageUrl?: string;
  cameraID?: string;
}

const CameraPage = () => {
  const { camId } = useParams<{ camId: string }>();
  if (!camId) {
    return <Navigate to="/" />;
  }
  // Check if the camId is for PigCrossLine
  if (camId === "PIG_CROSS_LINE_CAM") {
    return <PigCrossLine isOnlyCameraView={false} />;
  }
  if (camId === "SIM_CAM") {
    return <PigFeed isOnlyCameraView={false} />;
  }
  
  useEffect(() => {
    fetchAllEvents(); // First call when component mounts

    const interval = setInterval(() => {
      fetchAllEvents(); fetchPersonStatus();
    }, 5000);

    return () => clearInterval(interval); // Clear the interval on unmount
  }, [camId]);

  const [abnormalDetections, setAbnormalDetections] = useState<EventData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [isOccupied, setIsOccupied] = useState(false);
  const fetchAllEvents = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/latest_human_count/${camId}`);

      const data = await res.json();
      console.log("data latest_human_count",data);
      const newEvents = Array.isArray(data) ? data : [data];

      const uniqueEvents = newEvents.filter((e) => !events.some((prev) => prev._id === e._id));
      if (uniqueEvents.length === 0) return;

      setEvents((prev) => [...uniqueEvents, ...prev]);

      const newAbnormals = uniqueEvents.filter((e) => !abnormalDetections.some((prev) => prev._id === e._id));
      setAbnormalDetections((prev) => [...newAbnormals, ...prev]);
    } catch (error) {
      console.error("Error fetching all events:", error);
    }
  };

  const fetchPersonStatus = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/personCount`);
      const data = await res.json();
      setIsOccupied(data.status === "has person"); 
      console.log("data person",data);
    } catch (error) {
      console.error("Error fetching person count:", error);
    }
  };
  const handleSelectBarn = (id: string) => {
    console.log("Selected Barn ID:", id);
  };

  const [barns, setBarns] = useState<Barn[]>([]);

  useEffect(() => {
    const fetchBarns = async () => {
      try {
        const response = await fetch("https://agriculture-traceability.vercel.app/api/v1/rooms");
        const data = await response.json();
        setBarns(data.rooms);
      } catch (error) {
        console.error("Error fetching barns:", error);
      }
    };
    fetchBarns();
  }, []);

  const totalCurrentCount = events.reduce((sum, e) => sum + (e.currentCount || 0), 0);
  const latestEvent = events[0];

  const checkIsOccupied = (event: EventData | undefined): { occupied: boolean; count: number } => {
    if (!event) return { occupied: false, count: 0 };

    if (event.event_type === "Object count changes") {
      const count = event.currentCount ?? 0;
      return { occupied: count > 0, count };
    }

    if (event.event_type === "Human detect") {
      return { occupied: true, count: 1 };
    }

    return { occupied: false, count: 0 };
  };

  const {  count: personCount } = checkIsOccupied(latestEvent);

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch min-h-[400px]">
        <div className="w-full lg:w-2/3 flex flex-col gap-4 h-full">
          <div className="flex-1 h-full bg-white rounded-xl shadow-md p-4">
            <CameraFeed camId={camId}  isOccupied={isOccupied} personCount={personCount} latestEvent={latestEvent} />
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-white p-4 rounded-xl shadow-md">
          <BarnSelector
            barns={barns}
            onSelect={handleSelectBarn}
            icon={<MdOutlinePets className="w-5 h-5" />}
            rounded={true}
            widthFull="w-[240px]"
            placeholder="Chọn chuồng"
            iconColor="text-white"
            iconBgColor="bg-yellow-500"
          />

          <h2 className="text-lg text-left my-2 text-red-500">🚨 Cảnh báo bất thường</h2>
          <span className="text-left text-black mb-4">Đã phát hiện {totalCurrentCount} lần ra vào</span>

          <div className="max-h-[360px] overflow-y-auto pr-2">
            {abnormalDetections.length === 0 ? (
              <p className="text-gray-500 text-sm">Không có cảnh báo nào.</p>
            ) : Array.isArray(abnormalDetections) ? (
              abnormalDetections.map((event, index) => (
                <div className="mb-2" key={event._id || index}>
                  <AbnormalDetectionCard1 event={event} />
                </div>
              ))
            ) : (
              <div className="mb-2">
                <AbnormalDetectionCard1 event={abnormalDetections} />
              </div>
            )}
          </div>
        </div>
      </div>

      <TabView>
        <TabPanel header="📑 Danh sách sự kiện">
          <EventsTable filterCamId={camId} />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default CameraPage;
