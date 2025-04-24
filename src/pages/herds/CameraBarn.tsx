
import { useState, useEffect ,useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import EventsTable from "./EventTable";
import BarnSelector, { Barn } from "../../components/barn-selector/BarnSelector";
import { MdOutlinePets } from "react-icons/md";
import DetectedEventTable from "./LatestEventTable";

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
interface EventData1 extends EventData {
  capturedTime: string; // thời điểm bạn ghi nhận có người
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
  const [capturedEvents, setCapturedEvents] = useState<EventData1[]>([]);
  const [abnormalDetections, setAbnormalDetections] = useState<EventData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);

  const [latestEvents, setLatestEvents] = useState<EventData[]>([]); // mới thêm
  const previousCountRef = useRef<number>(0);
 
  // const fetchAllEvents = async () => {
  //   try {
  //     const res = await fetch(`http://127.0.0.1:8000/latest_event/${camId}`);
  //     const data = await res.json();
  //     const newEvents = Array.isArray(data) ? data : [data];
  
  //     // Lọc các event chưa tồn tại để thêm mới
  //     const uniqueEvents = newEvents.filter((e) => !events.some((prev) => prev._id === e._id));
  
  //     if (uniqueEvents.length === 0) return;
  
  //     // Thêm vào mảng events chính
  //     setEvents((prev) => [...uniqueEvents, ...prev]);
  
  //     // Cập nhật abnormalDetections
  //     const newAbnormals = uniqueEvents.filter((e) => !abnormalDetections.some((prev) => prev._id === e._id));
  //     setAbnormalDetections((prev) => [...newAbnormals, ...prev]);
  
  //     // Cập nhật latestEvents
  //     setLatestEvents((prev) => [...newAbnormals, ...prev]);
  
  //     // Nếu có sự kiện phát hiện người thì thêm vào capturedEvents
  //     const detected = newAbnormals.find((e) => checkIsOccupied(e));
  //     if (detected) {
  //       const newEvent: EventData1 = {
  //         ...detected,
  //         capturedTime: new Date().toLocaleString(),
  //       };
  //       setCapturedEvents((prev) => [newEvent, ...prev]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching all events:", error);
  //   }
  // };
  const fetchAllEvents = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/latest_event/${camId}`);
      const data = await res.json();
      const newEvents = Array.isArray(data) ? data : [data];
  
      const uniqueEvents = newEvents.filter((e) => !events.some((prev) => prev._id === e._id));
      if (uniqueEvents.length === 0) return;
  
      setEvents((prev) => [...uniqueEvents, ...prev]);
  
      const newAbnormals = uniqueEvents.filter((e) => !abnormalDetections.some((prev) => prev._id === e._id));
      setAbnormalDetections((prev) => [...newAbnormals, ...prev]);
      setLatestEvents((prev) => [...newAbnormals, ...prev]);
  
      
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
  const latestEvent = events[0]; 
  const checkIsOccupied = (event: EventData | undefined): { occupied: boolean; count: number } => {
    if (!event) return { occupied: false, count: 0 };
  
    if (event.event_type === "Object count changes") {
      const count = event.currentCount ?? 0;
      return { occupied: count > 0, count };
    }
  
    // if (event.event_type === "Object leaving detected") {
    //   return { occupied: false, count: 0 };
    // }
  
    if (event.event_type === "Human detect") {
      return { occupied: true, count: 1 }; // Mặc định 1 nếu không có currentCount
    }
  
    return { occupied: false, count: 0 };
  };
  
  
  const { occupied: isOccupied, count: personCount } = checkIsOccupied(latestEvent);

  return (
    <div className="flex flex-col gap-4 items-start">


      <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch min-h-[400px]">
        <div className="w-full lg:w-2/3 flex flex-col gap-4 h-full">
          <div className="flex-1 h-full bg-white rounded-xl shadow-md p-4">
          <CameraFeed camId={camId} isOccupied={isOccupied} personCount={personCount} latestEvent={latestEvent} />
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
      {/* <TabPanel header="🖼️ Ghi nhận có người">
        <DetectedEventTable events={capturedEvents} />
      </TabPanel> */}

  <TabPanel header="📑 Danh sách sự kiện">
    <EventsTable filterCamId={camId} />
  </TabPanel>
</TabView>

    </div>
  );
};
export default CameraPage;