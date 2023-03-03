import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("method: ", req.method);

  let data = new FormData();

  data = req.body;

  console.log("req: ", req.body);

  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: data,
    }
  );

  console.log({ res });

  res.status(200).json(response);
};

export default handler;
