import { useState } from "react";
import BarChartComponent from "../../components/bar-chart/BarChartComponent";
import TimelineSelector from "../../components/timeline-selector/TimelineSelector";
import RecoveryReport from "../../components/input-field/InputField";

const HerdsReport = () => {
  const [filterType, setFilterType] = useState<"year" | "month" | "week">("year");
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  return (
    <div className="bg-[#F3F7F5] rounded-[16px] p-5">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl">Thống kê</h1>
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
          filterType={filterType}
          hasIsolation={false}
          selectedAnimal={selectedAnimal}
        />
        <BarChartComponent
          title="Trạng thái sức khỏe"
          filterType={filterType}
          hasIsolation={true}
          selectedAnimal={selectedAnimal}
        />
        {/* <BarChartComponent
          title="Tỉ lệ nhập kho"
          filterType={filterType}
          hasIsolation={false}
          selectedAnimal={selectedAnimal}
        /> */}
      <RecoveryReport/>

      </div>
    </div>
    
  );
};

  export default HerdsReport;
  