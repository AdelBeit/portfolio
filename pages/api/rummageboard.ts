import type {NextApiRequest, NextApiResponse} from "next";

const entries: unknown[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({entries});
  }

  if (req.method === "POST") {
    entries.unshift(req.body);
    return res.status(201).json({ok: true});
  }

  return res.status(405).json({error: "Method not allowed"});
}
