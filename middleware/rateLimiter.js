const rateLimit = require("express-rate-limiter");

const limiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 100,
  message: "You've exceeded the limit. Calm down!",
});

module.exports = limiter;
