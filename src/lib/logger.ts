import winston from "winston";

const isProduction = process.env.NODE_ENV === "production";
const isUAT = process.env.NEXT_ENV === "uat";

const loggerTransports: winston.transport[] = [
  // Console logs
  new winston.transports.Console({
    format: winston.format.combine(
      ...(isProduction || isUAT ? [] : [winston.format.colorize()]),
      winston.format.timestamp(),
      winston.format.simple()
    ),
  }),
];

// File logging only when NOT production AND NOT UAT
if (!isProduction && !isUAT) {
  loggerTransports.push(
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    new winston.transports.File({
      filename: "logs/combined.log",
      level: "info",
    })
  );
}

const logger = winston.createLogger({
  level: isProduction || isUAT ? "info" : "debug",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),

  transports: loggerTransports,
});

export default logger;