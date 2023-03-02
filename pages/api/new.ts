import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("method: ", req.method);

  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: req.body,
    }
  );

  console.log({ res });

  res.status(200).json(response);
};

export default handler;
