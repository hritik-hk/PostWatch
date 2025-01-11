import Redis from "ioredis";

const REDIS_PORT = process.env.REDIS_PORT || "6379";
const REDIS_PORT_INT = parseInt(REDIS_PORT);
const REDIS_HOST = process.env.REDIS_HOST;

const redisClient = new Redis({
  port: REDIS_PORT_INT,
  host: REDIS_HOST,
});

export default redisClient;
