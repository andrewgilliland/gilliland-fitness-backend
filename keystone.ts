import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
import { User } from "./schemas/User";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/gilliland-fitness";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long should users stay signed in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    // TODO: Add in initial roles here
  },
});

export default withAuth(
  config({
    // @ts-ignore
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
      User,
    }),
    ui: {
      // Show the UI only for people who pass this test
      isAccessAllowed: ({ session }) => {
        return !!session?.data;
      },
    },
    // TODO: Add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: "id",
    }),
  })
);
