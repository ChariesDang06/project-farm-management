import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RiVideoDownloadLine } from "react-icons/ri";

type Event = {
  _id?: string;
  event_type: string;
  message?: string;
  previousCount?: number;
  currentCount?: number;
  event_time: string;
  cameraID: string;
  video_recorded?: string;
  image_url?: string;
  snapshot_id?: string;
};

type EventsTableProps = {
  filterCamId?: string;
  filterBarnCameraIDs?: string[];
};

// Sửa map để xử lý riêng event_type
const eventTypeBodyTemplate = (rowData: Event) => {
  if (rowData.event_type === "Object leaving detected") {
    if (rowData.cameraID === "PIG_CROSS_LINE_CAM") {
      return "Heo đã rời khỏi";
    }
    return "Đối tượng đã rời khỏi";
  }
  const eventTypeMap: { [key: string]: string } = {
    "Pig count changes": "Thay đổi số lượng heo",
    "Human detect": "Phát hiện người",
    "Object count changes": "Thay đổi số lượng vật thể",
  };
  return eventTypeMap[rowData.event_type] || rowData.event_type;
};

const EventsTable: React.FC<EventsTableProps> = ({ filterCamId, filterBarnCameraIDs }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const dt = useRef<DataTable<Event[]>>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupSnapshotId, setPopupSnapshotId] = useState<string | null>(null);

  const handlePopupOpen = (snapshotId: string) => {
    setPopupSnapshotId(snapshotId);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupSnapshotId(null);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/events")
      .then((res) => {
        setEvents(res.data.events);
        console.log("event", res.data.events);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy sự kiện:", err);
      });
  }, []);

  const filteredEvents = filterCamId
    ? events.filter((event) => event.cameraID === filterCamId)
    : filterBarnCameraIDs
      ? events.filter((event) => filterBarnCameraIDs.includes(event.cameraID))
      : events;

  const header = <div className="text-xl font-bold">Danh sách sự kiện</div>;

  const dateBodyTemplate = (rowData: Event) => {
    return new Date(rowData.event_time).toLocaleString("vi-VN");
  };

  const currentCountBodyTemplate = (rowData: Event) => {
    if (rowData.event_type === "Object count changes") {
      return `${rowData.previousCount ?? 0} ➔ ${rowData.currentCount ?? 0}`;
    }
    return rowData.currentCount ?? "-";
  };

  const downloadButtonTemplate = (rowData: Event) => {
    const showSnapshotButton =
      rowData.event_type === "Object leaving detected" &&
      rowData.cameraID === "PIG_CROSS_LINE_CAM" &&
      rowData.snapshot_id;

    return (
      <div className="flex flex-col gap-2">
        {rowData.video_recorded ? (
          <div
            className="flex cursor-pointer gap-1 px-4 py-2 inline-flex rounded-full text-white bg-[#76bc6a] hover:bg-[#278d45] transition"
            onClick={() =>
              window.open(`http://localhost:8000/download/${rowData.video_recorded}`, "_blank")
            }
          >
            <RiVideoDownloadLine size={18} />
            <p className="ml-2">Tải Video</p>
          </div>
        ) : (
          <p>Không có video</p>
        )}
        {showSnapshotButton && (
          <div
            className="flex cursor-pointer gap-1 px-4 py-2 inline-flex rounded-full text-white bg-blue-500 hover:bg-blue-700 transition"
            onClick={() => handlePopupOpen(rowData.snapshot_id!)}
          >
            📷 <p className="ml-2">Xem hình</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <DataTable
        value={filteredEvents}
        ref={dt}
        className="p-2 bg-[#F3F7F5] rounded-[20px]"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        selection={selectedEvents}
        onSelectionChange={(e) => {
          setSelectedEvents(e.value as Event[]);
        }}
        header={header}
        dataKey="_id"
        sortIcon={(options) =>
          options.order === 1 ? <FiChevronUp /> : <FiChevronDown />
        }
        selectionMode="multiple"
        scrollable
        scrollHeight="100vh"
        virtualScrollerOptions={{ itemSize: 46 }}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column selectionMode="multiple" exportable={false} />
        <Column
          field="event_type"
          header="Sự kiện"
          body={eventTypeBodyTemplate}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="currentCount"
          header="Số lượng"
          body={currentCountBodyTemplate}
          sortable
          style={{ minWidth: "6rem" }}
        />
        <Column
          header="Thời gian"
          body={dateBodyTemplate}
          sortable
          style={{ minWidth: "6rem" }}
        />
        <Column
          field="cameraID"
          header="Camera ID"
          sortable
          style={{ minWidth: "6rem" }}
        />
        <Column
          header="Tải Video"
          body={downloadButtonTemplate}
          style={{ minWidth: "8rem" }}
        />
      </DataTable>

      {showPopup && popupSnapshotId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-4 rounded-lg relative max-w-3xl w-full">
            <img
              src={`http://localhost:8000/snapshot/${popupSnapshotId}`}
              alt="Snapshot"
              className="max-w-full max-h-[80vh] mx-auto"
            />
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handlePopupClose}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Đóng
              </button>
              <a
                href={`http://localhost:8000/snapshot/${popupSnapshotId}`}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 text-white rounded"
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

export default EventsTable;
