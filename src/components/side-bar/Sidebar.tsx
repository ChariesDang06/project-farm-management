// import { FiChevronRight ,FiChevronLeft,FiChevronDown} from "react-icons/fi";
// import { FaBarsStaggered, FaXmark  } from "react-icons/fa6";
// import React, { useContext, createContext, useState, ReactNode ,useEffect} from "react";
// import logo2 from "../../assets/IconHomePage/logo2.png";
// import logoCuu from "../../assets/logoCuu.png";
// import { Link } from "react-router-dom";
// const SidebarContext = createContext<{ expanded: boolean }>({ expanded: true });

// export default function Sidebar({ children }: { children: ReactNode }) {
//   const [expanded, setExpanded] = useState(true);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 768px)");
//     const handleResize = () => {
//       setExpanded(!mediaQuery.matches);
//     };
//     handleResize();
//     mediaQuery.addEventListener("change", handleResize);
//     return () => mediaQuery.removeEventListener("change", handleResize);
//   }, []);

//   return (
//     <>
//     {/* Nút mở Sidebar khi trên mobile */}
//     <button 
//         className="fixed top-4 left-4 z-50 p-2 bg-[#cbe2c8] text-white rounded-md"
//         onClick={() => { setIsMobileOpen(true); setExpanded(true); }}
//       >
//         <FaBarsStaggered size={24} />
//       </button>

//       {/* Overlay nền tối khi mở Sidebar trên mobile */}
//       {isMobileOpen && (
//         <div 
//           className="fixed inset-0 bg-gray-500/70 z-40 md:hidden"
//           onClick={() => { setIsMobileOpen(false); setExpanded(false); }}
//         ></div>
//       )}

//       {/* <aside className="relative flex flex-col h-full bg-[#CBE2C8] text-black min-h-[100vh]"> */}
//       <aside 
//         className={`fixed top-0 left-0 h-full bg-[#CBE2C8] text-black min-h-[100vh] z-50 transition-transform md:relative 
//         ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >  
//         <Link to="/" className="flex items-center m-4 mt-0 gap-2">
//           <img src={logo2} className="w-[49px]  object-cover mt-4 flex-shrink-0" />
//           <span
//             className={`text-[#111111] overflow-hidden transition-all mt-4 ${expanded ? "block" : "hidden"}`}
//           >DL FARM
//           </span>
//         </Link>
//          {/* Nút toggle sidebar trên desktop */}
//          <button
//             onClick={() => setExpanded(true)}
//           className="absolute top-6 right-[-17px] -translate-y-1/2 p-1 rounded-lg self-end hidden md:block"
//         >
//           {expanded ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
//         </button>

//         {/* Nút đóng sidebar trên mobile */}
//         {isMobileOpen && (
//           <button
//             className="absolute top-4 right-4 p-2 text-black rounded-md"
//             onClick={() => { setIsMobileOpen(false); setExpanded(false); }}
//           >
//             <FaXmark size={24} />
//           </button>
//         )}
        
//         <button
//           onClick={() => setExpanded((curr) => !curr)}
//           className="absolute top-6 right-[-17px] -translate-y-1/2 p-1 rounded-lg self-end"
//         >
//           {expanded ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
//         </button>
//         <SidebarContext.Provider value={{ expanded }}>
//           <ul className="px-3 ">{children}</ul>
//         </SidebarContext.Provider>

//         <div className="flex hidden md:block p-3 items-center">
//             <div className="relative flex flex-col items-center p-6 bg-black rounded-2xl shadow-lg max-w-xs mx-auto">
//               <div className="absolute -top-10 flex items-center justify-center w-20 h-20 rounded-full border-4 border-white bg-[#FFA500] shadow-md">
//                 <img  src={logoCuu} alt="Sheep" className="w-16 h-16 rounded-full object-cover"
//                 />
//               </div>

//               <div className="mt-10 text-center text-white">
//                 <h3 className="font-bold text-lg">Đây là quảng cáo</h3>
//                 <p className="mt-2 text-sm opacity-80">
//                   Nạp vip để nông trại của bạn vip hơn và ủng hộ nhà sản xuất nha 
//                 </p>
//               </div>
//               <div className="absolute top-6 left-4 w-2 h-2 bg-yellow-400 rounded-full"></div>
//               <div className="absolute bottom-6 right-6 w-2 h-2 bg-yellow-400 rounded-full"></div>
//               <div className="absolute bottom-4 left-10 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
//               <div className="absolute bottom-10 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
//             </div>
//         </div>
//       </aside>
//     </>

