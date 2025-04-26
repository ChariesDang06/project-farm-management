import AbnormalDetectionCard from "../../components/card/AbnormalDetectionCard";
import BarnSelector, { Barn } from "../../components/barn-selector/BarnSelector";
import { useRef } from 'react';
import CameraStream from "../../components/camera-stream/CameraStream";
import { FaPaw, FaCheck, FaTag } from "react-icons/fa";
import { MdHome ,MdLinkedCamera} from "react-icons/md";
import WidgetComponent from "../../components/widget/WidgetComponent";
import QuantitySelector from "../../components/quantity-selector/QuantitySelector";
import { useEffect, useState } from "react";
import ButtonAction from "../../components/button/ButtonAction";
import { Toast } from "primereact/toast";
import { mockData, barns, BarnId, MonthRange, WidgetInfo } from "./data"
import EventsTable from "./EventTable";
import CameraCard from "../../components/camera-stream/CameraCard";

function AbnormalDetection() {

    const [barns1, setBarns1] = useState<Barn[]>([]);
  useEffect(() => {
      const fetchBarns = async () => {
        try {
          const response = await fetch("https://agriculture-traceability.vercel.app/api/v1/rooms");
          const data = await response.json();
          setBarns1(data.rooms);
        } catch (error) {
          console.error("Error fetching:", error);
        }
      };
      fetchBarns();
    }, []);
  const [abnormalDetections, setAbnormalDetections] = useState<any[]>([]);
 


  interface Camera {
    _id: string;
    location?: string;
    rtsp_url?: string;
  }
  interface EventData {
    event_type: string;
    message?: string;
    camera_id: string;
    event_time: string;
    
  }

  const toast = useRef<Toast>(null);
  const [showAddCamera, setShowAddCamera] = useState(false);
  const [newCam, setNewCam] = useState({ id: "",  location: "", rtsp_url: "" });
  const [cameraList, setCameraList] = useState<Camera[]>([]);
  const handleAddCamera = async () => {
    if (!newCam.id || !newCam.rtsp_url) {
      return alert("Vui lòng nhập đầy đủ thông tin!");
    }
  
    try {
      const requestBody: Camera = {
        _id: newCam.id,
        location: newCam.location,
        rtsp_url: newCam.rtsp_url,
      };

      const res = await fetch("http://127.0.0.1:8000/add_cameras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      const data = await res.json();
      if (res.ok) {
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Thêm camera thành công!', life: 3000 });
        setCameraList((prev) => [...prev, requestBody]);
        console.log("res",res);
        setShowAddCamera(false);
        setNewCam({ id: "", location: "", rtsp_url: "" });
      } else {
        toast.current?.show({  severity: 'error', summary: 'Error',  detail: 'Lỗi thêm camera',  life: 3000  });
        console.error("API error:", data.error);
      }
    } catch (error) {
      console.error("Error adding camera:", error);
      toast.current?.show({  severity: 'error', summary: 'Error',  detail: 'Có lỗi xảy ra!',  life: 3000  });

    }
  };
  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/cameras");
        const data = await response.json();
        setCameraList(data.cameras);
      } catch (error) {
        console.error("Error fetching cameras:", error);
      }
    };

    fetchCameras();
  }, []);

  
  const [selectedBarnId, setSelectedBarnId] = useState<BarnId>("barn1");
  const [from, setFrom] = useState<string>("Tháng 1");
  const [to, setTo] = useState<string>("Tháng 3");
  
  const [widgetData, setWidgetData] = useState<WidgetInfo>(
    mockData["barn1"]["Tháng 1-Tháng 3"]
  );
  useEffect(() => {
    handleUpdateData(selectedBarnId, from, to);
  }, [selectedBarnId, from, to]);
  const handleUpdateData = (barnId: string, fromMonth: string, toMonth: string) => {
    const key = `${fromMonth}-${toMonth}` as MonthRange;
  
    if (barnId in mockData) {
      const data = mockData[barnId as BarnId]?.[key];
      if (data) {
        setWidgetData(data);
      } else {
        console.warn("Không có dữ liệu cho khoảng tháng:", key);
      }
    } else {
      console.warn("Không có dữ liệu cho barnId:", barnId);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/events");
      const data = await res.json();
  
      // Assuming the returned data shape is { events: [...] }
      const events: EventData[] = data.events;
  
      // Optional: Sort by time descending
      const sortedEvents = events.sort((a, b) => {
        return new Date(b.event_time).getTime() - new Date(a.event_time).getTime();
      });
  
      // Update state with all events
      setAbnormalDetections(sortedEvents);
    } catch (error) {
      console.error("Error fetching all events:", error);
    }
  };
  
  
  useEffect(() => {
    fetchAllEvents();
    const interval = setInterval(() => {
      fetchAllEvents(); 
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  
  // ============================================================== //
  
    return (
      <>
      <Toast ref={toast} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-[20px] mb-5">
        <div className="bg-[#F3F7F5] rounded-[20px] p-3 sm:p-5 mb-5 lg:col-span-2">
        <BarnSelector
          barns={barns}
          value={selectedBarnId}
          onSelect={(id: string) => {
            setSelectedBarnId(id as BarnId); 
            handleUpdateData(id, from, to);
          }}
          icon={<MdHome className="w-6 h-6" />}
          rounded={false}
          widthFull="w-[240px]"
          placeholder="Chọn đàn"
          iconColor="text-white"
          iconBgColor="bg-yellow-500"
        />
          <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <WidgetComponent icon={<FaPaw />} title="Tổng số vật nuôi" quantity={widgetData.total}  description="Số lượng tổng vật nuôi tại chi nhánh" bgColor="#2196F3" />
              <WidgetComponent icon={<FaCheck />} title="Nhập vào" quantity={widgetData.input} description="Tổng số lượng vật nuôi được nhập tại chi nhánh" bgColor="#619959" />
              <WidgetComponent icon={<FaTag />} title="Bán ra" quantity={widgetData.output} description="Tổng số lượng vật nuôi được bán ra tại chi nhánh" bgColor="#FCBD2D" />
          </div>
        </div>
        <div className="lg:col-span-1 rounded-[20px] p-3 sm:p-5 mb-5 bg-[#F3F7F5]">
        <QuantitySelector
          from={from}
          to={to}
          setFrom={setFrom}
          setTo={setTo}
          quantity={widgetData.quantity}
          onDateChange={(from, to) => handleUpdateData(selectedBarnId, from, to)}
        />

        </div>
      </div>
      <div className="bg-[#F3F7F5] rounded-[20px] p-3 sm:p-5">
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <ButtonAction  icon={<MdLinkedCamera className="w-7 h-7" />} 
                            text="Xem lại sự kiện" 
                            bgColor="#76bc6a" 
                            textColor="#fff"
                            truncate={false}
            />
            <button
              onClick={() => setShowAddCamera(true)}
              className="flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-400 rounded-lg h-10 w-10 hover:border-[#76bc6a] hover:bg-[#76bc6a] transition"
              style={{ width: "fit-content", padding: "10px" }}
            >
              <span className="text-3xl font-bold text-gray-500 hover:text-[#fff]" style={{display:"flex", alignItems:"center"}}>＋ <span style={{fontSize:"16px"}}>Thêm camera</span></span>
            </button>
          </div>

          <div className="mt-12">

          <div className="flex flex-col lg:flex-row gap-4 items-start">
            <div className="w-full lg:w-2/3 grid gap-4">
            <div className="">
            {selectedBarnId === "all" ? (
          <CameraStream />
        ) : (
          cameraList
            .filter((cam) => cam.location === selectedBarnId)
            .map((cam) => (
              <CameraCard key={cam._id} camera={cam._id} />
            ))
        )}

              </div>
            </div>
            <div className="w-full lg:w-1/3 bg-white p-4 rounded-xl shadow-md max-h-[100vh] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4 text-red-500 ">🚨 Cảnh báo bất thường</h2>
              {abnormalDetections.length === 0 ? (
                <p className="text-gray-500 text-sm">Không có cảnh báo nào.</p>
              ) : (
                abnormalDetections.map((event, index) => (
                  <div className="mb-2">
                  <AbnormalDetectionCard key={index} event={event} />
                  </div>
                ))
              )}
            </div>
          </div>
         
        </div>
        
      </div>
      <div className="rounded-md  mt-20">
          <EventsTable />
      </div>
      {showAddCamera && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl relative">
      <h2 className="text-xl font-semibold mb-4">➕ Thêm Camera</h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Camera ID (ví dụ: CAM_003)"
          className="w-full border p-2 rounded"
          value={newCam.id}
          onChange={(e) => setNewCam({ ...newCam, id: e.target.value })}
        />
       <select
          className="w-full border p-2 rounded"
          value={newCam.location}
          onChange={(e) => setNewCam({ ...newCam, location: e.target.value })}
        >
          <option value="" disabled>
            Chọn đàn
          </option>
          {barns.map((barn) => (
            <option key={barn._id} value={barn._id}>
              {barn.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="RTSP URL"
          className="w-full border p-2 rounded"
          value={newCam.rtsp_url}
          onChange={(e) => setNewCam({ ...newCam, rtsp_url: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={() => setShowAddCamera(false)}
          className="px-5 py-2  rounded-full bg-white border hover:border-[#278d45] hover:text-[#278d45]"
        >
          Hủy
        </button>
        <button
          onClick={handleAddCamera}
          className="px-5 py-2  rounded-full text-white bg-[#76bc6a] hover:bg-[#278d45]"
        >
          Thêm
        </button>
          </div>
          </div>
        </div>
      )}
      <Toast ref={toast} />
    </>
    );
  }
  
  export default AbnormalDetection;
  