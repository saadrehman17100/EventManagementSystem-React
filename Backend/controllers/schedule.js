import { db } from "../db.js";

export const createSchedule = (req, res) => {
  const query =
    "INSERT INTO Schedules (`SessionDetails`, `SpeakerID`, `ActivityDetails`, `EventID`) VALUES (?)";
  const values = [
    req.body.SessionDetails,
    req.body.SpeakerID,
    req.body.ActivityDetails,
    req.body.EventID,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Schedule has been added.");
  });
};

export const readSchedules = (req, res) => {
  const query = "SELECT * FROM Schedules";
  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteSchedules = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM Schedules WHERE ScheduleID = ?";
  db.query(query, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Schedule has been deleted.");
  });
};

export const updateSchedules = (req, res) => {
  const scheduleId = req.params.id;
  const query =
    "UPDATE Schedules SET `SessionDetails` = ?, `SpeakerID` = ?, `ActivityDetails` = ? WHERE `ScheduleID` = ?";

  const values = [
    req.body.SessionDetails,
    req.body.SpeakerID,
    req.body.ActivityDetails,
  ];

  db.query(query, [...values, scheduleId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Data has been updated.");
  });
};
