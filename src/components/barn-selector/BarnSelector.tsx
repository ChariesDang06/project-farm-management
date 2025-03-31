import { useState,useEffect,useRef  } from "react";
import { FiChevronDown } from "react-icons/fi";

export type Barn = {
  _id: string;
  name: string;
};

type BarnSelectorProps = {
  onSelect: (id: string) => void;
  barns: Barn[];
  icon?: React.ReactNode;
  iconColor?: string; 
  iconBgColor?: string; 
  rounded?: boolean;
  widthFull?: string; 
  placeholder?: string; 
};

const BarnSelector: React.FC<BarnSelectorProps> = ({
  onSelect,
  barns,
  icon,
  iconColor = "text-white", 
  iconBgColor = "bg-yellow-500",
  rounded = false,
  widthFull = "w-full",
  placeholder = "Chọn chuồng", 
}) => {
  const [selectedBarn, setSelectedBarn] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleSelect = (id: string) => {
    setSelectedBarn(id);
    onSelect(id);
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={`${widthFull} relative`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-12 p-2 border bg-[#262626] text-white text-left flex items-center justify-between ${
          rounded ? "rounded-full" : "rounded-[12px]"
        } w-full`}
      >
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${iconBgColor} ${iconColor} rounded-full`}>
            {icon}
          </div>
          <div className="text-base md:text-sm max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap">
            {selectedBarn ? barns.find((barn) => barn._id === selectedBarn)?.name : placeholder}
          </div>
        </div>
        <FiChevronDown className="w-5 h-5" />
      </button>
      {isOpen && (
       <ul className="absolute mt-1 z-40 bg-[#262626] border rounded-[16px] p-1.5 text-white text-left w-full">

          {barns.map((barn) => (
            <li
              key={barn._id}
                className="p-2 hover:border-b hover:border-white cursor-pointer"
              onClick={() => handleSelect(barn._id)}
            >
              {barn.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BarnSelector;
