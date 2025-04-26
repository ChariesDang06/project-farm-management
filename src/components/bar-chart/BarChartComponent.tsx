import useWindowSize from "./useWindowSize";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({
  title,
  data,
  hasIsolation,
  selectedAnimal,
  filterType,
  labels,
}: {
  title: string;
  data: Array<any>;
  filterType: "year" | "month" | "week";
  hasIsolation: boolean;
  selectedAnimal: string;
  labels: { healthy: string; sick: string };
}) => {
  const { width } = useWindowSize();

  return (
    <>
      <div className="p-2 md:p-4 bg-white rounded-[16px] shadow-md">
        <h1 className="text-md md:text-xl mb-4 text-left font-semibold">
          {title}
        </h1>

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
              dataKey={labels.healthy}
              fill="#278D45"
              name={`${selectedAnimal} ${labels.healthy}`}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey={labels.sick}
              fill="#FCBD2D"
              name={`${selectedAnimal} ${labels.sick}`}
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
                .reduce((acc, cur) => acc + (cur[labels.healthy] || 0), 0)
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
                .reduce((acc, cur) => acc + (cur[labels.sick] || 0), 0)
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
    </>
  );
};

export default BarChartComponent;
