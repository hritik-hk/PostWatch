import { getAllProperties } from "../utils/common.js";
import { createLogger, format, transports } from "winston";

const options = {
  console: {
    level: "debug",
    handleExceptions: true,
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.colorize({ level: true, message: true }),
      format.printf((info) => {
        const { level, message, timestamp, ...rest } = info;
        //to include non-enumerable properties like error message and stack too
        const logData = getAllProperties(rest);

        if (info.error instanceof Error) {
          // @ts-ignore
          logData.error = {
            message: info.error.message,
            stack: info.error.stack,
          };
        }
        return `${timestamp} [${level}]: ${message} ${
          Object.keys(logData).length === 0
            ? ""
            : JSON.stringify(logData, null, 1)
        }`;
      })
    ),
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  transports: [new transports.Console(options.console)],
  exitOnError: false,
});

const stream = {
  write: function (message: string) {
    const statusMatch = message.match(/\[STATUS:(\d{3})\]/);
    if (statusMatch && statusMatch[1]) {
      const statusCode = parseInt(statusMatch[1], 10);

      // Log based on status code
      if (statusCode >= 500) {
        logger.error(message);
      } else if (statusCode >= 400) {
        logger.warn(message);
      } else {
        logger.info(message);
      }
    } else {
      logger.info(message);
    }
  },
};

export { logger, stream };