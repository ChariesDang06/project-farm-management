import React, { useEffect, useState } from "react";

// Định nghĩa interface cho event
interface Event {
  event_type: string;
  cameraID: string;
  event_time: string;
  snapshot_id?: string;
  previousCount?: number;
  currentCount?: number;
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [showInfoPopup, setShowInfoPopup] = useState(false); // Popup để thêm thông tin
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // Popup xác nhận lưu
  const [showImagePopup, setShowImagePopup] = useState(false); // Popup xem hình
  const [barnName] = useState("barn1");
  const [countChange] = useState<string>(
    event.previousCount && event.currentCount
      ? `${event.previousCount} → ${event.currentCount}`
      : ""
  );
  const [time] = useState(new Date(event.event_time).toLocaleString());
  const [reason, setReason] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.userId);
    }
  }, []);

  const handleInfoPopupClose = () => {
    setShowInfoPopup(false);
  };

  const handleImagePopupClose = () => {
    setShowImagePopup(false);
  };

  const handleConfirmationClose = () => {
    setShowConfirmationPopup(false);
  };

  const handleSave = () => {
    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    // Hiển thị popup xác nhận trước khi lưu
    setShowConfirmationPopup(true);
  };

  const handleConfirmSave = () => {
    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    const eventData = {
      barnName,
      countChange,
      time,
      reason,
      userId,
    };

    // Gửi yêu cầu lưu sự kiện qua API
    fetch("http://localhost:8000/reason_barn_events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Event saved successfully:", data);
        setShowInfoPopup(false); // Đóng popup thêm thông tin
        setShowConfirmationPopup(false); // Đóng popup xác nhận
      })
      .catch((error) => {
        console.error("Error saving event:", error);
      });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md relative text-left">
      <p><strong>Camera ID:</strong> {event.cameraID}</p>
      {event.event_type && (
        <p>
          <strong>Loại sự kiện:</strong> {
            event.event_type === "Object leaving detected" ? "Phát hiện đối tượng rời khỏi khu vực" :
            event.event_type === "Pig count changes" ? "Số lượng heo thay đổi" :
            event.event_type === "Human detect" ? "Phát hiện người" :
            event.event_type === "Object count changes" ? "Thay đổi số lượng đối tượng" :
            event.event_type 
          }
        </p>
      )}

      <p><strong>Thời gian:</strong> {new Date(event.event_time).toLocaleString()}</p>

      {event.cameraID === "PIG_CROSS_LINE_CAM" && event.snapshot_id && (
        <button onClick={() => setShowImagePopup(true)} className="text-blue-500 underline">
          Xem hình
        </button>
      )}

      {event.cameraID === "SIM_CAM" && (
        <>
          {event.previousCount !== undefined && event.currentCount !== undefined && (
            <p><strong>Thay đổi:</strong> {event.previousCount} → {event.currentCount}</p>
          )}

          <button onClick={() => setShowInfoPopup(true)} className="text-blue-500 underline">
            Thêm thông tin
          </button>
        </>
      )}

      {/* Popup để thêm thông tin */}
      {showInfoPopup && (
        <div className="fixed inset-0 flex text-left items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg relative max-w-sm w-full max-h-[80vh] overflow-auto">
            <h2 className="text-xl mb-4">Thông tin</h2>
            <div>
              <label className="block mb-2">Tên chuồng:</label>
              <input
                type="text"
                value={barnName}
                readOnly
                className="p-2 border rounded w-full mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Số lượng thay đổi</label>
              <input
                type="text"
                value={countChange}
                readOnly
                className="p-2 border rounded w-full mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Thời gian:</label>
              <input
                type="text"
                value={time}
                readOnly
                className="p-2 border rounded w-full mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Lý do:</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="p-2 border rounded w-full mb-4"
              />
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleInfoPopupClose}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Đóng
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 cursor-pointer text-white rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup xác nhận lưu */}
      {showConfirmationPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg relative max-w-sm w-full">
            <h2 className="text-xl mb-4">Xác nhận thông tin</h2>
            <p>Thông tin sẽ được lưu lại. Bạn có chắc chắn muốn lưu không?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleConfirmationClose}
                className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup xem hình */}
      {showImagePopup && event.snapshot_id && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg relative max-w-3xl w-full">
            <img
              src={`http://localhost:8000/snapshot/${event.snapshot_id}`}
              alt="Snapshot"
              className="max-w-full max-h-[80vh] mx-auto"
            />
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleImagePopupClose}
                className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded"
              >
                Đóng
              </button>
              <a
                href={`http://localhost:8000/snapshot/${event.snapshot_id}`}
                download={event.snapshot_id} // Tùy chọn tên file tải về
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded"
              >
                Tải hình
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
