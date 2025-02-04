import Banner from "../../components/banner/Banner";
import Login from "../login/Login";
import { RiLeafLine } from "react-icons/ri";
import LoginArt from "../../assets/LoginArt.png";
import NaturalCard from "../../components/natural-card/NaturalCard";
import BackgroundHome from "../../assets/BackgroundHome.png"; 
import IconHome1 from "../../assets/IconHome1.png";
import IconHome2 from "../../assets/IconHome2.png";
import IconHome3 from "../../assets/IconHome3.png";
import IconHome4 from "../../assets/IconHome4.png";
import IconSS1 from "../../assets/IconSS1.png";
import IconSS2 from "../../assets/IconSS2.png";
import CNC1 from "../../assets/service-img-01.jpg.png";
import CNC2 from "../../assets/service-img-02.jpg.png";
import CNC3 from "../../assets/service-img-03.jpg.png";
import SectionCNC from "../../assets/SectionCNC.png";
import Meat from "../../assets/meat.png";
import MeatCard from "../../components/natural-card/MeatCard";
import IconMeat1 from "../../assets/IconMeat.png";
import IconMeat2 from "../../assets/IconMeat2.png";
import IconMeat3 from "../../assets/IconMeat3.png";
import IconMeat4 from "../../assets/IconMeat4.png";
import Sec1 from "../../assets/sec1.png";
import Sec2 from "../../assets/sec2.png";
import Sec3 from "../../assets/sec3.png";
import Sec4 from "../../assets/sec4.png";
import nam1987 from "../../assets/1987.png";
import nam1995 from "../../assets/1995.png";
import nam2003 from "../../assets/2003.png";
import nam2010 from "../../assets/2010.png";
import mt100 from "../../assets/mt100.png";
import SectionMT from "../../assets/SectionMT.png";
import logo1 from "../../assets/5.png";
import logo2 from "../../assets/6.png";
import logo3 from "../../assets/7.png";
import logo4 from "../../assets/8.png";
import logo5 from "../../assets/9.png";
import logo6 from "../../assets/10.png";
import Section9 from "../../assets/Section9.png";
import AgricultureCard from "../../components/natural-card/AgricultureCard";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import ButtonNext from "../../components/button/ButtonNext";
const cardData = [
  {
    title: "Đội ngũ chuyên nghiệp",
    description: "Người chăn nuôi giàu kinh nghiệm tận tâm",
    img: IconHome1,
  },
  {
    title: "Sản phẩm sạch",
    description: "Sản phẩm từ dê, cừu được kiểm định chặt chẽ, đảm bảo an toàn.",
    img: IconHome2,
  },
  {
    title: "Nông trại công nghệ cao",
    description: "Áp dụng công nghệ hiện đại vào chăn nuôi, tối ưu hóa quy trình chăm sóc và sản xuất.",
    img: IconHome3,
  },
  {
    title: "Kết hợp tự nhiên",
    description: "Nuôi dưỡng tự nhiên, chăn thả kết hợp tạo nên những chú cưu vui vẻ :))",
    img: IconHome4,
  },
];

