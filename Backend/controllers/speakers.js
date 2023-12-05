import { db } from "../db.js";

export const createSpeakers = (req, res) => {
  const query =
    "INSERT INTO Speakers (`SpeakerName`, `SpeakerAvailability`, `EventID`) VALUES (?)";
  const values = [
    req.body.SpeakerName,
    req.body.SpeakerAvailability,
    req.body.EventID,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Data added.");
  });
};

export const readSpeakers = (req, res) => {
  const query = "SELECT * FROM Speakers";
  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const updateSpeakers = (req, res) => {
  const SpeakerId = req.params.id;
  const query =
    "UPDATE Speakers SET `SpeakerName` = ?, `SpeakerAvailability` = ? WHERE `SpeakerID` = ?";
  const values = [req.body.SpeakerName, req.body.SpeakerAvailability];
  db.query(query, [...values, SpeakerId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Data updated.");
  });
};

export const deleteSpeakers = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM Speakers WHERE SpeakerID = ?";
  db.query(query, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Data has been deleted.");
  });
};
