

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const generateData = (type: "year" | "month" | "week", hasIsolation: boolean) => {
  return {
    year: Array.from({ length: 12 }, (_, i) => ({
      name: `Tháng ${i + 1}`,
      khoe: Math.floor(Math.random() * 20000) + 5000,
      benh: Math.floor(Math.random() * 8000) + 2000,
      cachly: hasIsolation ? Math.floor(Math.random() * 3000) + 1000 : undefined,
    })),
    month: Array.from({ length: 4 }, (_, i) => ({
      name: `Tuần ${i + 1}`,
      khoe: Math.floor(Math.random() * 5000) + 1000,
      benh: Math.floor(Math.random() * 2000) + 500,
      cachly: hasIsolation ? Math.floor(Math.random() * 1000) + 200 : undefined,
    })),
    week: Array.from({ length: 7 }, (_, i) => ({
      name: `Ngày ${i + 1}`,
      khoe: Math.floor(Math.random() * 1000) + 300,
      benh: Math.floor(Math.random() * 500) + 100,
      cachly: hasIsolation ? Math.floor(Math.random() * 300) + 50 : undefined,
    })),
  }[type] || [];
};

const labelMap = {
  "Số lượng vật nuôi": { healthy: "Khỏe", sick: "Bệnh" },
  "Tỉ lệ nhập kho": { healthy: "Nhập", sick: "Xuất" },
} as const;

const BarChartComponent = ({ 
  title, 
  filterType, 
  hasIsolation,
  selectedAnimal, 
}: {
  title: string;
  filterType: "year" | "month" | "week"; 
  hasIsolation: boolean;
  selectedAnimal: string;
}) => {
  const data = generateData(filterType, hasIsolation);
  const labels = labelMap[title as keyof typeof labelMap] || { healthy: "Khỏe", sick: "Bệnh" };

  return (
    <div className="p-4 bg-white rounded-[16px] shadow-md">
      <h1 className="text-md md:text-xl mb-4 text-left font-semibold">{title}</h1>
      <ResponsiveContainer
        width="100%"
        aspect={window.innerWidth < 640 ? 1.2 : 2.5} 
        className="max-h-400 sm:max-h-100"
      >
        <BarChart data={data} barSize={window.innerWidth < 640 ? 20 : 30} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" className="hidden sm:block" />
          <XAxis
            dataKey="name"
            tick={{
              fill: "#555",
              fontSize: window.innerWidth < 640 ? 10 : 14,
            }}
          />
          <YAxis
            tick={{
              fill: "#555",
              fontSize: window.innerWidth < 640 ? 10 : 14,
            }}
          />
          <Tooltip />
          <Bar dataKey="khoe" fill="#278D45" name={`${selectedAnimal} khỏe`} radius={[4, 4, 0, 0]} />
          <Bar dataKey="benh" fill="#FCBD2D" name={`${selectedAnimal} bệnh`} radius={[4, 4, 0, 0]} />
          {hasIsolation && <Bar dataKey="cachly" fill="#ED3636" name={`${selectedAnimal} cách ly`} radius={[4, 4, 0, 0]} />}
        </BarChart>
      </ResponsiveContainer>


      <div className="flex flex-nowrap overflow-x-auto  justify-center items-center gap-2 sm:gap-4 bg-[#1C1717] text-white rounded-lg sm:p-3 p-2 w-fit mx-auto mt-2 sm:mt-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="sm:w-2 sm:h-2  h-1 w-1 bg-green-500 rounded-full"></div>
            <p className="text-[12px] sm:text-sm">{selectedAnimal} {labels.healthy}</p>
          </div>
          <p className="text-[12px] sm:text-lg">{data.reduce((acc, cur) => acc + (cur.khoe || 0), 0).toLocaleString()}</p>
        </div>
        <div className="w-[1px] h-10 bg-gray-500"></div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="sm:w-2 sm:h-2 h-1 w-1 bg-yellow-500 rounded-full"></div>
            <p className="text-[10px] sm:text-sm">{selectedAnimal} {labels.sick}</p>
          </div>
          <p className="text-[12px] sm:text-lg">{data.reduce((acc, cur) => acc + (cur.benh || 0), 0).toLocaleString()}</p>
        </div>
        {hasIsolation &&
          <>
            <div className="w-[1px] h-10 bg-gray-500"></div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <div className="sm:w-2 sm:h-2  h-1 w-1 bg-[#ED3636] rounded-full"></div>
                <p className="text-[10px] sm:text-sm">{selectedAnimal} Đang cách ly</p>
              </div>
              <p className="text-[12px] sm:text-lg">{data.reduce((acc, cur) => acc + (cur.cachly || 0), 0).toLocaleString()}</p>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default BarChartComponent;
