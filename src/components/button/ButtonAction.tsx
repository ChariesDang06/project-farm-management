import React from "react";

type ButtonProps = {
  icon?: React.ReactNode;
  text: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBorderColor ?: string; 
  onClick?: () => void;
  truncate?: boolean; 
};

const Button: React.FC<ButtonProps> = ({ icon, text, bgColor = "#76bc6a", textColor = "#ffffff", borderColor,onClick,truncate = true,hoverBorderColor  = "", }) => {
  return (
    <button 
      className="flex items-center whitespace-nowrap gap-2 sm:px-4 sm:py-2 py-1.5 px-3 rounded-lg font-medium border  cursor-pointer transition-colors duration-300"
      style={{ backgroundColor: bgColor, color: textColor ,borderColor: borderColor || bgColor, borderWidth: borderColor ? "2px" : "0"}} onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#76bc6a";
        e.currentTarget.style.borderColor = hoverBorderColor; 
        e.currentTarget.style.color = "#ffffff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = bgColor;
        e.currentTarget.style.borderColor = borderColor || bgColor;
        e.currentTarget.style.color = textColor;
      }}
    >
      {icon}
      <span className={`${truncate ? "max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap" : "break-words"}`}>
        {text}
      </span>
    </button>
  );
};

export default Button;
