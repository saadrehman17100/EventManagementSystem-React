import express from "express";
import cors from "cors";
import eventRoutes from "./routes/events.js";
import participantRoutes from "./routes/participant.js";
import reportsRoutes from "./routes/reports.js";
import speakerRoutes from "./routes/speakers.js";
import scheduleRoutes from "./routes/schedule.js";
import userRoutes from "./routes/users.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use("/api/events", eventRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/speakers", speakerRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/users", userRoutes);

app.listen(8800, () => {
  console.log("Server started.");
});
