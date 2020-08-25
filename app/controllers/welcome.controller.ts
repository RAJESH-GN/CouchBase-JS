import { Router, Request, Response } from "express";
const db = require("./../config.couchbase");
const router: Router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const result = await db.get(req.params.id);
    res.send(result);
  } catch (error) {
    console.log("error", error);
  }
  res.send("Hello, World!");
});

router.get("/:name", (req: Request, res: Response) => {
  let { name } = req.params;
  res.send(`Hello, ${name}`);
});

router.post("/postuser", async (req: Request, res: Response) => {
  const doc = {
    type: "user",
    name: req.body.name,
    id: getRandomInt(10),
  };
  try {
    const key = `${doc.type}_${doc.id}`;
    await db.upsert(key, doc);
  } catch (error) {
    console.error(error);
  }
});

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const WelcomeController: Router = router;
