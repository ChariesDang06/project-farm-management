import { useEffect, useState } from "react";
import AbnormalDetectionCard from "../../components/card/AbnormalDetectionCard";
import MapFarm from "../../assets/MapFarm.jpg";
import BarnSelector, { Barn } from "../../components/barn-selector/BarnSelector";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { MdOutlinePets } from "react-icons/md";
import BarChartComponent from "../../components/bar-chart/BarChartComponent";
import TimelineSelector from "../../components/timeline-selector/TimelineSelector";
import LineChartComponent from "../../components/line-chart/LineChartComponent";



interface EventData {
  event_type: string;
  message?: string;
  camera_id: string;
  event_time: string;
  
}
const imageList = [
  { src: MapFarm, caption: "" },
];
const DashBoard = () => {
  const handleBarnSelect = (id: string) => {
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
      const [abnormalDetections, setAbnormalDetections] = useState<any[]>([]);

    const fetchAllEvents = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/events");
        const data = await res.json();
    
        // Assuming the returned data shape is { events: [...] }
        const events: EventData[] = data.events;
    
        // Optional: Sort by time descending
        const sortedEvents = events.sort((a, b) => {
          return new Date(b.event_time).getTime() - new Date(a.event_time).getTime();
        });
    
        // Update state with all events
        setAbnormalDetections(sortedEvents);
      } catch (error) {
        console.error("Error fetching all events:", error);
      }
    };
    
  const [filterType, setFilterType] = useState<"year" | "month" | "week">("year");
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  useEffect(() => {
    fetchAllEvents();
    const interval = setInterval(() => {
      fetchAllEvents(); 
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F3F7F5] rounded-[20px] p-3  sm:p-5">
        <div className=" md:col-span-2">
          <div className="flex justify-between items-center w-full mb-2">
            <span className="text-left text-black text-lg">Đàn HeoA101S1</span>
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full bg-white border border-[#E0E2E7] px-2 max-w-[340px]">
              <FiSearch  className="text-[#278D45] w-5 h-5" />
              <input type="text" placeholder="Tìm kiếm..." className="text-[#737791] text-sm w-[200px] p-2 bg-transparent outline-none"/>
              <FiChevronDown className="text-[#737791] w-5 h-5" />
            </div>
          </div>

          <div className="grid gap-2 z-1 ">
            {imageList.map((image, index) => (
              <div key={index} className="relative">
               <img
                src={image.src}
                alt={`Image ${index + 1}`}
                className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      
        <div className="inline-flex flex-col gap-2 bg-white p-3 rounded-[8px] max-h-[80vh] overflow-y-auto">

          <BarnSelector 
              barns={barns}
              onSelect={handleBarnSelect}
              icon={<MdOutlinePets className="w-5 h-5" />}
              rounded={false}
              placeholder="Đàn hep HA01"
              iconColor="text-white"
              iconBgColor="bg-yellow-500"
            />
          {/* <span className="text-left text-black">Số lượng: 10010</span> */}
          <span className="text-left text-black">Lịch sử hoạt động</span>
           {abnormalDetections.length === 0 ? (
                          <p className="text-gray-500 text-sm">Không có cảnh báo nào.</p>
                        ) : (
                          abnormalDetections.map((event, index) => (
                            <div className="mb-2 ">
                            <AbnormalDetectionCard key={index} event={event} />
                            </div>
                          ))
                        )}
        </div>
      </div>

      <div className="my-5">
        <div className="flex flex-wrap gap-y-2 items-center justify-between md:mb-8">
          <h1 className="text-xl sm:text-2xl">Thống kê tổng quan</h1>
          <TimelineSelector
            filterType={filterType}
            setFilterType={setFilterType}
            selectedAnimal={selectedAnimal}
            setSelectedAnimal={setSelectedAnimal}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
          />
        </div>
        
        <div className="flex flex-col gap-y-5">
          <LineChartComponent 
            title="Biểu đồ xu hướng tiêu thụ" 
            chartType="consumption" 
            filterType={filterType} 
          />
          <LineChartComponent 
          title="Tăng giảm số lượng tổng thể" 
          chartType="herd" 
          filterType={filterType} 
          />
          <BarChartComponent
            title="Tỉ lệ nhập kho"
            filterType={filterType}
            hasIsolation={false}
            selectedAnimal={selectedAnimal}
          />
        </div>
      </div>
    </>
  );
};

  export default DashBoard;
  