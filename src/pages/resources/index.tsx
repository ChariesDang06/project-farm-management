import React, { useState } from "react";
import ButtonAction from "../../components/button/ButtonAction";
import Water from "./Water";
import Food from "./Food";
import Medical from "./Medical";
import ResourcesReport from "./ResourcesReport";
import { BiSolidBarChartSquare } from "react-icons/bi";

const IndexResources: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<Water />);
  const [activeButton, setActiveButton] = useState<string>("Quản lý tài nguyên");

  const buttons = [
    { text: "Nước", component: <Water /> },
    { text: "Thức ăn", component: <Food /> },
    { text: "Y tế", component: <Medical /> },
    { text: "Báo cáo", component: <ResourcesReport /> },
  ];

  const handleButtonClick = (text: string, component: React.ReactNode) => {
    setActiveButton(text);
    setActiveComponent(component);
  };

  return (
    <div className="gap-4 w-full space-y-5">
      <ButtonAction
        icon={<BiSolidBarChartSquare className="w-5 h-5" />}
        hoverBorderColor="#000000"
        borderColor="#000000"
        bgColor="#000000"
        textColor="#ffffff"
        text="Quản lý tài nguyên"
        truncate={false}
        disabled={true}
      />

      <div className="flex gap-2">
        {buttons.map((btn, index) => (
          <ButtonAction
            key={index}
            text={btn.text}
            onClick={() => handleButtonClick(btn.text, btn.component)}
            bgColor={activeButton === btn.text ? "#76bc6a" : "#ffffff"}
            textColor={activeButton === btn.text ? "#ffffff" : "#76bc6a"}
            borderColor="#76bc6a"
            disabled={activeButton === btn.text}
          />
        ))}
      </div>

      <div>{activeComponent}</div>
    </div>
  );
};

export default IndexResources;
