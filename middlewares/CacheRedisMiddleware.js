const redis = require('redis');

//create a client
const redisClient = redis.createClient();

redisClient.on('error', (err) => console.log(`Error: ${err}`));

//connect the client
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis is connected');
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

//check whether the key is present or not
const checkCache = async (key) => {
  try {
    const cacheReuslt = await redisClient.get(key);
    if (cacheReuslt) {
      return JSON.parse(cacheReuslt);
    }
    return null;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};

//this is used to set the cache in the redis
const setCache = async (key, value) => {
  try {
    await redisClient.set(key, JSON.stringify(value));
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};

module.exports = {
  redisClient,
  connectRedis,
  setCache,
  checkCache,
};
