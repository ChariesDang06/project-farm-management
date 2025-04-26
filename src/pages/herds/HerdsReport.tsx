import { useEffect, useState, useContext } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import BarChartComponent from "../../components/bar-chart/BarChartComponent";
import InputField from "../../components/input-field/InputField";
import TimelineSelector from "../../components/timeline-selector/TimelineSelector";
import { generateData } from "../../utils/generateData";
import { AuthContext } from "../../hooks/user";
import ChatAnalysisPanel from "../../components/pop-up/ChatAnalysisPanel";
import { FaRegMessage } from "react-icons/fa6";
import axios from "axios";

const HerdsReport = () => {
  const [filterType, setFilterType] = useState<"year" | "month" | "week">(
    "year"
  );
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const { token } = useContext(AuthContext);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [chatResponse, setChatResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [herdData, setHerdData] = useState<any[]>([]);

  useEffect(() => {
    const genData = generateData(filterType, true);
    setHerdData(genData);
  }, [filterType]);

  const [data, setData] = useState({
    total: 100000001,
    imported: 123123,
    born: 100000001,
    sick: 123123,
    recovered: 100000001,
    destroyed: 100000001,
    note: "Tốt đấy đồng chí hehe",
  });

  const handleChange = (field: string, value: string | number) => {
    setData((prev) => ({
      ...prev,
      [field]:
        field === "note"
          ? value
          : typeof value === "string"
          ? Number(value.replace(/\D/g, ""))
          : value,
    }));
  };

  const handleSave = () => {
    console.log("Dữ liệu đã lưu:", data);
  };
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
            history: JSON.stringify(herdData),
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
      <div className="bg-[#F3F7F5] rounded-[16px] p-3 sm:p-5">
        <div className="flex items-center gap-y-2 flex-wrap justify-between md:mb-8">
          <div className="flex w-full justify-between">
            <h1 className="text-xl sm:text-2xl">Thống kê</h1>
            <button
              onClick={sendDataToAnalys}
              className="mr-4 bg-[#76bc6a] hover:bg-[#3d8b40] flex items-center text-white px-4 py-3 rounded-lg mb-4"
            >
              <FaRegMessage className="w-4 h-4 mr-2" />
              Phân tích dữ liệu
            </button>
          </div>
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
          <BarChartComponent
            title="Số lượng vật nuôi"
            labels={{ healthy: "Khỏe", sick: "Bệnh" }}
            data={herdData}
            filterType={filterType}
            hasIsolation={false}
            selectedAnimal={selectedAnimal}
          />
          <BarChartComponent
            title="Trạng thái sức khỏe"
            labels={{ healthy: "Khỏe", sick: "Bệnh" }}
            data={herdData}
            filterType={filterType}
            hasIsolation={true}
            selectedAnimal={selectedAnimal}
          />

          <div className="p-4 bg-[#FFFFF1] rounded-[16px] w-full mx-auto">
            <h2 className="text-sx sm:text-lg mb-4 text-left font-semibold">
              Số ca chữa khỏi, tái phát
            </h2>
            <div className="bg-[#FFFFF1] p-6 rounded-[16px] border border-[#A1A3AB] grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3 md:col-span-1 text-left">
                <InputField
                  label="Tổng số lượng"
                  value={data.total}
                  onChange={(val) => handleChange("total", val)}
                  type="number"
                />
                <InputField
                  label="Số lượng nhập"
                  value={data.imported}
                  onChange={(val) => handleChange("imported", val)}
                  type="number"
                />
                <InputField
                  label="Số lượng sinh sản"
                  value={data.born}
                  onChange={(val) => handleChange("born", val)}
                  type="number"
                />
                <InputField
                  label="Số lượng bệnh"
                  value={data.sick}
                  onChange={(val) => handleChange("sick", val)}
                  type="number"
                />
                <InputField
                  label="Số lượng phục hồi"
                  value={data.recovered}
                  onChange={(val) => handleChange("recovered", val)}
                  textColor="#76BC6A"
                  borderColor="#76BC6A"
                  labelColor="#76BC6A"
                  type="number"
                />
                <InputField
                  label="Số lượng tiêu hủy"
                  value={data.destroyed}
                  onChange={(val) => handleChange("destroyed", val)}
                  textColor="#F44336"
                  borderColor="#F44336"
                  labelColor="#F44336"
                  type="number"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-[#242731] text-sm font-medium mb-1 text-left">
                  Nhận xét
                </label>
                <div className="relative">
                  <textarea
                    value={data.note}
                    onChange={(e) => handleChange("note", e.target.value)}
                    className="w-full border border-[#D4D4D4] rounded-[6px] p-2 text-[#242731] resize-none focus:outline-none focus:border-[#F8C32C] h-[110px]"
                    rows={4}
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <FiEdit
                      className="text-[#FCBD2D] cursor-pointer hover:text-amber-500"
                      size={18}
                    />
                    <FiTrash2
                      className="text-[#F14871] cursor-pointer hover:text-red-500"
                      size={18}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
                  >
                    Lưu Thay Đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
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

export default HerdsReport;
