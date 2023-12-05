"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
interface Speakers {
  SpeakerID: number;
}
interface Events {
  EventID: number;
}

function AddSchedule() {
  const router = useRouter();
  const [speaker, setSpeaker] = useState<Speakers[]>([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState("");
  const [event, setEvent] = useState<Events[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [schedule, setSchedule] = useState({
    SessionDetails: "",
    ActivityDetails: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/events/read");
        setEvent(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/speakers");
        setSpeaker(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSchedule({ ...schedule, [e.target.name]: value });
  };

  const handleClear = (e: any) => {
    e.preventDefault();
    setSchedule({
      SessionDetails: "",
      ActivityDetails: "",
    });
    setSelectedEvent("");
    setSelectedSpeaker("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api/schedules/",
        {
          SessionDetails: schedule.SessionDetails,
          ActivityDetails: schedule.ActivityDetails,
          EventID: selectedEvent,
          SpeakerID: selectedSpeaker,
        }
      );
      toast.success("Schedule added");
      router.push("/view-speaker");
      setSchedule({
        SessionDetails: "",
        ActivityDetails: "",
      });
      setSelectedEvent("");
      setSelectedSpeaker("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center ml-72">
      <div
        className="bg-gray-400 rounded-md flex items-center px-20 py-10"
        style={{ transform: "scale(0.8)" }}
      >
        <div className="flex flex-col items-center justify-center space-y-5">
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="eventName" className="text-black">
              Session Details
            </label>
            <input
              type="text"
              className="text-black px-4 py-2 border-2 border-gray-500"
              name="SessionDetails"
              value={schedule.SessionDetails}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="eventName" className="text-black">
              Activity Details
            </label>
            <input
              type="text"
              className="text-black px-4 py-2 border-2 border-gray-500"
              name="ActivityDetails"
              value={schedule.ActivityDetails}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <label className="font-bold text-black">Select Event</label>
            <select
              className="border-2 text-black border-gray-500 rounded-md py-2 px-4 focus:outline-none "
              name="EventID"
              id="category"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option>Select Event</option>
              {event.map((item) => (
                <option
                  className="text-black"
                  key={item.EventID}
                  value={item.EventID}
                >
                  {item.EventID}
                </option>
              ))}
            </select>
            <label className="font-bold text-black">Select Speaker</label>
            <select
              className="border-2 text-black border-gray-500 rounded-md py-2 px-4 focus:outline-none "
              name="SpeakerID"
              id="category"
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
            >
              <option>Select Speaker</option>
              {speaker.map((item) => (
                <option
                  className="text-black"
                  key={item.SpeakerID}
                  value={item.SpeakerID}
                >
                  {item.SpeakerID}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex space-x-2">
              <button
                onClick={handleSubmit}
                className="px-3 py-2 rounded-md text-white bg-gray-800 hover:opacity-80"
              >
                Submit
              </button>
              <button
                onClick={handleClear}
                className="px-3 py-2 rounded-md text-white bg-gray-800 hover:opacity-80"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSchedule;
