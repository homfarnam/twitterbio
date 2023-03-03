import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Header from "../components/Header";
import Github from "../components/GitHub";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

interface AudioProps {}

type Props = {
  text: string;
  delay: number;
};

const TextWriter = ({ text, delay }: Props) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentChar = text.charAt(index);
      const nextChar = text.charAt(index + 1);
      setDisplayText((prevDisplayText) => {
        if (currentChar === "." && nextChar !== " ") {
          return prevDisplayText + currentChar + " ";
        }
        return prevDisplayText + currentChar;
      });
      setIndex((prevIndex) => prevIndex + 1);
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay, index]);

  return <div>{displayText}</div>;
};

const Audio = ({}: AudioProps) => {
  const [audioFile, setAudioFile] = useState<string | ArrayBuffer | any>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [formDataHeaders, setFormDataHeaders] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [convertedText, setConvertedText] = useState<string>("");

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAudioFile(file);

      const data = new FormData();
      data.append("file", file);
      data.append("model", "whisper-1");
      data.append("language", "en");
      data.append("temperature", "1");
      console.log({ data });
      setFormData(data);

      // check if the file is an audio file and the size is less than 25MB
      if (!file.type.match("audio.*") || file.size > 25 * 1024 * 1024) {
        toast.error("Please upload an audio file less than 25MB");
        return;
      }
    }
  };

  const sendAudio = async () => {
    setLoading(true);
    // const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    //   headers: {
    //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? ""}`,
    //   },
    //   method: "POST",
    //   body: formData,
    // });

    const res = await fetch("/api/new", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    // const response = await fetch("/api/new", {
    //   method: "POST",

    //   body: formData,
    // });

    setConvertedText(data.text);

    console.log({ data });
  };

  useEffect(() => {
    if (audioFile) {
      console.log({ formData, audioFile });
      console.log(formData?.getAll("file"));
    }
  }, [audioFile, formData]);

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Audio to text</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/Nutlope/twitterbio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          Convert audio to text
        </h1>
        <div className="max-w-xl w-full">
          <input
            type="file"
            className="border-2 border-black outline-none rounded-xl px-4 py-2 w-full mt-10"
            onChange={handleFile}
            accept="audio/*"
          />

          {/* <button
            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
            onClick={sendAudio}
          >
            Send Audio &rarr;
          </button> */}

          {/* <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div> */}

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={sendAudio}
            >
              Send Audio &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>

        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />

        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {convertedText && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Your transcribed Text
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    {/* <div
                    className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                    onClick={() => {
                      navigator.clipboard.writeText(convertedText);
                      toast("Bio copied to clipboard", {
                        icon: "✂️",
                      });
                    }}
                    key={convertedText}
                  >
                    <p>{convertedText}</p>
                  </div> */}
                    <TextWriter text={convertedText} delay={10} />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Audio;
