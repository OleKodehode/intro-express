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

exports.module = corsOptions;
