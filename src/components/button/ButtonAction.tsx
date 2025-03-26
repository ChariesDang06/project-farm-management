import React from "react";

type ButtonProps = {
  icon?: React.ReactNode;
  text: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ icon, text, bgColor = "#76bc6a", textColor = "#ffffff", borderColor,onClick }) => {
  return (
    <button 
      className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium border  cursor-pointer transition-colors duration-300"
      style={{ backgroundColor: bgColor, color: textColor ,borderColor: borderColor || bgColor, borderWidth: borderColor ? "2px" : "0"}} onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#76bc6a";
        e.currentTarget.style.color = "#ffffff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = bgColor;
        e.currentTarget.style.color = textColor;
      }}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
