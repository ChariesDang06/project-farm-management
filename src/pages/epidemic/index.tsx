import React, { useState, useEffect } from "react";
import ButtonAction from "../../components/button/ButtonAction";
import TrackRecord from "./TrackRecord";
import TreatmentPlan from "./TreatmentPlan";
import EpidemicReport from "./EpidemicReport";
import { MdSick } from "react-icons/md";

const IndexEpidemic: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<TrackRecord />);
  const [activeButton, setActiveButton] = useState<string>("Kiểm soát dịch bệnh");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const buttons = [
    { text: "Hồ sơ theo dõi", component: <TrackRecord /> },
    { text: "Kế hoạch điều trị", component: <TreatmentPlan /> },
    { text: "Báo cáo", component: <EpidemicReport /> },
  ];

  const handleButtonClick = (text: string, component: React.ReactNode) => {
    setActiveButton(text);
    setActiveComponent(component);
  };

  return (
    <div className="gap-4 w-full space-y-5">
      <ButtonAction icon={<MdSick className="w-5 h-5" />} hoverBorderColor="#76bc6a"  borderColor="#000000" bgColor="#000000" textColor="#ffffff"  text="Kiểm soát dịch bệnh" disabled={true} truncate={false}/>

      <div className="flex gap-2">
        {buttons.map((btn, index) => (
          <ButtonAction
            key={index}
            text={btn.text}
            onClick={() => handleButtonClick(btn.text, btn.component)}
            bgColor={activeButton === btn.text ? "#76bc6a" : "#ffffff"}
            textColor={activeButton === btn.text ? "#ffffff" : "#76bc6a"}
            borderColor="#76bc6a"
            truncate={isMobile}
            disabled={activeButton === btn.text}
          />
        ))}
      </div>

      <div>{activeComponent}</div>
    </div>
  );
};

export default IndexEpidemic;
