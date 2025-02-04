import React from "react";
import HeroImg from "../../assets/banner.png";
import Navbar from "../navbar/Navbar";
import Button from "../button/Button";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[120vh] bg-cover bg-center rounded-[4%]"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HeroImg})`
      }}
    >
      <Navbar />
      <div className="flex items-center text-left h-full px-[6%] mt-[-6%]">
        <div className="w-[66%] flex justify-center flex-col text-left">
          <button className="w-[16%] h-[3.5%] py-1 px-2 border border-white rounded-full text-white flex items-center justify-center mb-[3%] overflow-hidden">
            <p className="text-white text-[1.2vw] whitespace-nowrap max-w-full truncate">DL FARM</p>
          </button>

            <h1 className="text-[5vw] leading-[120%] text-white">
              Tự Nhiên Nuôi Dưỡng<br></br> Cuộc Sống
            </h1>
            <hr className="w-full border-t-1 border-white my-[2%]" />
            <p className="text-[1.5vw] leading-[150%] text-white mb-[3%]">
              Chúng tôi cung cấp vật nuôi khỏe mạnh, rau sạch, an toàn từ nông trại đến bàn ăn.
            </p>
            <Button text="Liên Hệ Ngay" backgroundColor="#FFFFFF" iconType="arrow" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
