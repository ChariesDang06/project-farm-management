import axios from "axios";
import { AuthContext } from "../../hooks/user";
import useWindowSize from "./useWindowSize";
import ChatAnalysisPanel from "../../components/pop-up/ChatAnalysisPanel";
import { FaRegMessage } from "react-icons/fa6";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useContext, useEffect, useState } from "react";

const labelMap = {
  "Số lượng vật nuôi": { healthy: "Khỏe", sick: "Bệnh" },
  "Tỉ lệ nhập kho": { healthy: "Nhập", sick: "Xuất" },
} as const;

const BarChartComponent = ({
  title,
  data,
  hasIsolation,
  selectedAnimal,
  filterType,
}: {
  title: string;
  data: Array<{ name: string; khoe?: number; benh?: number; cachly?: number }>;
  filterType: "year" | "month" | "week";
  hasIsolation: boolean;
  selectedAnimal: string;
}) => {
  const { token } = useContext(AuthContext);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [chatResponse, setChatResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const labels = labelMap[title as keyof typeof labelMap] || {
    healthy: "Khỏe",
    sick: "Bệnh",
  };
  const { width } = useWindowSize();

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isPanelOpen) setIsPanelOpen(false);
    };

    const updateBodyOverflow = () => {
      document.body.style.overflow = isPanelOpen ? "hidden" : "auto";
    };

    window.addEventListener("keydown", handleEscKey);
    updateBodyOverflow();

    return () => {
      window.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isPanelOpen]);

  const sendDataToAnalys = async () => {
    setIsLoading(true);
    setIsPanelOpen(true);
    setChatResponse("");

    try {
      const response = await axios.post(
        "https://agriculture-traceability.vercel.app/api/v1/analysis/herd",
        [
          {
            name: "đàn",
            time:
              filterType === "year"
                ? "năm"
                : filterType === "month"
                ? "tháng"
                : "tuần",
            history: JSON.stringify(data),
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
      <div className="p-2 md:p-4 bg-white rounded-[16px] shadow-md">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-md md:text-xl mb-4 text-left font-semibold">
            {title}
          </h1>
          <button
            onClick={sendDataToAnalys}
            className="mr-4 bg-[#76bc6a] hover:bg-[#3d8b40] flex items-center text-white px-4 py-3 rounded-lg mb-4"
          >
            <FaRegMessage className="w-4 h-4 mr-2" />
            Phân tích dữ liệu
          </button>
        </div>
        <ResponsiveContainer
          width="100%"
          aspect={width < 640 ? 1.2 : width < 1280 ? 2 : 2.5}
          className="w-full"
        >
          <BarChart
            data={data}
            barSize={width < 640 ? 16 : width < 1280 ? 24 : 32}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="hidden sm:block" />
            <XAxis
              dataKey="name"
              tick={{
                fill: "#555",
                fontSize: width < 640 ? 10 : width < 1280 ? 12 : 14,
              }}
            />
            <YAxis
              tick={{
                fill: "#555",
                fontSize: width < 640 ? 10 : width < 1280 ? 12 : 14,
              }}
            />
            <Tooltip />
            <Bar
              dataKey="khoe"
              fill="#278D45"
              name={`${selectedAnimal} khỏe`}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="benh"
              fill="#FCBD2D"
              name={`${selectedAnimal} bệnh`}
              radius={[4, 4, 0, 0]}
            />
            {hasIsolation && (
              <Bar
                dataKey="cachly"
                fill="#ED3636"
                name={`${selectedAnimal} cách ly`}
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-nowrap overflow-x-auto  justify-center items-center gap-2 sm:gap-4 bg-[#1C1717] text-white rounded-lg sm:p-3 p-2 w-fit mx-auto mt-2 sm:mt-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="sm:w-2 sm:h-2  h-1 w-1 bg-green-500 rounded-full"></div>
              <p className="text-[12px] sm:text-sm">
                {selectedAnimal} {labels.healthy}
              </p>
            </div>
            <p className="text-[12px] sm:text-lg">
              {data
                .reduce((acc, cur) => acc + (cur.khoe || 0), 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="w-[1px] h-10 bg-gray-500"></div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="sm:w-2 sm:h-2 h-1 w-1 bg-yellow-500 rounded-full"></div>
              <p className="text-[10px] sm:text-sm">
                {selectedAnimal} {labels.sick}
              </p>
            </div>
            <p className="text-[12px] sm:text-lg">
              {data
                .reduce((acc, cur) => acc + (cur.benh || 0), 0)
                .toLocaleString()}
            </p>
          </div>
          {hasIsolation && (
            <>
              <div className="w-[1px] h-10 bg-gray-500"></div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <div className="sm:w-2 sm:h-2  h-1 w-1 bg-[#ED3636] rounded-full"></div>
                  <p className="text-[10px] sm:text-sm">
                    {selectedAnimal} Đang cách ly
                  </p>
                </div>
                <p className="text-[12px] sm:text-lg">
                  {data
                    .reduce((acc, cur) => acc + (cur.cachly || 0), 0)
                    .toLocaleString()}
                </p>
              </div>
            </>
          )}
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

export default BarChartComponent;
