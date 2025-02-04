import { useState } from "react";
import logo from "../../assets/logo.png";
import { FaCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import NavbarItem from "./NavbarItem";
import Button from "../button/Button";
import { LiaPhoneVolumeSolid } from "react-icons/lia";

function Navbar() {
  const [toggle, setToggle] = useState(false);

  const menu = [
    { name: "HOME", icon: FaCircle },
    { name: "PAGES", icon: FaCircle },
    { name: "SERVICE", icon: FaCircle },
    { name: "PORTFOLIO", icon: FaCircle },
    { name: "BLOG", icon: FaCircle },
    { name: "CONTACT US", icon: FaCircle },
  ];

  return (
    <div className="flex items-center justify-between p-5 relative">
      <div className="flex gap-8 items-center">
        <div className="flex items-center">
          <img src={logo} className="md:w-[80px] lg:w-[56px] object-cover" />
          <span
            className="w-[107px] h-[24px] font-[400] text-[24px] text-[#FCBD2D] 
                tracking-[0.01em] font-[Segoe_Script]"
          >
            DLFarm
          </span>
        </div>
        <div className="hidden lg:flex gap-8">
          {menu.map((item) => (
            <NavbarItem key={item.name} name={item.name} Icon={item.icon} />
          ))}
        </div>
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="p-2 rounded-md bg-gray-800 text-white"
          >
            <HiDotsVertical className="w-6 h-6 " />
          </button>
          {toggle && (
            <div className="absolute top-24 left-0 w-full bg-[#121212] border border-gray-700 shadow-lg p-4 flex flex-col items-start">
              {menu.map((item) => (
                <NavbarItem key={item.name} name={item.name} Icon={item.icon} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <LiaPhoneVolumeSolid className="w-8 h-8 text-[#EDDD5E]" />
          <div className="flex flex-col text-white">
            <span className="text-lg font-semibold text-[16px]">Hotline</span>
            <span className="text-[14px]">+84 123 123 12</span>
          </div>
        </div>
        <Button backgroundColor="#FFFFFF" iconType="search" />
        <Button text="Đăng Nhập" backgroundColor="#EDDD5E" iconType="arrow" />
      </div>
    </div>
  );
}

export default Navbar;
