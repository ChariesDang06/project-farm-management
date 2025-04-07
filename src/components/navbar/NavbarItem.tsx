import React from "react";

interface NavbarItemProps {
  name: string;
  Icon: React.ElementType;
  textColor?: string; 
  iconColor?: string; 
  iconwh?:string;
  padding?: string; 
  activeColor?: string; 
  borderItem?: string; 
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  name,
  Icon,
  textColor = "text-white",
  iconColor = "text-[#EDDD5E]",
  iconwh="w-2 h-2",
  padding = "p-0",
  activeColor = "active:text-[#EDDD5E]",
  borderItem = "rounded-[#EDDD5E]",
}) => {
  return (
    <div
      className={`flex items-center gap-3 text-[14px] font-semibold cursor-pointer mb-2 sm:mb-0 w-full transition-all duration-300 
                 ${padding} ${activeColor} ${borderItem}`}
    >
      <Icon className={`${iconColor} ${iconwh} `} />
      <h2 className={`${textColor}`}>{name}</h2>
    </div>
  );
};

export default NavbarItem;

