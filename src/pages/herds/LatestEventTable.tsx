import  { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

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


        </DataTable>
    </div>
  );
};

export default LatestEventTable;