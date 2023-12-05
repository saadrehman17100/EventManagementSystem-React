"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface User {
  UserID: number;
  UserName: string;
}

function AddEvent() {
  const router = useRouter();
  const [user, setUser] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [event, setEvent] = useState({
    EventName: "",
    EventDetails: "",
    EventDate: "",
    EventTime: "",
    EventLocation: "",
    EventDescription: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/users");
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setEvent({ ...event, [e.target.name]: value });
  };

  const handleClear = (e: any) => {
    e.preventDefault();
    setEvent({
      EventName: "",
      EventDetails: "",
      EventDate: "",
      EventTime: "",
      EventLocation: "",
      EventDescription: "",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/api/events/", {
        EventName: event.EventName,
        EventDetails: event.EventDetails,
        EventDate: event.EventDate,
        EventTime: event.EventTime,
        EventLocation: event.EventLocation,
        EventDescription: event.EventDescription,
        UserID: selectedUser,
      });
      toast.success("Event added");
      router.push("/view-event");

      setEvent({
        EventName: "",
        EventDetails: "",
        EventDate: "",
        EventTime: "",
        EventLocation: "",
        EventDescription: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center ml-72 -mt-20">
      <div
        className="bg-gray-400 rounded-md flex items-center px-20 py-10"
        style={{ transform: "scale(0.7)" }}
      >
        <div className="flex flex-col items-center justify-center space-y-5">
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="eventName" className="text-black">
              Event Name
            </label>
            <input
              type="text"
              className="text-black px-4 py-2 border-2 border-gray-500"
              name="EventName"
              value={event.EventName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="eventName" className="text-black">
              Event Details
            </label>
            <input
              type="text"
              className="text-black px-4 py-2 border-2 border-gray-500"
              name="EventDetails"
              value={event.EventDetails}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="eventName" className="text-black">
              Event Date
            </label>
            <input
              type="date"
              className="text-black px-4 py-2 border-2 border-gray-500"
              name="EventDate"
              value={event.EventDate}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="eventName" className="text-black">
              Event Time
            </label>
            <input
              type="time"
              className="text-black px-4 py-2 border-2 border-gray-500"
              name="EventTime"
              value={event.EventTime}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="eventName" className="text-black">
              Event Location
            </label>
            <input
              type="text"
              className="text-black px-4 py-2 border-2 border-gray-500"
              name="EventLocation"
              value={event.EventLocation}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="eventName" className="text-black">
              Event Description
            </label>
            <input
              type="text"
              className="text-black px-4 py-2 border-2 border-gray-500"
              name="EventDescription"
              value={event.EventDescription}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label className="font-bold text-black">Select User</label>
            <select
              className="border-2 text-black border-gray-500 rounded-md py-2 px-4 focus:outline-none "
              name="categoryId"
              id="category"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option>Select User</option>
              {user.map((item) => (
                <option
                  className="text-black"
                  key={item.UserID}
                  value={item.UserID}
                >
                  {item.UserID}
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

export default AddEvent;
