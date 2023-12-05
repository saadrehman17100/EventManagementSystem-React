use event;

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(100),
    UserEmail VARCHAR(100) unique,
    UserRole VARCHAR(50),
    UserPassword VARCHAR(50) unique
);

select * from users;
select * from events;
CREATE TABLE Events (
    EventID INT AUTO_INCREMENT PRIMARY KEY,
    EventName VARCHAR(100),
    EventDetails VARCHAR(255),
    EventDate DATE,
    EventTime TIME,
    EventLocation VARCHAR(100),
    EventDescription VARCHAR(255),
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);
-- Step 1: Find the name of the existing foreign key constraint
SELECT constraint_name
FROM information_schema.key_column_usage
WHERE table_name = 'Events' AND column_name = 'UserID';
ALTER TABLE Events
DROP FOREIGN KEY events_ibfk_1;

ALTER TABLE Events
ADD FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE;

CREATE TABLE Participants (
    ParticipantID INT AUTO_INCREMENT PRIMARY KEY,
    ParticipantName VARCHAR(100),
    ParticipantEmail VARCHAR(100)
);

CREATE TABLE EventParticipants (
    EventID INT,
    UserID INT,
    PRIMARY KEY (EventID, UserID),
    FOREIGN KEY (EventID) REFERENCES Events(EventID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE ON UPDATE CASCADE
);
drop table EventParticipants;
select * from events;
select * from users;

select * from EventParticipants;

CREATE TABLE Schedules (
    ScheduleID INT AUTO_INCREMENT PRIMARY KEY,
    SessionDetails VARCHAR(255),
    SpeakerID INT,
    ActivityDetails VARCHAR(255),
    EventID INT,
    FOREIGN KEY (EventID) REFERENCES Events(EventID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Speakers (
    SpeakerID INT AUTO_INCREMENT PRIMARY KEY,
    SpeakerName VARCHAR(100),
    SpeakerAvailability VARCHAR(50),
    EventID INT,
    FOREIGN KEY (EventID) REFERENCES Events(EventID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Reports (
    ReportID INT AUTO_INCREMENT PRIMARY KEY,
    Attendance INT,
    Revenue DECIMAL(10, 2),
    Feedback VARCHAR(255),
    EventID INT,
    FOREIGN KEY (EventID) REFERENCES Events(EventID) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE Users;
DROP TABLE Events;
DROP TABLE participants;
DROP TABLE EventParticipants;
DROP TABLE Schedules;
DROP TABLE Speakers;
DROP TABLE reports;



insert into Users values (1, 'Saad', 'saad@gmail.com', 'user', '1234');
insert into Users values (2, 'Ruhama', 'subhan@gmail.com', 'user', '2345');
insert into Users values (3, 'admin', 'admin@admin.com', 'admin', 'admin123');
insert into Users values (5, 'Ali', 'ali@gmail.com', 'user', '8888');
insert into Users values (6, 'Ahmed', 'ahmed@gmail.com', 'user', '9999');
insert into participants values (1, 'Subhan', 'subhan@gmail.com');
insert into Events values (1, 'Hello' , 'Good Event', '2023-11-29', '14:30:00', 'Gulshan', 'bad event', 1);
update reports set Feedback = "bad" where ReportID = 6;
select * from Users;
select * from participants;
select * from events;
select * from reports;
select * from speakers;
select * from schedules;
DELETE FROM eventparticipants WHERE EventID = 8;
DELETE FROM Reports WHERE EventID = 8;
DELETE FROM Speakers WHERE EventID = 8;
DELETE FROM Schedules WHERE EventID = 8;
DELETE FROM Events where EventID = 8;
DELETE FROM Participants WHERE ParticipantID = 7;
DELETE FROM Speakers WHERE SpeakerID = 3;
select * from Participants;

select * from events;
select * from speakers;
select * from schedules;
SELECT *
FROM events e
JOIN speakers s ON e.EventID = s.EventID
JOIN schedules sc ON e.EventID = sc.EventID;

delete from users where 1 = 1;
insert into users values (2, 'admin', 'admin@admin.com', 'admin' ,'admin123');
select * from users where UserEmail = 'admin@admin.com' and UserPassword = 'admin123';
select * from users;

-- Sample data for the Events table
INSERT INTO Events (EventName, EventDetails, EventDate, EventTime, EventLocation, EventDescription, UserID)
VALUES
    (4, 'Details 4', '2023-12-04', '18:00:00', 'Location 4', 'Description 4', 1),
    (5, 'Details 5', '2023-12-05', '11:30:00', 'Location 5', 'Description 5', 1),
    (6, 'Details 6', '2023-12-06', '17:15:00', 'Location 6', 'Description 6', 1),
    (7, 'Details 7', '2023-12-07', '13:20:00', 'Location 7', 'Description 7', 1),
    (8, 'Details 8', '2023-12-08', '16:45:00', 'Location 8', 'Description 8', 1),
    (9, 'Details 9', '2023-12-09', '10:00:00', 'Location 9', 'Description 9', 1),
    (10, 'Details 10', '2023-12-10', '14:30:00', 'Location 10', 'Description 10', 1);
-- Sample data for the Participants table
INSERT INTO Participants (ParticipantName, ParticipantEmail)
VALUES
    ('Participant 1', 'participant1@example.com'),
    ('Participant 2', 'participant2@example.com'),
    ('Participant 3', 'participant3@example.com'),
    ('Participant 4', 'participant4@example.com'),
    ('Participant 5', 'participant5@example.com'),
    ('Participant 6', 'participant6@example.com'),
    ('Participant 7', 'participant7@example.com'),
    ('Participant 8', 'participant8@example.com'),
    ('Participant 9', 'participant9@example.com'),
    ('Participant 10', 'participant10@example.com');
-- Sample data for the Schedules table with EventID values 21, 31, 33, 34, 35
INSERT INTO Schedules (SessionDetails, SpeakerID, ActivityDetails, EventID)
VALUES
    ('Session 1', 1, 'Activity 1', 1),
    ('Session 2', 2, 'Activity 2', 2),
    ('Session 3', 3, 'Activity 3', 3),
    ('Session 4', 4, 'Activity 4', 4),
    ('Session 5', 5, 'Activity 5', 5);

-- Sample data for the Speakers table with EventID values 21, 31, 33, 34, 35
INSERT INTO Speakers (SpeakerName, SpeakerAvailability, EventID)
VALUES
    ('Speaker 1', 'Available', 1),
    ('Speaker 2', 'Available', 2),
    ('Speaker 3', 'Available', 3),
    ('Speaker 4', 'Available', 4),
    ('Speaker 5', 'Available', 5);
-- Sample data for the Reports table with EventID values 21, 31, 33, 34, 35
INSERT INTO Reports (Attendance, Revenue, Feedback, EventID)
VALUES
    (100, 5000.00, 'Good event', 1),
    (150, 7500.50, 'Excellent event', 2),
    (80, 3000.75, 'Average event', 3),
    (120, 6000.25, 'Well-organized event', 4),
    (200, 9000.99, 'Amazing event', 5);
    

INSERT INTO Events (EventName, EventDetails, EventDate, EventTime, EventLocation, EventDescription, UserID) VALUES (1, 'Details 1', '2023-12-01', '14:00:00', 'Location 1', 'Description 1', 1);
select * from events;	
select * from EventParticipants;