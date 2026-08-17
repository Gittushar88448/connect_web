import winston from "winston";

const isProduction:boolean = process.env.NEXT_ENV === "production";
const isUAT:boolean = process.env.NEXT_ENV === "uat";

const logger = winston.createLogger({
  level: isProduction || isUAT ? "info" : "debug",
  
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),

  transports: [
    // Console logs
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple()
      ),
    }),

    // Error logs
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // All logs
    new winston.transports.File({
      filename: "logs/combined.log",
      level: "info",
    }),
  ],
});

export default logger;