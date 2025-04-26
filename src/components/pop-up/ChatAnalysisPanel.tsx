import React from "react";
import { FaRegMessage } from "react-icons/fa6";
import { LuLoaderCircle } from "react-icons/lu";
import ReactMarkdown from "react-markdown";

interface ChatAnalysisPanelProps {
  isOpen: boolean;
  isLoading: boolean;
  content: string;
  onClose: () => void;
}

const ChatAnalysisPanel: React.FC<ChatAnalysisPanelProps> = ({
  isOpen,
  isLoading,
  content,
  onClose,
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className=" text-start fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div
          className="bg-white rounded-xl shadow-2xl w-[800px] max-w-[90vw] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-[#4caf50] to-[#2e7d32] p-5 text-white flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                  <FaRegMessage className="w-4 h-4 text-[#4caf50]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Phân tích dữ liệu</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 p-0 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <span>X</span>
              </button>
            </div>
          </div>

          <div className="bg-[#f9f9f9] px-5 py-2 border-b border-gray-200 flex items-center flex-shrink-0">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>
                Dữ liệu cung cấp cho AI từ nông trại của bạn •{" "}
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-grow bg-[#fafafa]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <LuLoaderCircle className="w-12 h-12 text-[#4caf50] animate-spin mb-4" />
                <span className="text-gray-600 text-lg">
                  Đang phân tích dữ liệu...
                </span>
              </div>
            ) : (
              <div className="prose max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1
                        className="text-2xl font-bold mt-2 mb-4 text-[#1e3a1e]"
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        className="text-xl font-medium mt-4 mb-2 text-[#4caf50]"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="my-2 text-black font-base" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-5 my-1" {...props} />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-white flex justify-between items-center flex-shrink-0">
            <div className="text-sm text-gray-500">
              <span className="flex items-center">
                <FaRegMessage className="w-4 h-4 mr-1 text-[#4caf50]" />
                Được hỗ trở bởi AI
              </span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="border-gray-300 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatAnalysisPanel;
