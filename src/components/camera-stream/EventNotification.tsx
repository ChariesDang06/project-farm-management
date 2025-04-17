
import { useEffect, useState } from "react";

type Props = {
  camId: string;
};

export default function EventNotification({ camId }: Props) {
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`http://localhost:8000/latest_event/${camId}`);
      const data = await res.json();
      console.log("data",data)
      setEvent(data);
    }, 3000); // Cập nhật mỗi 3s

    return () => clearInterval(interval);
  }, [camId]);

  return (
    <div className="p-2 bg-yellow-100 border border-yellow-300 rounded">
      {event?.event_type ? (
        <div>
          <p className="font-semibold">{event.event_type}</p>
          <p className="text-sm text-gray-600">{event.event_time}</p>
        </div>
      ) : (
        <p className="text-gray-500">Chưa có sự kiện.</p>
      )}
    </div>
  );
}
