import Redis from "ioredis";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();  
  
// Ensure UPSTASH_REDIS_URL is set in your .env file
if (!process.env.UPSTASH_REDIS_URL) {
  throw new Error("UPSTASH_REDIS_URL is not set in the environment variables.");
}

// Create a new Redis client using the environment variable
export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

// Test connection and handle errors

let hasLogged = false;

redis.on("connect", () => {
  if(!hasLogged){
      console.log("Connected to Redis successfully!"); 
      hasLogged = true;
  }
     
});
 
redis.on("error", (error) => {
  console.error("Redis connection error:", error);
});

// Example usage: Set a key-value pair in Redis
const setData = async () => {
  try {
    await redis.set("foo", "bar");
    const value = await redis.get("foo");
    console.log(`The value of 'foo' is: ${value}`);
  } catch (error) {
    console.error("Error setting or getting data from Redis:", error);
  }
};

// Call the example function
setData();

// Always close the Redis connection when your app is done
process.on("SIGINT", () => {
  redis.quit().then(() => {
    console.log("Redis connection closed.");
    process.exit();
  });
});
