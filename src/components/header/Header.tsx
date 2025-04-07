import {useContext,useState,useEffect} from "react"
import AvataAdmin from "../../assets/avataAdmin.png"
import IconNo from "../../assets/IconNotification.png"
import { AuthContext } from "../../hooks/user"
import BarnSelector, { Barn } from "../barn-selector/BarnSelector"
import { MdHomeWork ,MdNotificationsNone } from "react-icons/md";
import React from "react";

export default function Header({
  expanded,
}: {
  expanded: boolean;
}) {
  const handleFarmSelect = (id: string) => {
    console.log("Selected Farm ID:", id);
  };
      const [farms, setFarms] = useState<Barn[]>([]);
    useEffect(() => {
        const fetchBarns = async () => {
          try {
            const response = await fetch("https://agriculture-traceability.vercel.app/api/v1/rooms");
            const data = await response.json();
            setFarms(data.rooms);
          } catch (error) {
            console.error("Error fetching:", error);
          }
        };
        fetchBarns();
      }, []);
  const {currentUser}=useContext(AuthContext);
  return (
    <div className="flex items-center justify-between">
    <BarnSelector
          barns={farms}
          onSelect={handleFarmSelect}
          icon={<MdHomeWork className="text-[#278D45] w-5 h-5"  />}
          rounded={true}
          widthFull={`w-[210px] ${expanded ? "ml-0" : "ml-10"}`}
          placeholder={`${expanded ? "Nông trại Lạc Dương" : "NT Lạc Dương"}`}
          iconColor="text-green"
          iconBgColor="bg-white"
        />
      <div className="flex items-center gap-4 w-auto p-2 bg-[#262626] rounded-full" >
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer relative shrink-0">
          <MdNotificationsNone className="w-6 h-6 text-orange-300"/>
          <div className="absolute -top-[0px] -right-[0px] w-2 h-2 bg-[#EB5757] rounded-full"></div>
        </div>
        <div className={`flex items-center cursor-pointer gap-2 shrink-0 pr-2`}>
          <img src={AvataAdmin} alt="" width={31} height={32} className="rounded-full" />
          <div className="flex flex-col text-left hidden md:flex">
            <span className="text-[14px] leading-3  text-white">{currentUser?.name}</span>
            <span className="text-[14px] text-[#CBCBCB]">{currentUser?.role}</span>
          </div>
        </div>
      </div>
    </div>
  )
}