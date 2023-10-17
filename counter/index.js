import { createClient } from 'redis';
import http from 'http';

const redisClient = createClient({ url: process.env.REDIS_URL });
const COUNTER_KEY = 'a-class-infra:counter';
const PORT = process.env.PORT || 3001;

async function main() {
  await redisClient.connect();

  console.log('Connected to Redis');

  http
    .createServer(async (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });

      const count = await redisClient.incr(COUNTER_KEY);

      console.log(`Count: ${count}`);

      res.end(`Hello World! I have been seen ${count} times.\n`);
    })
    .listen(PORT);

  console.log(`Listening on port: ${PORT}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
