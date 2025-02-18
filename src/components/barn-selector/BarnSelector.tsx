import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { MdOutlinePets } from "react-icons/md"; 

type Barn = {
  _id: string;
  name: string;
};
type BarnSelectorProps = {
  onSelect: (id: string) => void;
};
const BarnSelector: React.FC<BarnSelectorProps> = ({ onSelect }) => {
  const [barns, setBarns] = useState<Barn[]>([]);
  const [selectedBarn, setSelectedBarn] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
      const fetchBarns = async () => {
        try {
          const response = await fetch("https://agriculture-traceability.vercel.app/api/v1/rooms");
          const data = await response.json();
          setBarns(data.rooms);
        } catch (error) {
          console.error("Error fetching:", error);
        }
      };
      fetchBarns();
    }, []);
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
          {selectedBarn ? barns.find(barn => barn._id === selectedBarn)?.name : "Chọn chuồng"}
        </div>
        <FiChevronDown className="w-5 h-5" />
      </button>
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-[#262626] border rounded-[16px] p-1.5 text-white text-left">
          {barns.map((barn) => (
            <li
              key={barn._id}
              className="p-2 hover:border-b hover:border-white cursor-pointer"
              onClick={() => handleSelect(barn._id)}
            >
              Chuồng {barn.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BarnSelector;
