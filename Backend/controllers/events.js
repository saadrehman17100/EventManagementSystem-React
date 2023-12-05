import { db } from "../db.js";

export const createEvent = (req, res) => {
  const query =
    "INSERT INTO Events(`EventName`, `EventDetails`, `EventDate`, `EventTime`, `EventLocation`, `EventDescription`, `UserID`) VALUES (?)";
  const values = [
    req.body.EventName,
    req.body.EventDetails,
    req.body.EventDate,
    req.body.EventTime,
    req.body.EventLocation,
    req.body.EventDescription,
    req.body.UserID,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Data has been added.");
  });
};
export const viewEvent = (req, res) => {
  const query = "select * from events";
  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const readEvent = (req, res) => {
  const query =
    "select * from events e Join speakers s on e.EventID = s.EventID JOIN schedules sc ON sc.EventID = e.EventID";
  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const updateEvent = (req, res) => {
  const eventId = req.params.id;
  const query =
    "UPDATE Events SET `EventName`= ?, `EventDetails` = ?, `EventTime` = ?, `EventLocation` = ?, `EventDescription` = ? WHERE `EventID` = ?";
  const values = [
    req.body.EventName,
    req.body.EventDetails,
    req.body.EventTime,
    req.body.EventLocation,
    req.body.EventDescription,
  ];

  db.query(query, [...values, eventId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been updated.");
  });
};

export const deleteEvent = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM Events WHERE `EventID` = ?";
  db.query(query, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Event has been deleted.");
  });
};

export const register = (req, res) => {
  const query = "INSERT INTO EventParticipants(`EventID`, `UserID`) VALUES (?)";
  const values = [req.body.EventID, req.body.UserID];
  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Participant has been added in Event.");
  });
};