//   );
// }

// Component SidebarItem
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

  return (
    <>
     <li
          className={`bg-[#F3F7F5] text-[#111111] relative flex text-left my-3 font-medium cursor-pointer transition-colors group
            ${active ? "bg-black text-white" : "hover:bg-[#111111] hover:text-white"}
            ${isOpen ? "rounded-[20px]" : "rounded-[100px]"}
            ${expanded ? "py-2 px-4" : "py-3 px-3"}`
            }
            onClick={() => {
              if (hasSubItems) {
                setIsOpen(!isOpen);
              } else if (url && onSelect) {
                onSelect(url); 
              }
            }}
          >
          <div>
            <div className={`flex rounded-full`}>
              {icon && <span className="flex-shrink-0">{React.cloneElement(icon as React.ReactElement, { size: 20 })}</span>}
              <span className={`overflow-hidden transition-all ${
                  expanded ? "w-34 ml-4 block" : "hidden"
                }`}
              >
                 {hasSubItems ? (
                  text
                ) : (
                  <Link to={url || "#"} className="w-full flex items-center">
                    {text}
                  </Link>
                )}
             
              </span>
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
          {!expanded && (
            <div
              className="absolute left-full rounded-md px-2 py-1 ml-6 bg-[#B1B1B1] text-white text-sm
                invisible opacity-0 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
            >
              {text}
          </div>
        )}
      </li>
    </>
  );
}


import { FiChevronRight, FiChevronLeft, FiChevronDown } from "react-icons/fi";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import React, { useContext, createContext, useState, ReactNode, useEffect } from "react";
import logo2 from "../../assets/IconHomePage/logo2.png";
import logoCuu from "../../assets/logoCuu.png";
import { Link } from "react-router-dom";

const SidebarContext = createContext<{ expanded: boolean }>({ expanded: true });

export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      setExpanded(!mobileView); 
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* mở Sidebar trên mobile */}
      {isMobile && !isMobileOpen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-[#cbe2c8] text-white rounded-md"
          onClick={() => setIsMobileOpen(true)}
        >
          <FaBarsStaggered size={24} />
        </button>
      )}

      {/* Overlay Side mobile */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-gray-500/70 z-40 md:hidden" onClick={() => setIsMobileOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#CBE2C8] text-black min-h-[100vh] z-50 transition-transform relative 
        ${isMobile ? (isMobileOpen ? "translate-x-0" : "-translate-x-full") : expanded ? "w-60" : "w-20"}`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center m-4 mt-0 gap-2">
          <img src={logo2} className="w-[49px] object-cover mt-4 flex-shrink-0" />
          <span className={`text-[#111111] transition-all mt-4 ${expanded ? "block" : "hidden"}`}>DL FARM</span>
        </Link>

        {/*  toggle sidebar  desktop */}
        {!isMobile && (
         <button
              onClick={() => setExpanded((prev) => !prev)}
              className={`absolute top-6 ${
                expanded ? "right-[6px] bg-transparent" : "right-[-26px] bg-[#CBE2C8]"
              }  p-2 rounded-r-lg self-end`}
            >
              {expanded ? <FaBarsStaggered size={20} /> : <FaXmark size={20} />}
            </button>
       
        )}

        {/*  đóng sidebar  mobile */}
        {isMobileOpen && (
          <button
            className="absolute top-4 left-14 p-2 text-black bg-[#CBE2C8] rounded-md"
            onClick={() => setIsMobileOpen(false)}
          >
            <FaXmark size={24} />
          </button>
        )}

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="px-3">{children}</ul>
        </SidebarContext.Provider>

        {/* Quảng cáo */}
        {!isMobile && (
          <div className="flex p-3 items-center">
            <div className="relative flex flex-col items-center p-6 bg-black rounded-2xl shadow-lg max-w-xs mx-auto">
              <div className="absolute -top-10 flex items-center justify-center w-20 h-20 rounded-full border-4 border-white bg-[#FFA500] shadow-md">
                <img src={logoCuu} alt="Sheep" className="w-16 h-16 rounded-full object-cover" />
              </div>
              <div className="mt-10 text-center text-white">
                <h3 className="font-bold text-lg">Đây là quảng cáo</h3>
                <p className="mt-2 text-sm opacity-80">Nạp vip để nông trại của bạn vip hơn và ủng hộ nhà sản xuất nha</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
