import  { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { RiVideoDownloadLine } from "react-icons/ri";

interface EventType {
    _id: string;
    imageUrl: string;
    event_type: string;
    currentCount: number;
    event_time: string;
    cameraID: string;
    // video_recorded: string;
  }
  
const LatestEventTable = ({ events }: { events: EventType[] }) => {
  const dt = useRef(null);
  const [selectedEvents, setSelectedEvents] = useState<EventType[]>([]);
  const imageBodyTemplate = (rowData: EventType) => (
    <img
      src={rowData.imageUrl}
      alt="Sự kiện"
      className="w-16 h-16 object-cover rounded"
    />
  );
  const downloadVideo = async (video_recorded: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/download/${video_recorded}`);
      if (!response.ok) throw new Error("Video not found");
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${video_recorded}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Tải video thất bại");
    }
  };
  const downloadButtonTemplate = (rowData: EventType) => (
     <div
                      className="flex cursor-pointer gap-1 bg-[#3D6649] text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                      onClick={() => downloadVideo(rowData._id)}
                    >
                      <RiVideoDownloadLine className="text-white" size={18} />
                      <p>Tải Video</p>
                    </div>
     
  );
    
    const dateBodyTemplate = (rowData: EventType) =>
    new Date(rowData.event_time).toLocaleString();
    const header = (
        <div className="flex flex-wrap lign-items-center justify-between">
                <h1 className="m-0 text-xl md:text-2xl">📋 Bảng ghi lại sự kiện</h1>
        </div>
    );
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
          scrollable scrollHeight='100vh' virtualScrollerOptions={{ itemSize: 46 }} tableStyle={{ minWidth: '50rem' }}
        >
          <Column selectionMode="multiple" exportable={false} />
          {/* <Column field="_id" header="ID" sortable style={{ minWidth: "6rem" }} /> */}
          <Column
            header="Hình ảnh"
            body={imageBodyTemplate}
            style={{ minWidth: "8rem" }}
          />
          <Column field="event_type" header="Sự kiện" sortable style={{ minWidth: "6rem" }} />
          <Column field="currentCount" header="Số lượng" sortable style={{ minWidth: "4rem" }} />
          <Column
            header="Thời gian"
            body={dateBodyTemplate}
            sortable
            style={{ minWidth: "8rem" }}
          />
          <Column field="cameraID" header="Camera ID" sortable style={{ minWidth: "6rem" }} />
          {/* <Column
          header="Tải Video"
          body={downloadButtonTemplate}
          style={{ minWidth: "8rem" }}
        /> */}

        </DataTable>
    </div>
  );
};

export default LatestEventTable;