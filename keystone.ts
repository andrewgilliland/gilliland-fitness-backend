import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/gilliland-fitness";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long should users stay signed in?
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: "mongoose",
    url: databaseURL,
    // TODO: Add data seeding here
  },
  lists: createSchema({
    // SChema items go in here
  }),
  ui: {
    // TODO: change this for roles
    isAccessAllowed: () => true,
  },
  // TODO: Add session values here
});
