import React from "react";

interface QuantitySelectorProps {
  from: string;
  to: string;
  setFrom: (month: string) => void;
  setTo: (month: string) => void;
  quantity: number;
  onDateChange: (from: string, to: string) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  from,
  to,
  setFrom,
  setTo,
  quantity,
  onDateChange,
}) => {
  return (
    <div className="">
      <div className="flex space-x-4 mt-16">
        <div className="flex flex-col flex-1">
          <label className="font-medium mb-1 text-left">From:</label>
          <select
            className="p-2 border rounded-full"
            value={from}
            onChange={(e) => {
              const newFrom = e.target.value;
              setFrom(newFrom);
              onDateChange(newFrom, to);
            }}
          >
            <option value="Tháng 1">Tháng 1</option>
            <option value="Tháng 2">Tháng 2</option>
            <option value="Tháng 3">Tháng 3</option>
          </select>
        </div>

        <div className="flex flex-col flex-1">
          <label className="font-medium mb-1 text-left">To:</label>
          <select
            className="p-2 border rounded-full"
            value={to}
            onChange={(e) => {
              const newTo = e.target.value;
              setTo(newTo);
              onDateChange(from, newTo);
            }}
          >
            <option value="Tháng 3">Tháng 3</option>
            <option value="Tháng 4">Tháng 4</option>
            <option value="Tháng 5">Tháng 5</option>
          </select>
        </div>
      </div>
      <p className="text-lg font-bold text-center mt-6">Số lượng</p>
      <p className="text-xl font-bold text-center mt-4">{quantity}</p>
    </div>
  );
};


export default QuantitySelector;
