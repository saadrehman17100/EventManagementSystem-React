"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../state/state";
interface Participants {
  ParticipantID: number;
  ParticipantName: string;
  ParticipantEmail: string;
}

function ViewParticipants() {
  const [participant, setParticipant] = useState<Participants[]>([]);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/participants/");
        setParticipant(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (e: any, ParticipantID: number) => {
    e.preventDefault();
    try {
      axios.delete(`http://localhost:8800/api/participants/${ParticipantID}`);
      toast.success("Participant Deleted");
      router.push("/add-participants");
    } catch (e) {
      console.log(e);
    }
  };
  const updateEvent = (e: any, ParticipantID: number) => {
    e.preventDefault();
    router.push(`/update-participant/${ParticipantID}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ml-40">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Participant ID
              </th>
              <th scope="col" className="px-6 py-3">
                Participant Name
              </th>
              <th scope="col" className="px-6 py-3">
                Participant Email
              </th>
              {user && user.UserRole === "admin" && (
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {participant &&
              participant.map((event) => (
                <tr
                  key={event.ParticipantID}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 text-white">
                    {event.ParticipantID}
                  </td>
                  <td className="px-6 py-4">{event.ParticipantName}</td>
                  <td className="px-6 py-4">{event.ParticipantEmail}</td>
                  {user && user.UserRole === "admin" && (
                    <td>
                      <div className="flex space-x-2 px-2">
                        <button
                          onClick={(e) => handleDelete(e, event.ParticipantID)}
                          className="bg-gray-500 text-white px-2 py-1 rounded-md hover:opacity-80"
                        >
                          Delete
                        </button>
                        <button
                          onClick={(e) => updateEvent(e, event.ParticipantID)}
                          className="bg-gray-500 text-white px-2 py-1 rounded-md hover:opacity-80"
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewParticipants;
