"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useUser } from "../state/state";

interface Schedules {
  ScheduleID: number;
  SessionDetails: string;
  SpeakerID: number;
  ActivityDetails: string;
  EventID: number;
}

function ViewSchedule() {
  const { user } = useUser();
  const router = useRouter();
  const [schedule, setSchedule] = useState<Schedules[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/schedules/");
        setSchedule(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (e: any, ScheduleID: number) => {
    e.preventDefault();
    try {
      axios.delete(`http://localhost:8800/api/schedules/${ScheduleID}`);
      toast.success("Scehdule Deleted");
      router.push("/add-schedules");
    } catch (e) {
      console.log(e);
    }
  };
  const updateEvent = (e: any, ScheduleID: number) => {
    e.preventDefault();
    router.push(`/update-schedules/${ScheduleID}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ml-20">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Schedule ID
              </th>
              <th scope="col" className="px-6 py-3">
                Session Details
              </th>
              <th scope="col" className="px-6 py-3">
                Speaker ID
              </th>
              <th scope="col" className="px-6 py-3">
                Activity Details
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
            {schedule &&
              schedule.map((sc) => (
                <tr
                  key={sc.ScheduleID}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 text-white">{sc.ScheduleID}</td>
                  <td className="px-6 py-4">{sc.SessionDetails}</td>
                  <td className="px-6 py-4">{sc.SpeakerID}</td>
                  <td className="px-6 py-4">{sc.ActivityDetails}</td>
                  <td className="px-6 py-4">{sc.EventID}</td>
                  {user && user.UserRole === "admin" && (
                    <td>
                      <div className="flex space-x-2 px-2">
                        <button
                          onClick={(e) => handleDelete(e, sc.ScheduleID)}
                          className="bg-gray-500 text-white px-2 py-1 rounded-md hover:opacity-80"
                        >
                          Delete
                        </button>
                        <button
                          onClick={(e) => updateEvent(e, sc.ScheduleID)}
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

export default ViewSchedule;
