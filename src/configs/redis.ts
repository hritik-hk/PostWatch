import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL;

const redis = new Redis({
  port: 6379,
  host: "localhost",
});

export default redis;
