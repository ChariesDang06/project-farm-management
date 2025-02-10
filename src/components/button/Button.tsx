import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";

interface ButtonProps {
  text?: string;
  backgroundColor?: string;
  iconType: "search" | "arrow";
}

const Button: React.FC<ButtonProps> = ({ text, backgroundColor = "#EDDD5E", iconType }) => {
  const width =
    text && iconType === "arrow" ? "183.34px" : "48px"; 
  const height = "48px"; 
  const borderRadius = !text ? "50%" : "30px"; 
  return (
    <button
      className=" cursor-pointer shrink-0 flex items-center justify-center gap-2 font-medium transition-all duration-300"
      style={{
        backgroundColor,
        color: "#404A3D",
        width,
        height,
        borderRadius,
      }}
    >
      {text && <span>{text}</span>}
      {iconType === "search" && <HiOutlineSearch className="w-5 h-5" />}
      {iconType === "arrow" && <HiOutlineArrowUpRight className="w-5 h-5" />}
    </button>
  );
};

export default Button;
