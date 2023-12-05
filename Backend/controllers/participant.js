import { db } from "../db.js";

export const createParticipant = (req, res) => {
  const query =
    "INSERT INTO Participants (`ParticipantName`, `ParticipantEmail`) VALUES (?)";
  const values = [req.body.ParticipantName, req.body.ParticipantEmail];

  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Data has been added.");
  });
};

export const readParticipants = (req, res) => {
  const query = "SELECT * FROM Participants";
  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const updateParticipants = (req, res) => {
  const partId = req.params.id;
  const query =
    "UPDATE Participants SET `ParticipantName` = ?, `ParticipantEmail` = ? WHERE `ParticipantID` = ?";
  const values = [req.body.ParticipantName, req.body.ParticipantEmail];
  db.query(query, [...values, partId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Data has been updated.");
  });
};

export const deleteParticipants = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM Participants WHERE `ParticipantID` = ?";
  db.query(query, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Data has been deleted.");
  });
};
