import React from 'react';
import Button from '../button/Button';

interface NaturalCardProps {
  title: string;
  description: string;
  img: string ;
}

const NaturalCard: React.FC<NaturalCardProps> = ({ title, description, img }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-[325px] min-h-[226px]   flex flex-col  border border-[#404A3D1A]"> 
      <div  className="flex  items-center mt-2 ">
        <div className="bg-[#EDDD5E] rounded-full w-16 h-16 flex items-center justify-center mr-2">
         <img src={img} alt="icon" className="w-10 h-10" />
        </div>
        <h2 className="text-[#404A3D] text-xl font-bold text-center">{title}</h2>
      </div>
      
      <hr className="w-full border-t border-[#404A3D1A] my-2" />
      <p className="text-[#404A3D] text-opacity-80  text-left">
        {description}
      </p>
      <div className="self-end py-2">
          <Button backgroundColor = "#404A3D1A" iconType="arrow"/>
      </div>
    </div>
  );
};

export default NaturalCard;
