import React, { useState } from "react";
import ButtonAction from "../../components/button/ButtonAction";
import Water from "./Water";
import Food from "./Food";
import Medical from "./Medical";
import ResourcesReport from "./ResourcesReport";
import { BiSolidBarChartSquare } from "react-icons/bi";

const IndexResources: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<Water />);

  const buttons = [
    { text: "Nước", component: <Water /> },
    { text: "Thức ăn", component: <Food /> },
    { text: "Y tế", component: <Medical/> },
    { text: "Báo cáo", component: <ResourcesReport /> },
  ];
  return (
    <div className="gap-4 w-full space-y-5">
        <ButtonAction icon={<BiSolidBarChartSquare className="w-5 h-5" />}  bgColor="#000000" textColor="#ffffff"  text="Quản lý tài nguyên" onClick={() => setActiveComponent(<Water />)} />
      <div className="flex gap-2">
        {buttons.map((btn, index) => (
          <ButtonAction key={index} bgColor="#ffffff" textColor="#76bc6a" borderColor="#76bc6a"  text={btn.text} onClick={() => setActiveComponent(btn.component)} />
        ))}
      </div>

      <div className="">
        {activeComponent}
      </div>
    </div>
  );
};

export default IndexResources;