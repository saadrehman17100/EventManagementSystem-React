"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Event {
  EventID: number;
}

function UpdateSpeaker() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [speaker, setSpeaker] = useState({
    SpeakerID: id,
    SpeakerName: "",
    SpeakerAvailability: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/events");
        console.log(res.data);
        setEvent(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSpeaker({ ...speaker, [e.target.name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8800/api/speakers/${id}`,
        {
          SpeakerName: speaker.SpeakerName,
          SpeakerAvailability: speaker.SpeakerAvailability,
          EventID: selectedEvent,
        }
      );
      toast.success("Speakers Updated");
      console.log(response.data);
      setSpeaker({
        SpeakerID: id,
        SpeakerName: "",
        SpeakerAvailability: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleClear = (e: any) => {
    e.preventDefault();
    setSpeaker({
      SpeakerID: id,
      SpeakerName: "",
      SpeakerAvailability: "",
    });
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
              Speaker Name
            </label>
            <input
              type="text"
              className="text-black px-4 py-2 border-2 border-gray-500"
              name="SpeakerName"
              value={speaker.SpeakerName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="eventName" className="text-black">
              Speaker Availability
            </label>
            <input
              type="text"
              className="text-black px-4 py-2 border-2 border-gray-500"
              name="SpeakerAvailability"
              value={speaker.SpeakerAvailability}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label className="font-bold text-black">Select Event</label>
            <select
              className="border-2 border-gray-500 text-black rounded-md py-2 px-4 focus:outline-none "
              name="categoryId"
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
          </div>

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
  );
}

export default UpdateSpeaker;
