import React from 'react';
import Button from '../button/Button';

interface AgricultureCardProps {
topic:string;
  title: string;
  description: string;
  img: string ;
  Icon?: React.ElementType; 
}

const AgricultureCard: React.FC<AgricultureCardProps> = ({ topic, title, description, img }) => {
  return (
    <div className="bg-white rounded-[30px] shadow-md p-4 w-full max-h-[526px] flex flex-col border border-[#404A3D1A]">
        <div className="flex justify-center mb-4">
            <img src={img} alt="icon" className="bg-[#EDDD5E] rounded-[30px] w-[100%] h-[100%] object-fit" />
        </div>
        <div className="flex items-center justify-start mb-2">
        <div className="w-[9px] h-[9px] bg-[#EDDD5E] rounded-full mr-2"></div>
            <p className="text-[#999999] uppercase text-[70%]">{topic}</p>
        </div>
        <h2 className="text-[#404A3D] text-xl  text-left">{title}</h2>
        <hr className="w-full border-t border-[#404A3D1A] my-2" />
        <p className="text-[#666666] text-opacity-80 text-left">
        {description}
        </p>
        <div className="self-end pt-2">
            <Button backgroundColor = "#EDDD5E" iconType="arrow"/>
        </div>
    </div>
  
  );
};

export default AgricultureCard;
