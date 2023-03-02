import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import axios from "axios";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// {
//   "file": "audio.mp3",
//   "model": "whisper-1"
// }

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Response> => {
  // const { model, language } = (await req.body) as {
  //   file?: string;
  //   model?: string;
  //   language?: string;
  // };

  // const payload = {
  //   model,

  //   language,
  // };

  // if (!file) {
  //   return new Response("No file in the request", { status: 400 });
  // }

  // const openai = new OpenAIApi(configuration);

  // const fileStream = fs.createReadStream(file);
  // const stats = fs.statSync(file);
  // const fileData = {
  //   name: file,
  //   size: stats.size,
  //   type: "audio/mp3",
  // };
  // const fileObj = new File([fileStream], fileData.name, {
  //   type: fileData.type,
  // });

  // const resp = await openai.createTranscription(fileObj, "whisper-1");

  // download file in folder

  console.log("data: ", req.body);

  res.json({ message: "Post req" });

  // const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
  //   },

  //   method: "POST",
  //   body: JSON.stringify(payload),
  // });

  // const { data } = await axios.post(
  //   "https://api.openai.com/v1/audio/transcriptions",
  //   req,
  //   {
  //     responseType: "stream",
  //     headers: {
  //       "Content-Type": "multipart/form-data", // which is multipart/form-data with boundary included
  //       Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
  //     },
  //   }
  // );

  // console.log("res data: ", { res });

  return new Response("Hello World");
};

export default handler;
