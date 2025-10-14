const PORT = process.env.PORT || 3500;

// Third Party
const path = require("path");
const express = require("express");
const cors = require("cors");

// First Party/Middleware
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(logger);
app.use(errorHandler);

const whitelist = ["https://127.0.0.1:5500", "http://localhost:3500"]; // Remove Localhost entries before deployment
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS."));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root.js"));
app.use("/employees", require("./routes/api/employees"));

app.get(/\/*/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 -  JSON not found" });
  } else if (req.accepts("txt")) {
    res.type({ error: "404 - Text not found" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
