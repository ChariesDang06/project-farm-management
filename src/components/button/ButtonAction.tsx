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
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ icon, text, bgColor = "#76bc6a", textColor = "#ffffff", borderColor,onClick,truncate = true,hoverBorderColor  = "", disabled = false}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };
  return (
    <button 
      disabled={disabled}
      className={`flex items-center whitespace-nowrap gap-2 sm:px-4 sm:py-2 py-1.5 px-3 rounded-lg font-medium border  transition-colors duration-300
      ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      style={{ backgroundColor: bgColor, color: textColor ,borderColor: borderColor || bgColor, borderWidth: borderColor ? "2px" : "0"}}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = "#76bc6a";
          e.currentTarget.style.borderColor = hoverBorderColor;
          e.currentTarget.style.color = "#ffffff";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = bgColor;
          e.currentTarget.style.borderColor = borderColor || bgColor;
          e.currentTarget.style.color = textColor;
        }
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
