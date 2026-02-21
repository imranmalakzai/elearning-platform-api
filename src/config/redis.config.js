import { createClient } from "redis";
import * as env from "./env.config.js";

const redis = createClient({
  url: env.REDIS_CLIENT_URL,
});

redis.on("connect", () => {
  console.log("Redis conected successfully");
});

redis.on("error", (err) => {
  console.log("Redis Error");
});

await redis.connect();
export default redis;
