import { db } from "../db.js";

export const createReports = (req, res) => {
  const query =
    "INSERT INTO Reports (`Attendance`, `Revenue`, `Feedback`, `EventID`) VALUES (?)";
  const values = [
    req.body.Attendance,
    req.body.Revenue,
    req.body.Feedback,
    req.body.EventID,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Data has been added.");
  });
};

export const readReports = (req, res) => {
  const query = "SELECT * FROM Reports";
  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteReports = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM Reports WHERE ReportID = ?";
  db.query(query, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Data has been deleted.");
  });
};

export const updateReports = (req, res) => {
  const reportId = req.params.id;
  const query =
    "UPDATE Reports SET `Attendance` = ?, `Revenue` = ?, `Feedback` = ?  WHERE `ReportID` = ?";
  const values = [req.body.Attendance, req.body.Revenue, req.body.Feedback];
  db.query(query, [...values, reportId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Data has been updated.");
  });
};
