import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CameraStream from "../../components/camera-stream/CameraStream";
import AbnormalDetectionCard from "../../components/card/AbnormalDetectionCard";
import EventsTable from "./EventTable";
import BarnSelector, { Barn } from "../../components/barn-selector/BarnSelector";
import { MdOutlinePets } from "react-icons/md";
import LatestEventTable from "./LatestEventTable";
import { TabView, TabPanel } from "primereact/tabview";
interface EventType {
  _id: string;
  imageUrl: string;
  event_type: string;
  currentCount: number;
  event_time: string;
  cameraID: string;
  
}

interface DetectionType {
  _id: string;
  imageUrl: string;
  title: string;
  timestamp: string;
  description: string;
  link: string;
}

const CameraPage = () => {
  const { camId } = useParams<{ camId: string }>();
  const cameraId = camId ?? "defaultCamId";
  const [abnormalDetections, setAbnormalDetections] = useState<DetectionType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]); 

  const handleAbnormalDetect = (detection: DetectionType) => {
    setAbnormalDetections((prev) => [detection, ...prev]);

    const newEvent: EventType = {
      _id: detection._id,
      imageUrl: detection.imageUrl,
      event_type: detection.title,
      currentCount: 1,
      event_time: detection.timestamp,
      cameraID: cameraId,
    };

    setEvents((prevEvents) => {
      const index = prevEvents.findIndex((e) => e._id === newEvent._id);

      if (index !== -1) {
        const updatedEvents = [...prevEvents];
        updatedEvents[index] = {
          ...updatedEvents[index],
          currentCount: updatedEvents[index].currentCount + 1,
        };
        return updatedEvents;
      }
      return [newEvent, ...prevEvents];
    });
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
        console.error("Error fetching:", error);
      }
    };
    fetchBarns();
  }, []);
  const totalCurrentCount = events.reduce((sum, e) => sum + e.currentCount, 0);

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-col lg:flex-row gap-4 w-full">
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <CameraStream camId={cameraId} onAbnormalDetect={handleAbnormalDetect} />
      </div>

      <div className="w-full lg:w-1/3 bg-white p-4 rounded-xl shadow-md max-h-[80vh] overflow-y-auto">
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

        {abnormalDetections.length === 0 ? (
          <p className="text-gray-500 text-sm">Không có cảnh báo nào.</p>
        ) : (
          abnormalDetections.map((item, index) => (
            <div key={index} className="mt-2">
              <AbnormalDetectionCard {...item} />
            </div>
          ))
        )}
      </div>
    </div>
        <TabView>
        <TabPanel header="Image sự kiện">
          {events.length > 0 && (
          <LatestEventTable events={events} />
        )}
        </TabPanel>

        <TabPanel header="Sự kiện">
          <EventsTable />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default CameraPage;
