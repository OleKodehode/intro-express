const PORT = process.env.PORT || 3500;

// Third Party
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

// First Party/Middleware
const { logger } = require("./middleware/logEvents.js");
const errorHandler = require("./middleware/errorHandler.js");
const corsOptions = require("./config/corsOptions.js");
const verifyJWT = require("./middleware/verifyJWT.js");

const db = require("./database/database.js");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(logger);
app.use(errorHandler);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser);

// Routes
app.use("/", require("./routes/root.js"));
app.use("/register", require("./routes/register.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/refresh", require("./routes/refresh.js"));
app.use("/logout", require("./routes/logout.js"));

// app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees.js"));

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

io.on("connection", (socket) => {
  console.log("WebSocket connected - ", socket.id);

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected.");
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("SIGINT", () => {
  try {
    db.close();
    console.log("Database Closed.");
  } catch (err) {
    console.error("Failed to close the Database: ", err.message);
  } finally {
    process.exit(0);
  }
});
