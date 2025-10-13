const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const logEvents = async (msg) => {
  const dateTime = `${format(new Date(), "dd/MM [yyyy] @ HH:mm:ss")}`;
  const logEvent = `Time: ${dateTime} | EventID: ${uuid()}\n${msg}\n`;
  console.log(logEvent);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logEvent
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = logEvents;
