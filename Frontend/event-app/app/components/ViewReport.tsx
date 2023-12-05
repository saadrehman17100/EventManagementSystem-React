"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../state/state";
interface Reports {
  ReportID: number;
  Attendance: number;
  Revenue: number;
  Feedback: string;
  EventID: number;
}

function ViewReport() {
  const { user } = useUser();
  const router = useRouter();
  const [reports, setReports] = useState<Reports[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/reports/");
        setReports(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e: any, ReportID: number) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8800/api/reports/${ReportID}`);
      toast.success("Report Deleted");
      router.push("/add-reports");
    } catch (e) {
      console.log(e);
    }
  };

  const updateEvent = (e: any, ReportID: number) => {
    e.preventDefault();
    router.push(`/update-reports/${ReportID}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ml-40">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Report ID
              </th>
              <th scope="col" className="px-6 py-3">
                Attendance
              </th>
              <th scope="col" className="px-6 py-3">
                Revenue
              </th>
              <th scope="col" className="px-6 py-3">
                Feedback
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
            {reports &&
              reports.map((report) => (
                <tr
                  key={report.ReportID}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 text-white">{report.ReportID}</td>
                  <td className="px-6 py-4">{report.Attendance}</td>
                  <td className="px-6 py-4">${report.Revenue}</td>
                  <td className="px-6 py-4">{report.Feedback}</td>
                  <td className="px-6 py-4">{report.EventID}</td>
                  {user && user.UserRole === "admin" && (
                    <td>
                      <div className="flex space-x-2 px-2">
                        <button
                          onClick={(e) => handleDelete(e, report.ReportID)}
                          className="bg-gray-500 text-white px-2 py-1 rounded-md hover:opacity-80"
                        >
                          Delete
                        </button>
                        <button
                          onClick={(e) => updateEvent(e, report.ReportID)}
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

export default ViewReport;
