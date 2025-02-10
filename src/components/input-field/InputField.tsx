import { useState } from "react";
import { FiEdit,FiTrash2  } from "react-icons/fi";

const RecoveryReport = () => {
  const [data, setData] = useState({
    total: 100000001,
    imported: 123123,
    born: 100000001,
    sick: 123123,
    recovered: 100000001,
    destroyed: 100000001,
    note: "Tốt đấy đồng chí hehe",
  });

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: field === "note" ? value : Number(value.replace(/\D/g, "")), 
    }));
  };

  const handleSave = () => {
    console.log("Dữ liệu đã lưu:", data);
  };

  return (
    <div className="p-4 bg-[#FFFFF1] rounded-[16px] w-full mx-auto">
      <h2 className="text-lg mb-4 text-left font-semibold">Số ca chữa khỏi, tái phát</h2>
      <div className="bg-[#FFFFF1] p-6 rounded-[16px] border border-[#A1A3AB] grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-3 md:col-span-1 text-left">
          <InputField label="Tổng số lượng" value={data.total} onChange={(val) => handleChange("total", val)} />
          <InputField label="Số lượng nhập" value={data.imported} onChange={(val) => handleChange("imported", val)} />
          <InputField label="Số lượng sinh sản" value={data.born} onChange={(val) => handleChange("born", val)} />
          <InputField label="Số lượng bệnh" value={data.sick} onChange={(val) => handleChange("sick", val)} />
          <InputField
            label="Số lượng phục hồi"
            value={data.recovered}
            onChange={(val) => handleChange("recovered", val)}
            textColor="#76BC6A" 
            borderColor="#76BC6A" 
            labelColor="#76BC6A" 
          />
          <InputField
            label="Số lượng tiêu hủy"
            value={data.destroyed}
            onChange={(val) => handleChange("destroyed", val)}
            textColor="#F44336" 
            borderColor="#F44336" 
            labelColor="#F44336" 
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-[#242731] text-sm font-medium mb-1 text-left">Nhận xét</label>
          <div className="relative">
            <textarea
              value={data.note}
              onChange={(e) => handleChange("note", e.target.value)}
              className="w-full border border-gray-300 rounded-[6px] p-2 text-[#242731] resize-none focus:outline-none focus:border-black h-[110px]"
              rows={4}
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <FiEdit className="text-[#FCBD2D] cursor-pointer hover:text-amber-500" size={18} />
              <FiTrash2 className="text-[#F14871] cursor-pointer hover:text-red-500" size={18} />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
            >
              Lưu Thay Đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  value,
  onChange,
  textColor = "#242731",
  borderColor = "#DFDFDF",
  labelColor = "#242731",
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
  textColor?: string;
  borderColor?: string;
  labelColor?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium" style={{ color: labelColor }}>
        {label}
      </label>
      <input
        type="text"
        value={value.toLocaleString()}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-[6px] p-2 focus:outline-none focus:ring-1 focus:ring-black"
        style={{ color: textColor, borderColor }}
      />
    </div>
  );
};

export default RecoveryReport;
