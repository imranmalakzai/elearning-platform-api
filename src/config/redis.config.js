import { createClient } from "redis";

const redis = createClient({
  url: "redis://127.0.0.1:6379",
});

redis.on("connect", () => {
  console.log("Redis conected successfully");
});

redis.on("error", (err) => {
  console.log("Redis Error");
});

await redis.connect();
export default redis;
