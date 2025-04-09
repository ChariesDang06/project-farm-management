
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RiVideoDownloadLine } from "react-icons/ri";
type Event = {
  _id?: string;
  event_type: string;
  message: string;
  currentCount?: number;
  event_time: string;
  cameraID: string;
  video_recorded?: string;
  image_url?: string;
};

const EventsTable: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const dt = useRef<DataTable<Event[]>>(null);

  useEffect(() => {
    axios.get("http://localhost:8000/events")
      .then((res) => {
        setEvents(res.data.events);
        console.log("res.data.events",res.data.events)
      })
      .catch((err) => {
        console.error("Lỗi khi lấy sự kiện:", err);
      });
  }, []);

  const header = <div className="text-xl font-bold">Danh sách sự kiện</div>;

  // const imageBodyTemplate = (rowData: Event) => {
  //   if (!rowData.image_url) return "Không có ảnh";
  //   return <img src={rowData.image_url} alt="event" className="w-20 h-auto rounded" />;
  // };

  const dateBodyTemplate = (rowData: Event) => {
    return new Date(rowData.event_time).toLocaleString("vi-VN");
  };

  const downloadButtonTemplate = (rowData: Event) => {
    if (!rowData.video_recorded) return "Không có video";

    return (
      <div
        className="flex cursor-pointer gap-1 bg-[#3D6649]  px-4 py-2 inline-flex rounded-full text-white bg-[#76bc6a] hover:bg-[#278d45] transition"
        onClick={() => {
          window.open(`http://localhost:8000/download/${rowData.video_recorded}`, "_blank");
        }}
      >
        <RiVideoDownloadLine className="text-white" size={18} />
        <p className="ml-2">Tải Video</p>
      </div>

    );
  };

  return (
    <div className="">
      <DataTable
        value={events}
        ref={dt}
        className="p-2 bg-[#F3F7F5] rounded-[20px]"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        selection={selectedEvents}
        onSelectionChange={(e) => {
          if (Array.isArray(e.value)) {
            setSelectedEvents(e.value);
          }
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
        {/* <Column field="_id" header="ID" sortable style={{ minWidth: "6rem" }} /> */}
        {/* <Column header="Hình ảnh" body={imageBodyTemplate} style={{ minWidth: "8rem" }} /> */}
        <Column field="event_type" header="Sự kiện" sortable style={{ minWidth: "6rem" }} />
        <Column field="currentCount" header="Số lượng" sortable style={{ minWidth: "4rem" }} />
        <Column header="Thời gian" body={dateBodyTemplate} sortable style={{ minWidth: "6rem" }} />
        <Column field="cameraID" header="Camera ID" sortable style={{ minWidth: "6rem" }} />
        <Column header="Tải Video" body={downloadButtonTemplate} style={{ minWidth: "8rem" }} />
      </DataTable>
    </div>
  );
};

export default EventsTable;
