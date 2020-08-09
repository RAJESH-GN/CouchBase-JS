// Import only what we need from express
import { Router, Request, Response } from "express";
const db = require("./../config.couchbase");
// Assign router to the express.Router() instance
const router: Router = Router();

// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get("/", async (req: Request, res: Response) => {
  // Reply with a hello world when no name param is provided
  const airline = {
    type: "sample",
    id: 8091,
    callsign: "CBS",
    iata: null,
    icao: null,
    name: "Couchbase",
  };

  const upsertDocument = async (doc: {
    type: any;
    id: any;
    callsign?: string;
    iata?: null;
    icao?: null;
    name?: string;
  }) => {
    try {
      // key will equal: "airline_8091"
      const key = `${doc.type}_${doc.id}`;
      const result = await db.upsert(key, doc);
      console.log("Upsert Result: ");
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  await upsertDocument(airline);
  res.send("Hello, World!");
});
router.get("/:name", (req: Request, res: Response) => {
  // Extract the name from the request parameters
  let { name } = req.params;
  // Greet the given name
  res.send(`Hello, ${name}`);
});
// Export the express.Router() instance to be used by server.ts
export const WelcomeController: Router = router;
