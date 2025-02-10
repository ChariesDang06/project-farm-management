import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type ChartType = "herd" | "consumption";
type FilterType = "year" | "month" | "week";

type ChartData = {
  name: string;
  [key: string]: number | string;
};

interface LineChartProps {
  title: string;
  chartType: ChartType;
  filterType: FilterType;
}

const generateChartData = (chartType: ChartType, filterType: FilterType): ChartData[] => {
  const dataMap: Record<FilterType, ChartData[]> =
    chartType === "herd"
      ? {
          year: Array.from({ length: 12 }, (_, i) => ({
            name: `Tháng ${i + 1}`,
            "Cừu Appenninica": Math.floor(Math.random() * 200),
            "Cừu Bentheimer": Math.floor(Math.random() * 180),
            "Cừu Merinoland": Math.floor(Math.random() * 150),
            "Dê Boer": Math.floor(Math.random() * 220),
            "Dê Saanen": Math.floor(Math.random() * 190),
          })),
          month: Array.from({ length: 4 }, (_, i) => ({
            name: `Tuần ${i + 1}`,
            "Cừu Appenninica": Math.floor(Math.random() * 100),
            "Cừu Bentheimer": Math.floor(Math.random() * 90),
            "Cừu Merinoland": Math.floor(Math.random() * 80),
            "Dê Boer": Math.floor(Math.random() * 120),
            "Dê Saanen": Math.floor(Math.random() * 110),
          })),
          week: Array.from({ length: 7 }, (_, i) => ({
            name: `Ngày ${i + 1}`,
            "Cừu Appenninica": Math.floor(Math.random() * 50),
            "Cừu Bentheimer": Math.floor(Math.random() * 40),
            "Cừu Merinoland": Math.floor(Math.random() * 35),
            "Dê Boer": Math.floor(Math.random() * 60),
            "Dê Saanen": Math.floor(Math.random() * 55),
          })),
        }
      : {
          year: Array.from({ length: 12 }, (_, i) => ({
            name: `Tháng ${i + 1}`,
            "Thức ăn": Math.floor(Math.random() * 100),
            "Điện": Math.floor(Math.random() * 80),
            "Y tế": Math.floor(Math.random() * 60),
            "Nước": Math.floor(Math.random() * 90),
          })),
          month: Array.from({ length: 4 }, (_, i) => ({
            name: `Tuần ${i + 1}`,
            "Thức ăn": Math.floor(Math.random() * 50),
            "Điện": Math.floor(Math.random() * 40),
            "Y tế": Math.floor(Math.random() * 30),
            "Nước": Math.floor(Math.random() * 45),
          })),
          week: Array.from({ length: 7 }, (_, i) => ({
            name: `Ngày ${i + 1}`,
            "Thức ăn": Math.floor(Math.random() * 20),
            "Điện": Math.floor(Math.random() * 15),
            "Y tế": Math.floor(Math.random() * 10),
            "Nước": Math.floor(Math.random() * 18),
          })),
        };

  return dataMap[filterType];
};

const LineChartComponent: React.FC<LineChartProps> = ({ title, chartType, filterType }) => {
  const data = generateChartData(chartType, filterType);
  const colors: Record<string, string> =
    chartType === "herd"
      ? {
          "Cừu Appenninica": "#4CAF50",
          "Cừu Bentheimer": "#E91E63",
          "Cừu Merinoland": "#FF9800",
          "Dê Boer": "#9C27B0",
          "Dê Saanen": "#2196F3",
        }
      : {
          "Thức ăn": "#278D45",
          "Điện": "#FCBD2D",
          "Y tế": "#ED3636",
          "Nước": "#1C91E6",
        };

  return (
    <div className="p-4 bg-white rounded-[16px] shadow-md">
      <h1 className="text-lg mb-4 text-left font-semibold">{title}</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#555" }} />
          <YAxis tick={{ fill: "#555" }} />
          <Tooltip />
          {Object.keys(colors).map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[key]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center bg-[#1C1717] text-white rounded-lg p-3 w-fit mx-auto mt-4">
        {Object.keys(colors).map((key, index, array) => (
          <div key={key} className="flex flex-row items-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[key] }}></span>
                <span className="ml-2 text-sm">{key}</span>
              </div>
              <span className="text-lg">12,423</span>
            </div>
            {index !== array.length - 1 && (
              <div className="w-[1px] h-10 bg-gray-500 mx-4 hidden md:block"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChartComponent;
