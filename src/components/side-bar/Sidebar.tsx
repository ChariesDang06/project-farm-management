import {useLocation } from "react-router-dom";
export function SidebarItem({
  icon,
  text,
  url,
  active,
  alert,
  subItems ,
  onSelect, 
}: {
  icon: ReactNode;
  text: string;
  url?: string;
  active?: boolean;
  alert?: boolean;
  subItems?: { text: string; url?: string }[]; 
  onSelect?: (path: string) => void;
}) {
  const { expanded } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = subItems && subItems.length > 0;
  const location = useLocation();
  const isActive = url === location.pathname || subItems?.some((sub) => sub.url === location.pathname);
  
  useEffect(() => {
    if (isActive) setIsOpen(true);
  }, [isActive]);
  return (
    <>
     <li
          className={`bg-[#F3F7F5] text-[#111111] w-full relative flex text-left my-3 font-medium cursor-pointer transition-colors group
            ${isActive  ? "bg-black text-white" : "hover:bg-[#111111] hover:text-white"}
            ${isOpen ? "rounded-[20px]" : "rounded-[100px]"}
            ${expanded ? "py-2 px-4" : "hidden p-3"}`
            }
            onClick={() => {
              if (hasSubItems) {
                setIsOpen(!isOpen);
              } else if (url && onSelect) {
                onSelect(url); 
              }
            }}
          >
          <div className="w-full">
            <div className={`flex justify-between w-full rounded-full`}>
              <div className="flex gap-x-4">
                {icon && <span className="flex-shrink-0">{React.cloneElement(icon as React.ReactElement, { size: 20 })}</span>}
                {/* <span className={`overflow-hidden transition-all ${
                    expanded ? "w-34 ml-4 block" : "hidden"
                  }`}
                >
                </span> */}
                {hasSubItems ? (
                  text
                ) : (
                  <Link
                  to={url || "#"}
                  className="flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (url && onSelect) {
                      setTimeout(() => onSelect(url), 50);  
                    }
                  }}
                >
                  {text}
                </Link>
                
                )}
               {!expanded && (
                <div
                  className="absolute left-full rounded-md px-2 py-1 ml-6 bg-[#B1B1B1] text-white text-sm
                    invisible opacity-0 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                    whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]"
                >
                  {text}
                </div>
              )}

              </div>
              
              {hasSubItems && (
                <span className={`overflow-hidden transition-all  ${
                  expanded ? "w-3" : "w-0"
                }`}>
                  {isOpen ? <FiChevronDown /> : <FiChevronRight />}
                </span>
              )}
                
            </div>

            {isOpen && hasSubItems && (
              <div className={`${active ? "bg-black text-white" : "hover:bg-[#111111] hover:text-white"}`}>
                {subItems.map((item, index) => (
                     <Link
                     key={index}
                     to={item.url || "#"}
                     className="block py-2 cursor-pointer hover:border-b hover:border-[#B1B1B1]"
                     onClick={(e) => {
                       e.stopPropagation();
                       if (item.url && onSelect) onSelect(item.url); 
                     }}
                   >
                     {item.text}
                   </Link>
                ))}
              </div>
            )}
          </div>
          {alert && <div className={`absolute right-2 w-2 h-2 rounded-full bg-indigo-400 ${expanded ? "" : "top-2"}`} />}
          
      </li>
    </>
  );
}

import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import React, { useContext, createContext, useState, ReactNode, useEffect } from "react";
import logo2 from "../../assets/IconHomePage/logo2.png";
import { Link } from "react-router-dom";
import logoCuu from "../../assets/logoCuu.png";
const SidebarContext = createContext<{ expanded: boolean }>({ expanded: true });

export default function Sidebar({
  children,
  expanded,
  setExpanded,
}: {
  children: ReactNode;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1224);
  const [wasExpanded, setWasExpanded] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 1224;
      setIsMobile(mobileView);
      setExpanded(!mobileView);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

useEffect(() => {
  const handleResize = () => setScreenHeight(window.innerHeight);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  return (
    <>
      {!expanded && (
        <button
          className="fixed top-6 left-4 z-50 p-2 bg-[#76bc6a] hover:bg-[#278d45] text-white rounded-md cursor-pointer"
          onClick={() => {
            setWasExpanded(true); 
            setExpanded(true);
          }}
        >
          <FaBarsStaggered className=" w-5 h-5"/>
        </button>
      )}
      {isMobile && expanded && (
        <div
          className="fixed inset-0 bg-gray-500/70 z-40 lg:hidden"
          onClick={() => setExpanded(false) }
        ></div>
      )}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#CBE2C8] text-black z-50 transition-all ease-in-out duration-300
          ${expanded ? "" : "w-0 lg:hidden"}
        `}
      >
        {expanded && (
          <Link to="/" className="flex items-center m-4 mt-0 gap-2">
            <img src={logo2} className="w-[49px] object-cover mt-4 flex-shrink-0" />
            <span className="text-[#111111] transition-all mt-4">DL FARM</span>
          </Link>
        )}

        <button
          onClick={() => {
            setWasExpanded(false); 
            setExpanded(false);
          }}
          className="absolute top-6 right-[6px] p-2 bg-transparent rounded-r-lg hover:text-white cursor-pointer"
        >
          <FaXmark size={20} />
        </button>
        {!isMobile && expanded && screenHeight > 600 && (
            <div className="hidden md:block p-3 fixed bottom-0">
              <div className="relative flex flex-col items-center p-6 bg-black rounded-2xl shadow-lg w-[190px]">
                <div className="absolute -top-10 flex items-center justify-center w-20 h-20 rounded-full border-4 border-white bg-[#FFA500] shadow-md">
                  <img src={logoCuu} alt="Sheep" className="w-16 h-16 rounded-full object-cover" />
                </div>

                <div className="mt-10 text-center text-white">
                  <h3 className="font-bold text-lg">Đây là quảng cáo</h3>
                  <p className="mt-2 text-sm opacity-80">
                    Nạp vip để nông trại của bạn vip hơn và ủng hộ nhà sản xuất nha
                  </p>
                </div>
                <div className="absolute top-6 left-4 w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="absolute bottom-6 right-6 w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="absolute bottom-4 left-10 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <div className="absolute bottom-10 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          )}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="px-3">
            {React.Children.map(children, (child) =>
              React.cloneElement(child as React.ReactElement, {
                onSelect: (path: string) => {
                  if (wasExpanded) {
                    setExpanded(false); 
                  }
                },
              })
            )}
          </ul>
        </SidebarContext.Provider>
      </aside>
    </>
  );
}