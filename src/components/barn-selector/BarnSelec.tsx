import React ,{ useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { MdOutlinePets } from "react-icons/md"; 

type Barn = {
  id: string;
  name: string;
};
type BarnSelectorProps = {
  onSelect: (id: string) => void;
};
const BarnSelec: React.FC<BarnSelectorProps> = ({ onSelect }) => {
  const [barns] = useState<Barn[]>([
    { id: "barn1", name: "Chuồng Heo 01A1" },
    { id: "barn2", name: "Chuồng Heo 02B2" },
    { id: "barn3", name: "Chuồng Gà 03C3" },
  ]);
  const [selectedBarn, setSelectedBarn] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (id: string) => {
    setSelectedBarn(id);
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border rounded-full bg-[#262626] text-white text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="bg-yellow-500 rounded-full w-6 h-6  flex items-center justify-center shrink-0">
            <MdOutlinePets className="text-white w-3 h-3" />
          </div>
          {selectedBarn ? barns.find(barn => barn.id === selectedBarn)?.name : "Chọn chuồng"}
        </div>
        <FiChevronDown className="w-5 h-5" />
      </button>
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-[#262626] border rounded-[16px] p-1.5 text-white text-left">
          {barns.map((barn) => (
            <li
              key={barn.id}
              className="p-2 hover:border-b hover:border-white cursor-pointer"
              onClick={() => handleSelect(barn.id)}
            >
              {barn.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BarnSelec;
