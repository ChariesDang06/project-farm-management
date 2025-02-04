import React, { useState, ChangeEvent, MouseEvent } from "react";
import Hello from "../../assets/hello.png"
import { FcGoogle } from "react-icons/fc";
export const validateInput = (str: string = ""): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
};

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
    setLoading(false);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
    setLoading(false);
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
      <div className="">
        <img className="w-[72%] p-3 mx-auto mb-[12%]" src={Hello} alt="Hello" />
        <form>
          <div className="mb-4">
            <span className="block  text-left text-[#0C1421] mb-2">
              Email
            </span>
            <input
              placeholder="Example@email.com"
              id="email"
              className="w-full p-3 border border-[#D4D7E3] rounded-[100px] text-black bg-white"
              type="email"
              name="email"
              onChange={handleEmailChange}
              value={email}
            />
            {email && !validateInput(email) && (
              <p className="text-red-500 text-sm mt-1 text-left">Email không đúng định dạng</p>
            )}
          </div>

          <div className="mb-4 relative">
            <span className="block  text-left text-[#0C1421] mb-2 ">
              Mật khẩu
            </span>
            <input
              id="password"
              className="w-full p-3 border border-[#D4D7E3] rounded-[100px] text-black bg-white"
              type="password"
              name="password"
              placeholder="Ít nhất 8 kí tự ..."
              onChange={handlePasswordChange}
              value={password}
            />
            {err && <p className="text-red-500 text-sm mt-1 text-left">{err}</p>}
            <a href="/" className="hover:underline cursor-pointer text-sm text-green-600 absolute right-0 mt-14 ">
              Quên mật khẩu?
            </a>
          </div>

          <button
            disabled={!email || !password}
            onClick={handleClick}
            className={`w-full p-3  mt-6 rounded-[100px] transition ${
              !email || !password
                ? "bg-black text-white cursor-not-allowed"
                : "bg-black text-white cursor-pointer"
            }`}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
          <div className="flex items-center w-full my-4">
            <hr className="flex-1 border-t-2 border-[#CFDFE2]" />
            <p className="mx-4 text-black whitespace-nowrap">Hoặc</p>
            <hr className="flex-1 border-t-2 border-[#CFDFE2]" />
          </div>

          <button
            onClick={handleClick}
            className="w-full p-3 rounded-[100px] bg-black text-white flex items-center justify-center gap-3 transition cursor-pointer"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="text-base">Đăng nhập bằng Google</span>
          </button>

          <div className="flex justify-center items-center mt-4 text-gray-600">
            <p className="text-sm">Bạn chưa có tài khoản?</p>
            <a href="/register" className="cursor-pointer ml-1 text-green-600 text-sm  hover:underline">
              Đăng ký
            </a>
          </div>
        </form>
      </div>
  );
};

export default Login;
