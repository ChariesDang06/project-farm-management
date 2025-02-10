import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { MdHomeWork } from "react-icons/md";

type Farm = {
  _id: string;
  name: string;
};
type FarmDropdownProps = {
  onSelect: (id: string) => void;
};
const FarmSelector: React.FC<FarmDropdownProps> = ({ onSelect }) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await fetch("https://agriculture-traceability.vercel.app/api/v1/farms");
        const data = await response.json();
        setFarms(data.farms);
      } catch (error) {
        console.error("Error fetching farms:", error);
      }
    };
    fetchFarms();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedFarm(id);
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[240px] z-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 p-2 border rounded-full bg-[#262626] text-white text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-2 w-full overflow-hidden">
          <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center shrink-0">
            <MdHomeWork className="text-[#278D45] w-5 h-5" />
          </div>
          <span className="truncate max-w-[240px]">
            {selectedFarm ? farms.find(farm => farm._id === selectedFarm)?.name : "Chọn một trang trại"}
          </span>
        </div>
        <FiChevronDown className="w-5 h-5 shrink-0" />
      </button>
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-[#262626] border rounded-[20px] p-1.5 text-white text-left">
          {farms.map((farm) => (
            <li
              key={farm._id}
              className="p-2 hover:border-b hover:border-white cursor-pointer truncate"
              onClick={() => handleSelect(farm._id)}
            >
              {farm.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FarmSelector;
