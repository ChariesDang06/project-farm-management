import React, { useState } from "react";
import ButtonAction from "../../components/button/ButtonAction";
import TrackRecord from "./TrackRecord";
import TreatmentPlan from "./TreatmentPlan";
import EpidemicReport from "./EpidemicReport";
import { MdSick } from "react-icons/md";

const IndexEpidemic: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<TrackRecord />);

  const buttons = [
    { text: "Hồ sơ theo dõi", component: < TrackRecord/> },
    { text: "Kế hoạch điều trị", component: <TreatmentPlan /> },
    { text: "Báo cáo", component: < EpidemicReport/> },
  ];
  return (
    <div className="gap-4 w-full space-y-5">
        <ButtonAction icon={<MdSick className="w-5 h-5" />} bgColor="#000000" textColor="#ffffff"  text="Kiểm soát dịch bệnh" onClick={() => setActiveComponent(<TrackRecord />)} />
      <div className="flex gap-2">
        {buttons.map((btn, index) => (
          <ButtonAction key={index} text={btn.text} onClick={() => setActiveComponent(btn.component)} bgColor="#ffffff" textColor="#76bc6a" borderColor="#76bc6a"  />
        ))}
      </div>

      <div className="">
        {activeComponent}
      </div>
    </div>
  );
};

export default IndexEpidemic;