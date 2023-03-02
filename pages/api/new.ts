import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("method: ", req.method);
  if (req.method !== "POST") {
    return new Response("hiiiiii", { status: 404, statusText: "Not Found" });
  }

  try {
    const json = await req.body;
    console.log({ json });

    return new Response("hi", { status: 200 });
  } catch (e) {
    console.log("error:  ", e);
    return new Response("error", { status: 400, statusText: "Bad Request" });
  }
};

export default handler;
