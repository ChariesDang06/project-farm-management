import { useState } from "react";
import logo from "../../assets/IconHomePage/logo.png";
import { FaCircle ,FaHome,FaBlog, FaPager} from "react-icons/fa";
import { BsMenuAppFill } from "react-icons/bs";
import NavbarItem from "./NavbarItem";
import Button from "../button/Button";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { BiLogIn,BiCategory,BiSolidContact   } from "react-icons/bi";
import { Link } from "react-scroll";
import { MdOutlineRestaurantMenu, MdOutlineMiscellaneousServices,    } from "react-icons/md";
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
  const menuMobile = [
    { name: "HOME", icon: FaHome },
    { name: "PAGES", icon: FaPager  },
    { name: "SERVICE", icon: MdOutlineMiscellaneousServices },
    { name: "PORTFOLIO", icon: BiCategory },
    { name: "BLOG", icon: FaBlog },
    { name: "CONTACT US", icon:  BiSolidContact},
  ];
  return (
    <div className="flex items-center justify-between p-5 pr-5 sm:pr-38 relative">
     {/* <div className="fixed  w-full rounded-b-xl shadow-md z-50 flex items-center justify-between p-5 pr-5 sm:pr-50"> */}
      <div className="flex gap-8 items-center">
        <div className="flex items-center">
          <img src={logo} className="mr-1 md:w-[60px] lg:w-[56px] object-cover" />
          <span
            className=" w-[100px] h-[24px] font-[300] text-[24px] text-[#FCBD2D] 
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
        
      </div>

      <div className=" flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-3">
          <LiaPhoneVolumeSolid className="w-8 h-8 text-[#EDDD5E]" />
          <div className="flex  flex-col text-white">
            <span className="text-lg font-semibold text-[16px]">Hotline</span>
            <span className="text-[14px]">+84 123 123 12</span>
          </div>
        </div>
        <div className="hidden sm:flex ">
        <Button backgroundColor="#FFFFFF" iconType="search" />
        </div>
        <Link to="targetSection" >
              <div className="hidden sm:flex">
                <Button login={true}/>
              </div>
        </Link>
        <div>
          <div
              className="sm:hidden fixed top-6 right-4 z-50 rounded-xl shadow-lg shadow-orange-500/50 bg-[#ffb53f] p-3 h-10 inline-flex items-center justify-center gap-x-2 w-auto">
              <div onClick={() => setToggle(!toggle)} className="cursor-pointer">
                {toggle ? (
                  <MdOutlineRestaurantMenu className="text-[#fff] w-6 h-6 font-semibold" />
                ) : (
                  <BsMenuAppFill className="text-[#fff] w-6 h-6 font-semibold" />
                )}
              </div>
              <Link to="targetSection" >
                <BiLogIn className=" text-[#fff]  w-6 h-6 font-semibold" />
              </Link>
            </div>
            <div
              className={`absolute shadow-lg fixed top-0 left-0 top-24 left-0  w-[200px] rounded-r-xl bg-white z-30  pl-0 py-6 flex flex-col items-start 
                          transform transition-transform duration-500 ease-in-out 
                          ${toggle ? 'translate-x-0' : '-translate-x-full'}`}
            >
                    {menuMobile.map((item) => (
                      <NavbarItem key={item.name} name={item.name} Icon={item.icon}  textColor="text-black"
                      iconColor="text-[#ffb53f]"
                      padding="px-4 py-2"
                      iconwh="w-4 h-4"
                      activeColor="active:bg-[#f1e481a3]"
                      borderItem="rounded-r-xl"/>
                    ))}
            </div>
        </div>
          
      </div>
      
    </div>
  );
}

export default Navbar;
