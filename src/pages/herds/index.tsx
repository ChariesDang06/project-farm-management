import React, { useState } from "react";
import ButtonAction from "../../components/button/ButtonAction";
import AbnormalDetection from "./AbnormalDetection";
import HerdsReport from "./HerdsReport";
import Herds from "./Herds";
import { MdOutlinePets } from "react-icons/md";

const IndexHerd: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<AbnormalDetection />);
  const [activeButton, setActiveButton] = useState<string>("Giám sát chuồng trại");


  const buttons = [
    { text: "Quản lý", component: <Herds /> },
    { text: "Báo cáo", component: <HerdsReport /> },
  ];

  const handleButtonClick = (text: string, component: React.ReactNode) => {
    setActiveButton(text);
    setActiveComponent(component);
  };

  return (
    <div className="gap-4 w-full space-y-5">
      <ButtonAction
        icon={<MdOutlinePets className="w-5 h-5" />}
        hoverBorderColor="#76bc6a"
        text="Giám sát chuồng trại"
        textColor={activeButton === "Giám sát chuồng trại" ? "#ffffff" : "#ffffff"}
        bgColor={activeButton === "Giám sát chuồng trại" ? "#76bc6a" : "#000000"}
        borderColor="#76bc6a"
        truncate={false}
        onClick={() => {
          setActiveButton("Giám sát chuồng trại");
          setActiveComponent(<AbnormalDetection />);
        }}
      />

      <div className="flex gap-2">
        {buttons.map((btn, index) => (
          <ButtonAction
            key={index}
            text={btn.text}
            bgColor={activeButton === btn.text ? "#76bc6a" : "#ffffff"}
            textColor={activeButton === btn.text ? "#ffffff" : "#76bc6a"}
            borderColor="#76bc6a"
            onClick={() => handleButtonClick(btn.text, btn.component)}
          />
        ))}
      </div>

      <div>
        {activeComponent}
      </div>
    </div>
  );
};

export default IndexHerd;