const cardAgricultureCardData = [
  {
    topic:"Dịch vụ hàng đầu",
    title: "Chăn Nuôi Bền Vững",
    description: "Áp dụng phương pháp chăn nuôi thân thiện với môi trường, đảm bảo sức khỏe ",
    img: CNC1,
  },
  {
    topic:"Chuỗi cung ứng",
    title: "Cung Ứng Toàn Diện",
    description: "Đáp ứng mọi nhu cầu các sản phẩm nông nghiệp chất lượng cao.",
    img: CNC2,
  },
  {topic:"Tiên tiến",
    title: "Công nghệ cao",
    description: "Áp dụng công nghệ hiện đại vào chăn nuôi, tối ưu hóa quy trình chăm sóc và sản xuất.",
    img: CNC3,
  },
];
const MeatCardData = [
  {
    title: "Giá cả phải trăng" ,
    description: "Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.",
    img: IconMeat1,
  },
  {
    title: "Được ăn thức ăn sạch",
    description: "Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.",
    img: IconMeat2,
  },
  {
    title: "Nông trại sạch",
    description: "Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.",
    img: IconMeat3,
  },
  {
    title: "Được kiểm định",
    description:"Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.",
    img: IconMeat4,
  },
];
const positionClasses = [
  "top-0 left-16", // Trên trái
  "top-1/4 right-[-12%]", // Trên phải
  "bottom-1/6 left-32", // Dưới trái
  "bottom-[-10%] right-[-8%]", // Dưới phải
];
const images = [Sec1, Sec2, Sec3, Sec4];
const timelineData = [
  {
    year: nam1987,
    title: "Mở cửa nông trại",
    description: "Năm 1980, gia đình tôi lập trang trại dê cừu ở Ninh Thuận, nuôi vài con dê tự cung cấp thực phẩm.",
  },
  {
    year: nam1995,
    title: "Mở rộng",
    description: "Nhờ học hỏi kỹ thuật mới, chúng tôi mở rộng trang trại, cung cấp dê cừu cho các khu vực lân cận.",
  },
  {
    year: nam2003,
    title: "Nhận giải thưởng",
    description: "Trang trại được công nhận là mô hình chăn nuôi kiểu mẫu, đạt giải cấp tỉnh.",
  },
  {
    year: nam2010,
    title: "Đạt thành tựu lớn",
    description: "Trang trại trở thành nơi dẫn đầu về chăn nuôi dê cừu, đóng góp lớn cho ngành nông nghiệp.",
  },
];
const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo1, logo2, logo3, logo4,logo5, logo6,];
const HomePage = () => {
  return (
    <>
      <Banner/>
      <div className="flex w-full h-screen my-4">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Login />
        </div>

        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img 
            src={LoginArt} 
            alt="Login Art" 
            className="rounded-[2.5%] w-[80%] h-[94%] object-cover" 
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {cardData.map((card, index) => (
            <div key={index} className={`${index !== cardData.length - 1 ? 'md:mr-4' : ''} mb-2`}> 
              <NaturalCard
                title={card.title}
                description={card.description}
                img={card.img}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-[76%] mx-auto h-screen my-[5%]">
        <div className="hidden md:flex w-1/2 items-center justify-center mr-10">
          <img 
            src={BackgroundHome} 
            className="rounded-[2.5%] w-[100%] h-auto object-fit" 
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center">
            <div className="w-[100%] flex flex-col text-left">
              <button className="bg-white w-[130px] h-[3.5%] py-1 px-2 rounded-full flex items-center justify-center mb-[3%]">
                <RiLeafLine  className="text-black"  />
                <p className="text-black text-[1rem] ml-2 flex items-center justify-center">Chúng Tôi</p>
              </button>
                <h2 className="text-[280%]  leading-[120%] text-[#404A3D]">
                Với sứ mệnh "Sạch từ tâm - Lành từ đất"
                </h2>
                <p className="leading-[150%] text-[#666666] mb-[3%]">
                Nông trại của chúng tôi khởi nguồn từ tình yêu thiên nhiên, cam kết cung cấp thực phẩm sạch và an toàn. Với quy trình hữu cơ và thân thiện môi trường, chúng tôi mang đến sản phẩm chất lượng cao cho mọi gia đình.
                </p>
                <div className="flex space-x-4">
                  <div className="">
                    <img src={IconSS1} className="w-[36%] h-auto object-fit mb-4 " />
                    <h2 className="leading-[120%] text-[#404A3D]">Eco Farms Worldwide</h2>
                    <p  className="leading-[150%] text-[#666666]">
                      Đối tác toàn cầu về phát triển nông trại bền vững, cùng chia sẻ giá trị xanh cho tương lai.
                    </p>
                  </div>

                  <div className="">
                    <img src={IconSS2} className="w-[36%] h-auto object-fit " />
                    <h2 className="leading-[120%] text-[#404A3D]">Trang Thiết Bị Đặc Biệt</h2>
                    <p  className=" leading-[150%] text-[#666666]">
                      Sử dụng thiết bị chăn nuôi tiên tiến, đảm bảo quy trình sản xuất hiệu quả và thân thiện với môi trường.
                    </p>
                  </div>
                </div>
              </div>
            </div>
      </div>
      
      
        <div className="flex justify-center items-center w-full h-full py-[5%] bg-cover bg-center"
              style={{
                backgroundImage: `url(${SectionCNC})`
              }}
            >
            <div  className="w-full max-w-[76%] mx-auto">
                <button className="bg-white w-[210px] h-[3.5%] py-1 px-2 rounded-full flex items-center justify-center mb-[1%]">
                  <RiLeafLine  className="text-black"  />
                  <p className="text-black text-[1rem] ml-2 flex items-center justify-center">Dịch Vụ Của Chúng Tôi</p>
                </button>
                <div className="flex items-center justify-between mb-[5%]">
                <h3 className=" flex items-center justify-left text-[280%]  leading-[120%] text-white">
                  Nông nghiệp bền vững
                </h3>
                <ButtonNext borderColor="#FFFFFF" iconColor="#FFFFFF" iconType="both" />
              </div>
                <div className="grid grid-cols-3 md:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 gap-4">
                  {cardAgricultureCardData.map((card, index) => (
                    <AgricultureCard
                      key={index}
                      topic={card.topic}
                      title={card.title}
                      description={card.description}
                      img={card.img}
                    />
                  ))}
                </div>
          </div>
      </div>
    
      <div className="flex items-center justify-center flex-col text-center h-full mt-10">
        <button className="bg-white w-[170px] h-[3.5%] py-1 px-2 rounded-full flex items-center justify-center mb-[1%]">
              <RiLeafLine className="text-black" />
              <p className="text-black text-[1rem] ml-2">Chất Lượng Cao</p>
        </button>
        <h3 className="text-[280%]  leading-[120%] text-[#404A3D] mb-[5%]">
              Chất lượng trong <br></br>từng khâu chăn nuôi
        </h3>
        <div className="relative flex items-center justify-center w-full h-auto mb-20">
          <img src={Meat} className="w-[44%] h-auto" />
            {MeatCardData.map((card, index) => (
              <div key={index} className={`absolute ${positionClasses[index]}`}>
                <MeatCard title={card.title} description={card.description} img={card.img} />
              </div>
            ))}
        </div>
      </div>


      <div className="flex items-center justify-center mx-4 gap-4">
        {images.map((src, index) => (
          <img key={index} src={src} className="w-[24%] h-auto" />
        ))}
      </div>
      
      <div className="flex max-w-[76%] my-[8%]  mx-auto">
          <div className="w-full h-full">
            <button className="bg-white w-[140px] h-[3.9%] py-1 px-2 rounded-full flex items-center justify-center mb-[3%]">
              <RiLeafLine className="text-black" />
              <p className="text-black text-[1rem] ml-2">Our History</p>
            </button>
            <div className="flex items-center justify-between gap-10">
              <h3 className="text-[280%] leading-[120%] text-[#404A3D] text-left w-1/2">
                Nông trại đã được phát triển từ những năm 80
              </h3>
              <p className="text-[#666666] text-left text-opacity-80 w-1/2">
                Nằm giữa vùng cao nguyên xanh mát, nơi đàn dê và cừu được chăn thả tự nhiên trên những đồng cỏ rộng lớn.
                Ban đầu, tôi chỉ nuôi vài con để lấy sữa và lông, nhưng dần dần, nhờ học hỏi và cải tiến, nông trại đã phát triển thành một mô hình khép kín.
              </p>
            </div>
          </div>
        </div>
      <div className="w-full max-w-[76%] mx-auto">
        <div className="grid grid-cols-4 relative">
          <div className="absolute top-[20px] left-0 w-full h-[2px] bg-[#D3D4CC]"></div>
          {timelineData.map((item, index) => (
            <div key={index} className="flex flex-col items-start text-left px-4 relative">
              <div className="w-2 h-2 bg-[#5B8C51] rounded-full absolute top-[17px] left-0"></div>
              <img src={item.year} className="w-[56%] h-auto mt-[-2.8rem]" />
              <h3 className="text-[#404A3D] text-xl font-bold mt-10">{item.title}</h3>
              <p className="text-[#666666] text-opacity-80 mt-1">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex relative my-[10%]">
            <div className="hidden md:flex w-1/2 items-center relative">
              <img 
                src={SectionMT} 
                className="rounded-[2.5%] w-[100%] h-[100%]" 
              />
            </div>
            <div className="w-full md:w-1/2 flex items-center bg-[#EDDD5E] rounded-[30px] p-8 relative -ml-8">
              <div className="w-[89%] flex flex-col text-left">
                <button className="bg-white w-[140px] h-[3.5%] py-1 px-2 rounded-full flex items-center justify-center mb-[3%]">
                  <RiLeafLine className="text-black" />
                  <p className="text-black text-[1rem] ml-2 flex items-center justify-center">What We Do</p>
                </button>
                <h2 className="text-[280%] leading-[120%] text-[#404A3D]">
                  Hành trình từ nông trại đến chất lượng
                </h2>
                <p className="leading-[150%] text-[#404A3D] mb-[3%]">
                  Chúng tôi chuyên chăn nuôi dê cừu tại Ninh Thuận, cung cấp thịt, sữa và các sản phẩm chất lượng cao.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <img src={mt100} className="w-[50%] h-auto object-cover m-0" />
                    <h3 className="text-xl font-medium text-[#404A3D]">Sản phẩm sạch</h3>
                  </div>
                  <div className="flex items-center">
                    <img src={mt100} className="w-[50%] h-auto object-cover m-0" />
                    <h3 className="text-xl font-medium text-[#404A3D]">Phát triển bền vững</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="max-w-6xl mx-auto">
              <button className="bg-white w-[140px] h-[3.5%] py-1 px-2 rounded-full flex items-center justify-center mb-[1%] mt-[2%]">
                <RiLeafLine className="text-black" />
                <p className="text-black text-[1rem] ml-2 flex items-center justify-center">
                  Đáng tin cậy
                </p>
              </button>
              <div className="flex items-center justify-between mb-[5%]">
                <h3 className="text-[280%] leading-[120%] text-[#404A3D] ">
                  Kết nối hơn 100+ doanh nghiệp
                </h3>
                <ButtonNext borderColor="#404A3D" iconColor="#404A3D" iconType="both" />
              </div>

              <div className="grid gap-6">
                <div className="grid grid-cols-6 gap-7 justify-center">
                  {logos.slice(0, 6).map((logo, index) => (
                    <div key={index} className="flex justify-center">
                      <img
                        src={logo}
                        alt={`Logo ${index + 1}`}
                        className="w-[100px] h-[90px] object-contain"
                      />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-7 justify-center" style={{ marginLeft: "8%" }}>
                  {logos.slice(6, 12).map((logo, index) => (
                    <div key={index} className="flex justify-center">
                      <img
                        src={logo}
                        alt={`Logo ${index + 7}`}
                        className="w-[100px] h-[90px] object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-cover bg-center rounded-tl-2xl rounded-tr-2xl p-12 text-white  my-[6%]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(64, 74, 61, 0.6), rgba(64, 74, 61, 0.3)), url(${Section9})`,
              backgroundPosition: 'center top',
            }}
          >
            <div  className="flex  items-center  justify-between ">
                  <div  className="flex  items-center mt-2 ">
                    <div className="bg-[#EDDD5E] rounded-full w-16 h-16 flex items-center justify-center shrink-0 mr-2">
                      <img src={IconHome2} alt="icon" className="w-10 h-10" />
                    </div>
                    <h2 className="text-white text-xl font-bold text-center">Dẫn đầu trong thị trường nông nghiệp toàn quốc</h2>
                  </div>
                  <div className=" top-4 right-4">
                    <Button text="Tìm Hiểu Thêm" backgroundColor = "#FFFFFF" iconType="arrow" />
                  </div>
            </div>
          </div>          
          {/*  */}
        </div>
      <Footer/>
    </>
  );
};

export default HomePage;