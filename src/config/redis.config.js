import { createClient } from "redis";

const redis = createClient();
redis.on("error", (err) => console.log("Redis error", err));
await redis.connect();
export default redis;
