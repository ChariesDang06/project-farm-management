import { FaHome, FaUser, FaCog, FaBell } from "react-icons/fa";

const Item = ({ icon: Icon, text ,des}:{icon: React.ElementType; text:string;des:string}) => {
  return (
    <div className="flex flex-col items-center gap-y-6 justify-center  max-w-75 overflow-hidden w-75 h-75 px-7 py-12 bg-gray-100 rounded-3xl shadow-lg">
      <Icon className="text-3xl text-blue-500" />
      <h2 className="text-lg font-black text-gray-700 truncate">{text}</h2>
      <span className="text-sm font-medium text-gray-700 truncate">{des}</span>
    </div>
  );
};

export default function AppTest() {
  return (
    <div className="flex flex-wrap justify-between py-8">
      <Item icon={FaHome} text="Homesssssssssssssssssssssssssssssss" des="Homesssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqssssssssssssssssssssssssssss"  />
      <Item icon={FaUser} text="Profile" des="Homesssssssssssssssss" />
      <Item icon={FaCog} text="Settings" des="Homessssssssssssssssss" />
      <Item icon={FaBell} text="Notifications" des="Homesssss" />
    </div>
  );
}
