import { useContext, useEffect, useState } from "react";
import AbnormalDetectionCard from "../../components/card/AbnormalDetectionCard";
import phvt from "../../assets/phvn.png";
import phbt1 from "../../assets/phbt1.png";
import BarnSelector, {
  Barn,
} from "../../components/barn-selector/BarnSelector";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { MdOutlinePets } from "react-icons/md";
import BarChartComponent from "../../components/bar-chart/BarChartComponent";
import TimelineSelector from "../../components/timeline-selector/TimelineSelector";
import LineChartComponent from "../../components/line-chart/LineChartComponent";
import {
  generateAnimalData,
  generateData,
  generateResourceData,
  generateStorageRateData,
} from "../../utils/generateData";
import { FaRegMessage } from "react-icons/fa6";
import ChatAnalysisPanel from "../../components/pop-up/ChatAnalysisPanel";
import axios from "axios";
import { AuthContext } from "../../hooks/user";

const abnormalDetections = [
  {
    imageUrl: phvt,
    title: "Phát hiện vật nuôi vượt rào",
    timestamp: "12:30:05 AM - 01/11/2025",
    description: "Phát hiện vật nuôi vượt mức tại khu vực 123123",
    link: "/detail-alert/1",
  },
  {
    imageUrl: phvt,
    title: "Phát hiện vật nuôi ra khỏi khu vực",
    timestamp: "03:15:20 PM - 02/11/2025",
    description: "Vật nuôi đã đi ra khỏi khu vực cho phép. Cần kiểm tra ngay.",
    link: "/detail-alert/2",
  },
  {
    imageUrl: phvt,
    title: "Cảnh báo hoạt động bất thường",
    timestamp: "06:45:10 AM - 03/11/2025",
    description: "Hệ thống phát hiện di chuyển bất thường tại khu vực nuôi A.",
    link: "/detail-alert/4",
  },
];

const imageList = [{ src: phbt1, caption: "Chuồng Heo01A1" }];
const DashBoard = () => {
  const { token } = useContext(AuthContext);
  const handleBarnSelect = (id: string) => {
    console.log("Selected Barn ID:", id);
  };
  const [barns, setBarns] = useState<Barn[]>([]);
  useEffect(() => {
    const fetchBarns = async () => {
      try {
        const response = await fetch(
          "https://agriculture-traceability.vercel.app/api/v1/rooms"
        );
        const data = await response.json();
        setBarns(data.rooms);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchBarns();
  }, []);
  const [filterType, setFilterType] = useState<"year" | "month" | "week">(
    "year"
  );
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [herdData, setHerdData] = useState({});
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [chatResponse, setChatResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resourceData, setResourceData] = useState({});
  const [storageData, setStorageData] = useState<any[]>([]);

  useEffect(() => {
    const herdData = generateAnimalData(filterType);
    setHerdData(herdData);
    const resourceData = generateResourceData(filterType);
    setResourceData(resourceData);
    const storageData = generateStorageRateData(filterType);
    setStorageData(storageData);
  }, [filterType]);

  const sendDataToAnalys = async () => {
    setIsLoading(true);
    setIsPanelOpen(true);
    setChatResponse("");

    try {
      const response = await axios.post(
        "https://agriculture-traceability.vercel.app/api/v1/analysis/farm",
        [
          {
            name: "nông trại",
            time:
              filterType === "year"
                ? "năm"
                : filterType === "month"
                ? "tháng"
                : "tuần",
            herd: JSON.stringify(herdData),
            resource: JSON.stringify(resourceData),
            import_rate: JSON.stringify(storageData),
          },
        ],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const analysisData = response.data;

      setChatResponse(analysisData.analysis);
    } catch (error) {
      setChatResponse("Lỗi: Không thể xử lý yêu cầu, vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F3F7F5] rounded-[20px] p-3  sm:p-5">
        <div className=" md:col-span-2">
          <button
            onClick={sendDataToAnalys}
            className="mr-4 bg-[#76bc6a] hover:bg-[#3d8b40] flex items-center text-white px-4 py-3 rounded-lg mb-4"
          >
            <FaRegMessage className="w-4 h-4 mr-2" />
            Phân tích dữ liệu
          </button>
          <div className="flex justify-between items-center w-full mb-2">
            <span className="text-left text-black text-lg">Đàn HeoA101S1</span>
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full bg-white border border-[#E0E2E7] px-2 max-w-[340px]">
              <FiSearch className="text-[#278D45] w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="text-[#737791] text-sm w-[200px] p-2 bg-transparent outline-none"
              />
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
                <p className="absolute bottom-2 left-2 bg-gray-400 text-white text-sm px-2 py-1 rounded-md">
                  {image.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="inline-flex flex-col gap-2 bg-white p-3 rounded-[8px]">
          <BarnSelector
            barns={barns}
            onSelect={handleBarnSelect}
            icon={<MdOutlinePets className="w-5 h-5" />}
            rounded={false}
            placeholder="Đàn hep HA01"
            iconColor="text-white"
            iconBgColor="bg-yellow-500"
          />
          <span className="text-left text-black">Số lượng: 10010</span>
          <span className="text-left text-black">Lịch sử hoạt động</span>
          {abnormalDetections.map((alert, index) => (
            <AbnormalDetectionCard key={index} {...alert} />
          ))}
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
            data={resourceData}
            filterType={filterType}
          />
          <LineChartComponent
            title="Tăng giảm số lượng tổng thể"
            chartType="herd"
            data={herdData}
            filterType={filterType}
          />
          <BarChartComponent
            title="Tỉ lệ nhập kho"
            data={storageData}
            filterType={filterType}
            hasIsolation={false}
            labels={{ healthy: "Nhập", sick: "Xuất" }}
            selectedAnimal={selectedAnimal}
          />
        </div>
      </div>
      {isPanelOpen && (
        <ChatAnalysisPanel
          isOpen={isPanelOpen}
          isLoading={isLoading}
          content={chatResponse}
          onClose={() => setIsPanelOpen(false)}
        />
      )}
    </>
  );
};

export default DashBoard;
