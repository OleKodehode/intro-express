const PORT = process.env.PORT || 3500;

// Third Party
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// First Party/Middleware
const { logger } = require("./middleware/logEvents.js");
const errorHandler = require("./middleware/errorHandler.js");
const corsOptions = require("./config/corsOptions.js");
const verifyJWT = require("./middleware/verifyJWT.js");
const db = require("./database/database.js");

const app = express();

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser);
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors(corsOptions));

// Routes
//public
app.use("/", require("./routes/root.js"));
app.use("/register", require("./routes/register.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/refresh", require("./routes/refresh.js"));
app.use("/logout", require("./routes/logout.js"));

// app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees.js"));
app.use("/chat", require("./routes/chat.js"));
app.use("/projects", require("./routes/projects.js"));
app.use("/skills", require("./routes/employeeSkills.js"));

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

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("WebSocket connected - ", socket.id);

  socket.on("chatMessage", (msg) => {
    const user = socket.user?.userName || "Anonymous";
    console.log("Message Recieved: ", msg);
    io.emit("chatMessage", { user, message: msg });
  });

  socket.on("sendNotification", (msg) => {
    io.emit("notification", msg);
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected.");
  });
});

server.listen(PORT, () =>
  console.log(`Server running on port ${PORT} \t - \t http://localhost:${PORT}`)
);

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
