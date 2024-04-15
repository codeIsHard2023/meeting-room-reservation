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

  // keep this date format on client side
  // const selectedDate = "2024-05-22";

  // keeping date transformation if need further :
  // const year = selectedDate.getFullYear();
  // const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
  // const day = String(selectedDate.getDate()).padStart(2, "0");
  // const date = `${year}-${month}-${day}`;
  try {
    const roomReservations = reservations.reservations.filter((reservation) => {
      return reservation.name === room && reservation.date === date;
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
const add = (req, res, next) => {
  // Here data comes from client
  const dataInsert = req.body;
  // Here dataDirectory contain the path of reservations.json
  const newDataPathFile = path.join(
    __dirname,
    "../database",
    "reservations.json"
  );

  // Here we read reservations.json
  fs.readFile(newDataPathFile, "utf-8", (readingErr, data) => {
    // If there is something wrong with reading this file we get en error
    if (readingErr) {
      console.error("Reading error from reservatoins.json file: ", readingErr);
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
};

module.exports = { testBrowse, read, readReservations, findReservations, add };
