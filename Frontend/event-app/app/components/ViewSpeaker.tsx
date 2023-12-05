"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../state/state";
interface Speakers {
  SpeakerID: number;
  SpeakerName: string;
  SpeakerAvailability: string;
  EventID: number;
}

function ViewSpeaker() {
  const { user } = useUser();
  const [speaker, setSpeaker] = useState<Speakers[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/speakers/");
        setSpeaker(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (e: any, SpeakerID: number) => {
    e.preventDefault();
    try {
      axios.delete(`http://localhost:8800/api/speakers/${SpeakerID}`);
      toast.success("Speaker Deleted");
      router.push("/add-speaker");
    } catch (e) {
      console.log(e);
    }
  };

  const updateEvent = (e: any, SpeakerID: number) => {
    e.preventDefault();
    router.push(`/update-speaker/${SpeakerID}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ml-52">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Speaker ID
              </th>
              <th scope="col" className="px-6 py-3">
                Speaker Name
              </th>
              <th scope="col" className="px-6 py-3">
                Speaker Availability
              </th>
              <th scope="col" className="px-6 py-3">
                Event ID
              </th>
              {user && user.UserRole === "admin" && (
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {speaker &&
              speaker.map((event) => (
                <tr
                  key={event.SpeakerID}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 text-white">{event.SpeakerID}</td>
                  <td className="px-6 py-4">{event.SpeakerName}</td>
                  <td className="px-6 py-4">{event.SpeakerAvailability}</td>
                  <td className="px-6 py-4">{event.EventID}</td>
                  {user && user.UserRole === "admin" && (
                    <td>
                      <div className="flex space-x-2 px-2">
                        <button
                          onClick={(e) => handleDelete(e, event.SpeakerID)}
                          className="bg-gray-500 text-white px-2 py-1 rounded-md hover:opacity-80"
                        >
                          Delete
                        </button>
                        <button
                          onClick={(e) => updateEvent(e, event.SpeakerID)}
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

export default ViewSpeaker;
