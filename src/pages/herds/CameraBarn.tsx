import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import EventsTable from "./EventTable";
import BarnSelector, { Barn } from "../../components/barn-selector/BarnSelector";
import { MdOutlinePets } from "react-icons/md";
import LatestEventTable from "./LatestEventTable";
import { TabView, TabPanel } from "primereact/tabview";
import CameraFeed from "../../components/camera-stream/CameraFeed";
import AbnormalDetectionCard1 from "../../components/card/AbnormalDetectionCard1";

interface EventData {
  event_type: string;
  message?: string;
  camera_id: string;
  event_time: string;
  _id?: string;  
  previousCount?: number;
  currentCount?: number;
  imageUrl?: string; // 👈 thêm vào
  cameraID?: string; // 👈 thêm vào
}
const CameraPage = () => {
  const { camId } = useParams<{ camId: string }>();
  if (!camId) {
    return <Navigate to="/" />;
  }
  useEffect(() => {
    fetchAllEvents(); // gọi lần đầu
  
    const interval = setInterval(() => {
      fetchAllEvents();
    }, 5000); // mỗi 5s gọi lại
  
    return () => clearInterval(interval); // clear khi unmount
  }, [camId]);
  
  const [abnormalDetections, setAbnormalDetections] = useState<EventData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);

  const [latestEvents, setLatestEvents] = useState<EventData[]>([]); // mới thêm
  
  const fetchAllEvents = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/latest_event/${camId}`);
      const data = await res.json();
      const newEvents = Array.isArray(data) ? data : [data];
  
      setEvents((prev) => {
        const existingIds = new Set(prev.map((e) => e._id));
        const uniqueEvents = newEvents.filter((e) => !existingIds.has(e._id));
        return [...uniqueEvents, ...prev];
      });
  
      setAbnormalDetections((prev) => {
        const existingIds = new Set(prev.map((e) => e._id));
        const filtered = newEvents.filter((e) => !existingIds.has(e._id));
        const mapped = filtered.map((event) => ({
          ...event,
          imageUrl: `http://127.0.0.1:8000/image/${event._id}`,
          cameraID: event.camera_id,
        }));
  
        setLatestEvents((prev) => [...mapped, ...prev]);
  
        return [...mapped, ...prev];
      });
  
    } catch (error) {
      console.error("Error fetching all events:", error);
    }
  };
  

  useEffect(() => {
    fetchAllEvents();
  }, [camId]);

  
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
  const latestEvent = events[0]; // vì bạn prepend các event mới vào đầu mảng

  const isOverLeaving = latestEvent?.event_type === "over Object leaving detected";
  const isOccupied = totalCurrentCount > 0 && !isOverLeaving;

  
  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch min-h-[400px]">
        <div className="w-full lg:w-2/3 flex flex-col gap-4 h-full">
          <div className="flex-1 h-full bg-white rounded-xl shadow-md p-4">
            <CameraFeed camId={camId} />
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
  <TabPanel header="📷 Hình ảnh sự kiện">
    {/* {latestEvents.length > 0 && <LatestEventTable events={latestEvents} />} */}
  </TabPanel>
  <TabPanel header="📑 Danh sách sự kiện">
    <EventsTable filterCamId={camId} />
  </TabPanel>
</TabView>

    </div>
  );
};

export default CameraPage;
