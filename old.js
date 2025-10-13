// const https = require("http");

// https
//   .createServer((req, res) => {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.end("Hello World");
//   })
//   .listen(8080);

const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "starter.txt"),
      "utf8"
    );
    console.log(data);

    await fsPromises.unlink(path.join(__dirname, "starter.txt"));

    await fsPromises.writeFile(
      path.join(__dirname, "Promises-write.txt"),
      data
    );

    await fsPromises.appendFile(
      path.join(__dirname, "Promises-write.txt"),
      "This was appended using promises."
    );

    await fsPromises.rename(
      path.join(__dirname, "Promises-write.txt"),
      path.join(__dirname, "NewName.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "NewName.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

// fs.readFile(path.join(__dirname, "starter.txt"), "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data); // prints out a buffer of hexcodes
// });

// fs.writeFile(path.join(__dirname, "Greeting.txt"), "Hi there, Hello", (err) => {
//   if (err) throw err;
//   console.log("Done writing the file");
// });

// fs.writeFile(
//   path.join(__dirname, "Appended.txt"),
//   "This file is getting updated with new lines of append",
//   (err) => {
//     if (err) throw err;
//     console.log("appending done");
//   }
// );

process.on("uncaughtException", (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception - ${err}\n
    Exception origin: ${origin}`
  );
});

fileOps();
