import type {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET" || req.method === "POST") {
    res.status(200).send("works");
    return;
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end();
}
