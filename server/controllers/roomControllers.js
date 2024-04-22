const fs = require("fs");
const path = require("path");
const meetingRooms = require("../database/salles.json");
const reservations = require("../database/reservations.json");

// Controller test
const testBrowse = (req, res, next) => {
  try {
    res.json({ message: "hello from router controller" });
  } catch (err) {
    next(err);
  }
};

// Here we get data from salles.json
const read = (req, res, next) => {
  try {
    res.json(meetingRooms);
  } catch (err) {
    next(err);
  }
};

// Here we get data from reservations.json
const readReservations = (req, res, next) => {
  try {
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

// Here we get reservations for specific room and date
const findReservations = (req, res, next) => {
  const { room, date } = req.params;

  // Removing hours from date
  const dateObject = new Date(date);
  const formattedDateString = dateObject
    .toUTCString()
    .replace("UTC", "GMT")
    .replace(/ \(.*\)/, "");

  // Date formating in year-month-day
  const userDate = new Date(formattedDateString);
  const year = userDate.getFullYear();
  const month = String(userDate.getMonth() + 1).padStart(2, "0");
  const day = String(userDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  try {
    const roomReservations = reservations.reservations.filter((reservation) => {
      return (
        reservation.roomName === room && reservation.date === formattedDate
      );
    });

    if (roomReservations.length === 0) {
      res.status(404).json({ message: "Data not found" });
    } else {
      res.status(200).json(roomReservations);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Adding reservation into reservations.json
const create = (req, res, next) => {
  // Here data comes from client
  const dataInsert = req.body;

  // Here we check if all key has values
  let hasEmptyValue = false;
  for (const key in dataInsert) {
    if (
      dataInsert[key] === null ||
      dataInsert[key] === undefined ||
      dataInsert[key] === ""
    ) {
      hasEmptyValue = true;
      break;
    }
  }

  if (hasEmptyValue) {
    res.status(500).json({ eror: "Check inputs on client side" });
    console.error("Check inputs on client side");
  } else {
    const newDataPathFile = path.join(
      __dirname,
      "../database",
      "reservations.json"
    );

    // Here we read reservations.json
    fs.readFile(newDataPathFile, "utf-8", (readingErr, data) => {
      // If there is something wrong with reading this file we get en error
      if (readingErr) {
        console.error(
          "Reading error from reservatoins.json file: ",
          readingErr
        );
        return res
          .status(500)
          .json({ error: "Reading error from reservatoins.json file" });
      }

      // Here the block of code for adding new reservation into reservations.json
      try {
        // Here data of reservations.json are parsed
        const jsonData = JSON.parse(data);

        // Here new id created for a new reservation
        const newId = jsonData.reservations.length + 1;

        const newReservation = { id: newId, ...dataInsert };

        // Here we push new reservation
        jsonData.reservations.push(newReservation);

        // And here we write a new reservation into reservations.json
        fs.writeFile(
          newDataPathFile,
          JSON.stringify(jsonData, null, 2),
          (writeErr) => {
            // Show writing error
            if (writeErr) {
              console.error(
                "Reading error from reservatoins.json file: ",
                writeErr
              );
              return res
                .status(500)
                .json({ error: "Reading error from reservatoins.json file" });
            }

            // Show succes writing
            res.status(201).send({ message: "New reservation succeded" });
          }
        );
      } catch (err) {
        console.error("Data converting error:", err);
        res.status(500).json({ error: "Data converting error" });
        next(err);
      }
    });
  }
};

module.exports = {
  testBrowse,
  read,
  readReservations,
  findReservations,
  create,
};
