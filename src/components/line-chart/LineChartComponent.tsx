import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import AlertCard from "../card/AlertCard";
import { FaRegCheckCircle } from "react-icons/fa";  
import { MdOutlineLightbulbCircle } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";
import useWindowSize from "./useWindowSize"; 
type ChartType = "herd" | "consumption" | "disease" | "water" | "food" | "medical";
type FilterType = "year" | "month" | "week";

type ChartData = {
  name: string;
  [key: string]: number | string;
};

interface CombinedChartProps {
  title: string;
  chartType: ChartType;
  filterType: FilterType;
  alert?:string;
}

const generateChartData = (chartType: ChartType, filterType: FilterType): ChartData[] => {
  const farms = ["Trang trại A", "Trang trại B", "Trang trại C", "Trang trại D"];
  const labels = {
    year: Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
    month: Array.from({ length: 4 }, (_, i) => `Tuần ${i + 1}`),
    week: Array.from({ length: 7 }, (_, i) => `Ngày ${i + 1}`),
  };

  return labels[filterType].map((label) => {
    const entry: Record<string, number | string> = { name: label };
    if (chartType === "herd") {
      ["Cừu Meri", "Dê Boer", "Dê Saanen"].forEach((animal) => {
      // ["Cừu Appenninica", "Cừu Bentheimer", "Cừu Merinoland", "Dê Boer", "Dê Saanen"].forEach((animal) => {
        
        entry[animal] = Math.floor(Math.random() * 200);
      });
    } else if (chartType === "consumption") {
      ["Thức ăn", "Điện", "Y tế", "Nước"].forEach((item) => {
        entry[item] = Math.floor(Math.random() * 100);
      });
    } else if (chartType === "disease") {
      ["Bệnh viêm vú", "Bệnh giun sán", "Bệnh lở mồm"].forEach((disease) => {

      // ["Bệnh chương", "Bệnh tụ chải", "Bệnh viêm vú", "Bệnh giun sán", "Bệnh lở mồm"].forEach((disease) => {
        entry[disease] = Math.floor(Math.random() * 300);
      });
    } else {
      farms.forEach((farm) => {
        entry[farm] = Math.floor(Math.random() * 200);
      });
    }
    return entry as ChartData;
  });
};

const LineChartComponent: React.FC<CombinedChartProps> = ({ title, chartType, filterType, alert }) => {
  const data = generateChartData(chartType, filterType);
  const colorGroups: Record<ChartType, Record<string, string>> = {
    herd: {
      // "Cừu Appenninica": "#4CAF50",
      // "Cừu Bentheimer": "#E91E63",
      "Cừu Meri": "#FF9800",
      "Dê Boer": "#9C27B0",
      "Dê Saanen": "#2196F3",
    },
    consumption: {
      "Thức ăn": "#278D45",
      "Điện": "#FCBD2D",
      "Y tế": "#ED3636",
      "Nước": "#1C91E6",
    },
    disease: {
      // "Bệnh chương": "#28A745",
      // "Bệnh tụ chải": "#FFC107",
      "Bệnh viêm vú": "#DC3545",
      "Bệnh giun sán": "#6610F2",
      "Bệnh lở mồm": "#17A2B8",
    },
    water: {
      "Trang trại A": "#1C91E6",
      "Trang trại B": "#278D45",
      "Trang trại C": "#ED3636",
      "Trang trại D": "#FCBD2D",
    },
    food: {
      "Trang trại A": "#4A90E2",
      "Trang trại B": "#F5A623",
      "Trang trại C": "#D0021B",
      "Trang trại D": "#8B572A",
    },
    medical: {
      "Trang trại A": "#7ED321",
      "Trang trại B": "#BD10E0",
      "Trang trại C": "#F8E71C",
      "Trang trại D": "#417505",
    },
  };

  const selectedColors = colorGroups[chartType] || {};
  const size = useWindowSize();
  return (
    <div className="p-2 md:p-4 bg-white rounded-[16px] shadow-md ">
      <h1 className="text-md md:text-xl mb-4 text-left font-semibold">{title}</h1>
      <ResponsiveContainer
  width="100%"
  height={size.width < 768 ? 280 : size.width < 1024 ? 350 : 420}
  className="w-full"
>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" className="hidden sm:block" />
    <XAxis
      dataKey="name"
      tick={{ fill: "#555", fontSize: size.width < 640 ? 10 : 14 }}
    />
    <YAxis
      tick={{ fill: "#555", fontSize: size.width < 640 ? 10 : 14 }}
    />
    <Tooltip />
    {Object.keys(selectedColors).map((key) => (
      <Line
        key={key}
        type="monotone"
        dataKey={key}
        stroke={selectedColors[key]}
        strokeWidth={2}
        dot={size.width < 740 ? false : true}
      />
    ))}
  </LineChart>
</ResponsiveContainer>


      <div className="flex flex-nowrap overflow-x-auto justify-center bg-[#1C1717] text-white rounded-lg p-3 w-fit mx-auto md:mt-4">
        {Object.keys(selectedColors).map((key, index, array) => (
          <div key={key} className="flex flex-row items-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <span className="sm:w-2 sm:h-2 w-1 h-1 rounded-full" style={{ backgroundColor: selectedColors[key] }}></span>
                <span className="ml-2 text-[12px] sm:text-sm">{key}</span>
              </div>
              <span className="text-[12px] sm:text-lg">12,423</span>
            </div>
            {index !== array.length - 1 && <div className="w-[1px] h-10 bg-gray-500 mx-4"></div>}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 md:mt-4 mb-1">
      {alert==="water" ? (
        <>
        <AlertCard
            icon={FaRegCheckCircle}
            title="Mức sử dụng tối"
            description="Lượng nước sử dụng trong tuần qua đã đạt 15.000 lít, nằm ở mức cho phép là 12.000 lít."
            bgColor="#E8F5E9"
            borderColor="#43A047"
          />
          <AlertCard
            icon={MdOutlineLightbulbCircle}
            title="Đề xuất"
            description="Đánh giá lại lượng nước cung cấp theo nhu cầu thực tế của đàn gia súc, đồng thời kiểm tra hệ thống cấp nước để tránh lãng phí."
            bgColor="#E3F2FD"
            borderColor="#1E88E5"
          />
        </>
          
      ):alert==="food"? (
        <>
          <AlertCard
            icon={FiAlertCircle}
            title="Cảnh báo"
            description="Lượng thức ăn tiêu thụ trong tuần qua cao hơn mức dự kiến, cần kiểm tra lại nguồn cung cấp."
            bgColor="#FFF3E0"
            borderColor="#FFA726"
          />
          <AlertCard
            icon={MdOutlineLightbulbCircle}
            title="Đề xuất"
            description="Điều chỉnh lại khẩu phần ăn để tối ưu hóa chi phí và đảm bảo sức khỏe vật nuôi."
            bgColor="#E8F5E9"
            borderColor="#66BB6A"
          />
        </>
      ):alert==="medical"? (
        <>
          <AlertCard
            icon={FiAlertCircle}
            title="Cảnh báo"
            description="Số lượng thuốc y tế đang giảm mạnh, cần bổ sung ngay."
            bgColor="#FFEBEE"
            borderColor="#F44336"
          />
          <AlertCard
            icon={MdOutlineLightbulbCircle}
            title="Đề xuất"
            description="Kiểm tra lại kho thuốc và lên kế hoạch nhập hàng để đảm bảo đủ nguồn cung."
            bgColor="#E3F2FD"
            borderColor="#1976D2"
          />
        </>
      ):("")}
      </div>
    </div>
  );
};

export default LineChartComponent;
