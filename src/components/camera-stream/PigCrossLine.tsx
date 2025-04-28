
import React, { useEffect, useState } from "react";
import { getAllEvents } from "./services/api";
import StreamVideo from "./StreamVideo";
import EventCard from "./EventCard";

interface EventData {
  event_type: string;
  cameraID: string;
  event_time: string;
  snapshot_id?: string;
  previousCount?: number;
  currentCount?: number;
}

interface PigCrossLineProps {
  isOnlyCameraView: boolean; // Prop to control if only camera is shown
}

const cameraID = "PIG_CROSS_LINE_CAM";

const PigCrossLine = ({ isOnlyCameraView }: PigCrossLineProps) => {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await getAllEvents();
        const allEvents: EventData[] = eventsRes.data.events;
        console.log("event",allEvents)

        // Filter events by cameraID
        const filteredEvents = allEvents.filter(event => event.cameraID === cameraID);
        console.log("filteredEvents",allEvents)

        setEvents(filteredEvents); // Set the filtered events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="space-y-6 bg-[#F3F7F5] rounded-[20px] my-5 lg:col-span-2">

      <div className="lg:flex gap-4">

      <div className={isOnlyCameraView ? "w-full" : "w-full lg:w-2/3"}>
        <h1 className="text-xl font-bold text-left">Pig Cross Line Detection</h1>
          <StreamVideo camId={cameraID} />
        </div>

        {/* If isOnlyCameraView is false, show the events as well */}
        {!isOnlyCameraView && (
          <div className="w-full lg:w-1/3 max-h-[100vh] overflow-y-auto">
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">📋Sự kiện</h2>
              {events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <EventCard key={index} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No events found forr...</p>
              )}
            </div>
          </div>
        )} 
      </div>
    </div>
  );
};

export default PigCrossLine;
