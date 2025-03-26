import React, { useState } from "react";
import ButtonAction from "../../components/button/ButtonAction";
import AbnormalDetection from "./AbnormalDetection";
import HerdsReport from "./HerdsReport";
import Herds from "./Herds";
import { MdOutlinePets } from "react-icons/md";

const IndexHerd: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<Herds />);

  const buttons = [
    { text: "Giám sát", component: <AbnormalDetection /> },
    { text: "Báo cáo", component: <HerdsReport /> },
  ];
  return (
    <div className="gap-4 w-full space-y-5">
        {/* <ButtonAction  text="Quản lý vật nuôi" onClick={() => setActiveComponent(<Herds />)} bgColor="#000000" textColor="#ffffff" /> */}
        <ButtonAction icon={<MdOutlinePets className="w-5 h-5" />}  text="Quản lý vật nuôi" onClick={() => setActiveComponent(<Herds />)} bgColor="#000000" textColor="#ffffff" />
      <div className="flex gap-2">
        {buttons.map((btn, index) => (
          <ButtonAction key={index} text={btn.text} bgColor="#ffffff" textColor="#76bc6a" borderColor="#76bc6a" onClick={() => setActiveComponent(btn.component)} />
        ))}
      </div>

      <div className="">
        {activeComponent}
      </div>
    </div>
  );
};

export default IndexHerd;