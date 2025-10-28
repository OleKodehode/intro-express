const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const logEvents = async (msg, logName) => {
  const dateTime = `${format(new Date(), "dd/MM [yyyy] @ HH:mm:ss")}`;
  const logEvent = `Time: ${dateTime} | EventID: ${uuid()}\n${msg}\n`;
  console.log(logEvent);

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName || "eventLog.txt"),
      logEvent
    );
  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  logEvents(
    `Request method: ${req.method}\t headers origin: ${req.headers.origin}\t${req.url}`,
    "reqLog.txt"
  );
  if (process.env.NODE_ENV === "development") {
    console.log(`Request Method: ${req.method}, Request Path: ${req.path}`);
  }
  next();
};

module.exports = { logger, logEvents };
