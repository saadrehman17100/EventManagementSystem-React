"use client";
import axios from "axios";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser, userAtom } from "../state/state";
import { toast } from "react-hot-toast";
interface Event {
  EventID: number;
  EventName: string;
  EventDetails: string;
  EventDate: string;
  EventTime: string;
  EventLocation: string;
  EventDescription: string;
  SpeakerID: number;
  SpeakerName: string;
  ScheduleID: string;
  UserID: number;
}

function ViewEvents() {
  const { user } = useUser();
  const router = useRouter();
  const [events, setEvent] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/events/");
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateEvent = (e: any, EventID: number) => {
    e.preventDefault();
    router.push(`/update-event/${EventID}`);
  };

  const RegisterUser = async (e: any, EventID: number) => {
    e.preventDefault();
    console.log(user);
    try {
      if (user) {
        const response = await axios.post(
          "http://localhost:8800/api/events/register",
          {
            EventID,
            UserID: user.UserID,
          }
        );
        console.log(user.UserID);
        toast.success("Registered Successfully.");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="relative max-w-6xl overflow-x-scroll">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Event ID
            </th>
            <th scope="col" className="px-6 py-3">
              Event Name
            </th>
            <th scope="col" className="px-6 py-3">
              Event Details
            </th>
            <th scope="col" className="px-6 py-3">
              Event Date
            </th>
            <th scope="col" className="px-6 py-3">
              Event Time
            </th>
            <th scope="col" className="px-6 py-3">
              Event Location
            </th>
            <th scope="col" className="px-6 py-3">
              Event Description
            </th>
            <th scope="col" className="px-6 py-3">
              Speaker ID
            </th>
            <th scope="col" className="px-6 py-3">
              Speaker Name
            </th>
            <th scope="col" className="px-6 py-3">
              Schedule ID
            </th>
            <th scope="col" className="px-6 py-3">
              User ID
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((event) => (
              <tr
                key={event.EventID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{event.EventID}</td>
                <td className="px-6 py-4">{event.EventName}</td>
                <td className="px-6 py-4">{event.EventDetails}</td>
                <td className="px-6 py-4">{event.EventDate}</td>
                <td className="px-6 py-4">{event.EventTime}</td>
                <td className="px-6 py-4">{event.EventLocation}</td>
                <td className="px-6 py-4">{event.EventDescription}</td>
                <td className="px-6 py-4">{event.SpeakerID}</td>
                <td className="px-6 py-4">{event.SpeakerName}</td>
                <td className="px-6 py-4">{event.ScheduleID}</td>
                <td className="px-6 py-4">{event.UserID}</td>

                <td>
                  <div className="flex space-x-2 px-2">
                    {user && user.UserRole === "admin" && (
                      <button
                        onClick={(e) => updateEvent(e, event.EventID)}
                        className="bg-gray-500 text-white px-2 py-1 rounded-md hover:opacity-80"
                      >
                        Update
                      </button>
                    )}
                    {user && user.UserRole === "user" && (
                      <button
                        onClick={(e) => RegisterUser(e, event.EventID)}
                        className="bg-green-500 text-white px-2 py-1 rounded-md hover:opacity-80"
                      >
                        Register
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEvents;
