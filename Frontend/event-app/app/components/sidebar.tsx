"use client";
import React from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { useUser, userAtom } from "../state/state";

function sidebar() {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="bg-gray-400 w-60">
      <div className="flex flex-col items-start px-5 justify-center space-y-3">
        <div className="text-black text-center font-bold">
          EVENT MANAGEMENT SYSTEM
        </div>
        <div className="flex flex-col space-y-5 ">
          <div className="flex flex-col space-y-2">
            <h1 className="text-black font-bold">EVENTS</h1>
            <div className="flex flex-col space-y-2">
              {user && user.UserRole === "admin" && (
                <Link
                  className="text-black hover:underline"
                  href={"/add-event"}
                >
                  Add Events
                </Link>
              )}
              <Link
                className="text-black hover:underline"
                href={"/read-events"}
              >
                View Events
              </Link>
              <Link className="text-black hover:underline" href={"/view-event"}>
                Register Event
              </Link>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-black font-bold">PARTICIPANTS</h1>
            <div className="flex flex-col space-y-2">
              {user && user.UserRole === "admin" && (
                <Link
                  className="text-black hover:underline"
                  href={"/add-participants"}
                >
                  Add Participants
                </Link>
              )}
              <Link
                className="text-black hover:underline"
                href={"/view-participants"}
              >
                View Participants
              </Link>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-black font-bold">SPEAKERS</h1>
            <div className="flex flex-col space-y-2">
              {user && user.UserRole === "admin" && (
                <Link
                  className="text-black hover:underline"
                  href={"/add-speaker"}
                >
                  Add Speakers
                </Link>
              )}

              <Link
                className="text-black hover:underline"
                href={"/view-speaker"}
              >
                View Speakers
              </Link>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-black font-bold">REPORTS</h1>
            <div className="flex flex-col space-y-2">
              {user && user.UserRole === "admin" && (
                <Link
                  className="text-black hover:underline"
                  href={"/add-reports"}
                >
                  Add Report
                </Link>
              )}
              <Link
                className="text-black hover:underline"
                href={"/view-reports"}
              >
                View Report
              </Link>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-black font-bold">SCHEDULES</h1>
            <div className="flex flex-col space-y-2">
              {user && user.UserRole === "admin" && (
                <Link
                  className="text-black hover:underline"
                  href={"/add-schedules"}
                >
                  Add Schedules
                </Link>
              )}
              <Link
                className="text-black hover:underline"
                href={"/view-schedules"}
              >
                View Schedules
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default sidebar;
