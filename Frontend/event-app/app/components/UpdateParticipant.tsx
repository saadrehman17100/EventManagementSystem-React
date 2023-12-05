"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UpdateParticipant() {
  const { id } = useParams();
  const [participant, setParticipant] = useState({
    ParticipantID: id,
    ParticipantName: "",
    ParticipantEmail: "",
  });

  const handleChange = (e: any) => {
    const value = e.target.value;
    setParticipant({ ...participant, [e.target.name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8800/api/participants/${id}`,
        {
          ParticipantName: participant.ParticipantName,
          ParticipantEmail: participant.ParticipantEmail,
        }
      );
      console.log(response.data);
      toast.success("Participant Updated");
    } catch (e) {
      console.log(e);
    }

    setParticipant({
      ParticipantID: "",
      ParticipantName: "",
      ParticipantEmail: "",
    });
  };

  const handleClear = (e: any) => {
    e.preventDefault();
    setParticipant({
      ParticipantID: "",
      ParticipantName: "",
      ParticipantEmail: "",
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
              Participant Name
            </label>
            <input
              type="text"
              className="text-black px-4 py-2 border-2 border-gray-500"
              name="ParticipantName"
              value={participant.ParticipantName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="eventName" className="text-black">
              Participant Email
            </label>
            <input
              type="email"
              className="text-black px-4 py-2 border-2 border-gray-500"
              name="ParticipantEmail"
              value={participant.ParticipantEmail}
              onChange={(e) => handleChange(e)}
            />
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

export default UpdateParticipant;
