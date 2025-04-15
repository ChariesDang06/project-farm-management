
import Banner from "../../components/banner/Banner";
import Login from "../login/Login";
import { RiLeafLine } from "react-icons/ri";
import LoginArt from "../../assets/IconHomePage/LoginArt.png";
import NaturalCard from "../../components/card/NaturalCard";
import BackgroundHome from "../../assets/IconHomePage/BackgroundHome.png"; 
import IconHome1 from "../../assets/IconHomePage/IconHome1.png";
import IconHome2 from "../../assets/IconHomePage/IconHome2.png";
import IconHome3 from "../../assets/IconHomePage/IconHome3.png";
import IconHome4 from "../../assets/IconHomePage/IconHome4.png";
import IconSS1 from "../../assets/IconHomePage/IconSS1.png";
import IconSS2 from "../../assets/IconHomePage/IconSS2.png";
import CNC1 from "../../assets/IconHomePage/service-img-01.jpg.png";
import CNC2 from "../../assets/IconHomePage/service-img-02.jpg.png";
import CNC3 from "../../assets/IconHomePage/service-img-03.jpg.png";
import SectionCNC from "../../assets/IconHomePage/SectionCNC.png";
import Meat from "../../assets/IconHomePage/meat.png";
import MeatCard from "../../components/card/MeatCard";
import IconMeat1 from "../../assets/IconHomePage/IconMeat.png";
import IconMeat2 from "../../assets/IconHomePage/IconMeat2.png";
import IconMeat3 from "../../assets/IconHomePage/IconMeat3.png";
import IconMeat4 from "../../assets/IconHomePage/IconMeat4.png";
import Sec1 from "../../assets/IconHomePage/sec1.png";
import Sec2 from "../../assets/IconHomePage/sec2.png";
import Sec3 from "../../assets/IconHomePage/sec3.png";
import Sec4 from "../../assets/IconHomePage/sec4.png";
import nam1987 from "../../assets/IconHomePage/1987.png";
import nam1995 from "../../assets/IconHomePage/1995.png";
import nam2003 from "../../assets/IconHomePage/2003.png";
import nam2010 from "../../assets/IconHomePage/2010.png";
import mt100 from "../../assets/IconHomePage/mt100.png";
import SectionMT from "../../assets/IconHomePage/SectionMT.png";
import logo1 from "../../assets/IconHomePage/5.png";
import logo2 from "../../assets/IconHomePage/6.png";
import logo3 from "../../assets/IconHomePage/7.png";
import logo4 from "../../assets/IconHomePage/8.png";
import logo5 from "../../assets/IconHomePage/9.png";
import logo6 from "../../assets/IconHomePage/10.png";
import Section9 from "../../assets/IconHomePage/Section9.png";
import AgricultureCard from "../../components/card/AgricultureCard";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import ButtonNext from "../../components/button/ButtonNext";
const cardData = [
  {
    title: "Đội ngũ chuyên nghiệp",
    description: "Người chăn nuôi giàu kinh nghiệm, tận tâm, không ngừng học hỏi và phát triển.",
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
  {
    topic: "Sáng tạo",
    title: "Phát Triển Giống Mới",
    description: "Nghiên cứu và lai tạo giống nông sản năng suất cao, chống chịu tốt.",
    img: CNC3,
  },
  {
    topic: "Bền vững",
    title: "Bảo Vệ Môi Trường",
    description: "Sử dụng phương pháp canh tác hữu cơ, bảo vệ hệ sinh thái tự nhiên.",
    img: CNC2,
  },
  {
    topic: "Chất lượng",
    title: "Sản Phẩm An Toàn",
    description: "Đảm bảo chất lượng thực phẩm sạch, an toàn và đạt chuẩn quốc tế.",
    img: CNC1,
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
// 
// 
// 
const HomePage = () => {
  const nextPage = () => {
  };
  const prevPage = () => {
  };
  return (
    <>
      <Banner/>
      <div  id="targetSection"  className="flex w-full my-12">
        <div className="w-full md:w-1/2 flex items-center justify-center px-4">
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
      <div className="flex w-full px-5 md:max-w-[76%] mx-auto w-full my-12">

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
                <h2 className="text-3xl lg:text-4xl xl:text-5xl text-[#404A3D]">
                Với sứ mệnh "Sạch từ tâm - Lành từ đất"
                </h2>
                <p className="text-[#666666] mb-[3%]">
                Nông trại của chúng tôi khởi nguồn từ tình yêu thiên nhiên, cam kết cung cấp thực phẩm sạch và an toàn. Với quy trình hữu cơ và thân thiện môi trường, chúng tôi mang đến sản phẩm chất lượng cao cho mọi gia đình.
                </p>
                <div className="flex space-x-4">
                  <div className="">
                    <img src={IconSS1} className="w-[36%] h-auto object-fit mb-4 " />
                    <h2 className="text-[#404A3D]">Eco Farms Worldwide</h2>
                    <p  className="text-[#666666]">
                      Đối tác toàn cầu về phát triển nông trại bền vững, cùng chia sẻ giá trị xanh cho tương lai.
                    </p>
                  </div>

                  <div className="">
                    <img src={IconSS2} className="w-[36%] h-auto object-fit " />
                    <h2 className=" text-[#404A3D]">Trang Thiết Bị Đặc Biệt</h2>
                    <p  className="  text-[#666666]">
                      Sử dụng thiết bị chăn nuôi tiên tiến, đảm bảo quy trình sản xuất hiệu quả và thân thiện với môi trường.
                    </p>
                  </div>
                </div>
              </div>
            </div>
      </div>
      
      
        <div className="flex justify-center items-center w-full h-full py-12 md:py-24 bg-cover bg-center"
              style={{
                backgroundImage: `url(${SectionCNC})`
              }}
            ><div className=" w-full px-5 md:max-w-[79%] mx-auto">
                <button className="bg-white w-[210px] h-[3.5%] py-1 px-2 rounded-full flex items-center justify-center my-4">
                  <RiLeafLine  className="text-black"  />
                  <p className="text-black text-[1rem] ml-2 flex items-center justify-center">Dịch Vụ Của Chúng Tôi</p>
                </button>
                <div className="flex items-center justify-between my-5 gap-4">
                  <h3 className="text-left text-3xl lg:text-4xl xl:text-5xl  text-white">
                    Nông nghiệp bền vững
                  </h3>
                  <div className="hidden items-center justify-between gap-2 md:flex lg:flex">
                    <ButtonNext onClick={prevPage} borderColor="#FFFFFF" iconColor="#FFFFFF" iconType="back" />
                    <ButtonNext onClick={nextPage} borderColor="#FFFFFF" iconColor="#FFFFFF" iconType="next" />
                  </div>
                </div>
                <div className="flex overflow-x-auto overflow-y-hidden gap-x-4 transition-all duration-500">
                  {cardAgricultureCardData.map((card, index) => (
                    <div key={index} className="shrink-0 min-w-[33.33%] md:min-w-[330px]">
                      <AgricultureCard
                        topic={card.topic}
                        title={card.title}
                        description={card.description}
                        img={card.img}
                      />
                    </div>
                  ))}
                </div>


                  
          </div>
      </div>
    
      <div className="flex items-center justify-center flex-col text-center mt-12 md:mt-24">
        <button className="bg-white w-[170px] h-[3.5%] py-2 px-2 rounded-full flex items-center justify-center mb-[1%]">
              <RiLeafLine className="text-black" />
              <p className="text-black text-[1rem] ml-2">Chất Lượng Cao</p>
        </button>
        <h3 className="text-3xl lg:text-4xl xl:text-5xl  text-[#404A3D] mb-[5%]">
              Chất lượng trong <br></br>từng khâu chăn nuôi
        </h3>
        <div className="relative hidden lg:flex items-center justify-center w-full h-auto mb-20">
          <img src={Meat} className="w-[44%] h-auto" />
            {MeatCardData.map((card, index) => (
              <div key={index} className={`absolute ${positionClasses[index]}`}>
                <MeatCard title={card.title} description={card.description} img={card.img} />
              </div>
            ))}
        </div>
        <div className="mb-5 block lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {MeatCardData.map((card, index) => (
              <div key={index}>
                <MeatCard title={card.title} description={card.description} img={card.img} width="w-full"/>
              </div>
            ))}
        </div>
        
      </div>

      <div className="flex items-center justify-center mx-4 gap-x-4 md:mt-12 md:mb-24 ">
        {images.map((src, index) => (
          <img key={index} src={src} className="w-[24%] h-auto" />
        ))}
      </div>
      <div className="flex w-full px-5 my-12 md:max-w-[76%] mx-auto">
          <div className="w-full h-full">
            <button className="bg-white w-[140px] h-[3.9%] py-1 px-2 rounded-full flex items-center justify-center mb-[3%]">
              <RiLeafLine className="text-black" />
              <p className="text-black text-[1rem] ml-2">Our History</p>
            </button>
            <div className="flex flex-col md:flex-row justify-between gap-x-4 gap-y-6">
              <h3 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl  text-[#404A3D] text-left w-full md:w-1/2">
                Nông trại đã được phát triển từ những năm 80
              </h3>
              <p className="text-[#666666] text-left md:text-lg text-base  w-full md:w-1/2">
                Nằm giữa vùng cao nguyên xanh mát, nơi đàn dê và cừu được chăn thả tự nhiên trên những đồng cỏ rộng lớn.
                Ban đầu, tôi chỉ nuôi vài con để lấy sữa và lông, nhưng dần dần, nhờ học hỏi và cải tiến, nông trại đã phát triển thành một mô hình khép kín.
              </p>
            </div>
          </div>
        </div>
        <div className=" w-full px-5 md:max-w-[76%] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 relative">
            <div className="hidden xl:block absolute top-16 left-0 w-full h-[2px] bg-[#D3D4CC]"></div>
            <div className="absolute top-5 left-[3px] w-[2px] h-full bg-[#D3D4CC] xl:hidden"></div>

            {timelineData.map((item, index) => (
              <div key={index} className="flex flex-col items-start text-left px-4 relative">
                <img 
                  src={item.year} 
                  className="w-full max-w-[80px] xl:max-w-[56%] h-auto mt-[0.8rem] sx:mt-[-2.8rem]"
                />
                <div className="w-2 h-2 bg-[#5B8C51] rounded-full absolute top-12 md:top-15 left-0 xl:left-auto"></div>
                <h3 className="text-[#404A3D] text-xl font-bold mt-4 md:mt-6">{item.title}</h3>
                <p className="text-[#666666] text-opacity-80 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        <div className="flex relative my-12 md:my-24">
            <div className="hidden xl:flex w-1/2 items-center relative">
              <img 
                src={SectionMT} 
                className="rounded-[2.5%] w-[100%] h-[100%]" 
              />
            </div> 
            
            <div className="w-full xl:w-1/2 flex items-center  bg-[#EDDD5E] rounded-[30px] relative xl:absolute xl:left-[50%] xl:translate-x-[-20%] h-full ">
              <div className="w-full flex flex-col text-left  px-8 py-10 ">
                <button className="bg-white w-[140px] h-[3.5%] py-1 px-2 rounded-full flex items-center justify-center mb-[3%]">
                  <RiLeafLine className="text-black" />
                  <p className="text-black text-sm md:text-base ml-2 flex items-center justify-center">What We Do</p>
                </button>
                <h2 className="text-xl md:text-3xl lg:text-4xl leading-tight text-[#404A3D]">
                  Hành trình từ nông trại đến chất lượng
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-[#404A3D] mb-4">
                  Chúng tôi chuyên chăn nuôi dê cừu tại Ninh Thuận, cung cấp thịt, sữa và các sản phẩm chất lượng cao.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <img src={mt100} className="w-[66px] md:w-[40%] h-auto object-cover" />
                    <h3 className="text-sm md:text-lg font-medium text-[#404A3D]">Sản phẩm sạch</h3>
                  </div>
                  <div className="flex items-center">
                  <img src={mt100} className="w-[66px] md:w-[40%] h-auto object-cover" />
                  <h3 className="text-sm md:text-lg font-medium text-[#404A3D] ">Phát triển bền vững</h3>
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
              <div className="flex items-center justify-between my-5 gap-4">
                <h3 className="text-3xl lg:text-4xl xl:text-5xl text-left  text-[#404A3D] ">
                  Kết nối hơn 100+ doanh nghiệp
                </h3>
                <div className="hidden items-center justify-between gap-2 md:flex lg:flex"> 
                  <ButtonNext  borderColor="#404A3D" iconColor="#404A3D" iconType="both" />
                </div>
              </div>

              <div className="grid gap-x-6 overflow-x-auto lg:overflow-visible">
                <div className="grid grid-cols-6 gap-7 transition-all duration-500 min-w-max">
                  {logos.slice(0, 6).map((logo, index) => (
                    <div key={index} className="flex justify-center">
                      <img src={logo} alt={`Logo ${index + 1}`} className="w-[100px] h-[90px] object-contain" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-x-6 overflow-x-auto lg:overflow-visible mt-6">
                <div className="grid grid-cols-6 gap-7 transition-all duration-500 min-w-max" style={{ marginLeft: "87px" }}>
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

          <div className="relative bg-cover bg-center rounded-tl-2xl rounded-tr-2xl p-12 text-white  my-12"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(64, 74, 61, 0.6), rgba(64, 74, 61, 0.3)), url(${Section9})`,
              backgroundPosition: 'center top',
            }}
          >
            <div  className="flex flex-col md:flex-row items-center justify-between ">
                  <div  className="flex  items-center mt-2 ">
                    <div className="bg-[#EDDD5E] rounded-full w-16 h-16 flex items-center justify-center shrink-0 mr-2">
                      <img src={IconHome2} alt="icon" className="w-10 h-10" />
                    </div>
                    <h2 className="text-white text:sm md:text-xl font-bold text-center">Dẫn đầu trong thị trường nông nghiệp toàn quốc</h2>
                  </div>
                  <div className=" top-4 right-4 md:mt-0 mt-4">
                    <Button text="Tìm Hiểu Thêm" backgroundColor = "#FFFFFF" iconType="arrow" />
                  </div>
            </div>
          </div>    
        </div>
      <Footer/>
    </>
  );
};

export default HomePage;