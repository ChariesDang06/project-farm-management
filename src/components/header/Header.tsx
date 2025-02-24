import {useContext} from "react"
import AvataAdmin from "../../assets/avataAdmin.png"
import IconNo from "../../assets/IconNotification.png"
import FarmSelector from "../farm-selector/FarmSelector"
import { AuthContext } from "../../hooks/user"
const Header = () => {
  const handleFarmSelect = (id: string) => {
    console.log("Selected Farm ID:", id);
  };
  const {currentUser}=useContext(AuthContext);
  return (
    <div className="flex items-center justify-between">
      <FarmSelector onSelect={handleFarmSelect} />
      <div className="flex items-center gap-4 w-auto p-2 bg-[#262626] rounded-full" >
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer relative">
          <img src={IconNo} alt="" width={18} height={18} />
          <div className="absolute -top-[0px] -right-[0px] w-2 h-2 bg-[#EB5757] rounded-full"></div>
        </div>
        <div className="flex items-center cursor-pointer gap-2 ">
          <img src={AvataAdmin} alt="" width={31} height={32} className="rounded-full" />
          <div className="flex flex-col text-left">
            <span className="text-[14px] leading-3  text-white">{currentUser?.name}</span>
            <span className="text-[14px] text-[#CBCBCB]">{currentUser?.role}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header