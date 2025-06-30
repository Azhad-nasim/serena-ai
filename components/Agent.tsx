"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [randomIndex, setRandomIndex] = useState<number>(1);

  useEffect(() => {
    const index = Math.floor(Math.random() * 3) + 1;
    setRandomIndex(index);
  }, []);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-5xl mx-auto py-10">
        {/* AI Interviewer Card */}
        <div className="call-view flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-5xl mx-auto py-10">
          {/* AI Interviewer Card */}
          <div className="w-full sm:w-1/2 bg-gradient-to-b from-blue-900/30 to-purple-900/20 border border-white/10 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <div className="relative size-[180px] rounded-full overflow-hidden border-4 border-white/20">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain rounded-full"
                  src="/loader.mp4"
                />
                {isSpeaking && (
                  <span className="animate-speak absolute inset-0 rounded-full bg-primary-200/30 animate-ping z-10" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-primary-100">
                AI Interviewer
              </h3>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="w-full sm:w-1/2 bg-gradient-to-b from-blue-900/30 to-purple-900/20 border border-white/10 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <div className="relative size-[180px] rounded-full overflow-hidden border-4 border-white/20">
                <Image
                  src={`/random-users/${randomIndex}.png`}
                  alt="User Profile"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-lg font-semibold text-primary-100">
                {userName}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Message */}
      {messages.length > 0 && (
        <div className="transcript-border w-full max-w-3xl mx-auto mb-10">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100 text-white text-center text-lg"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      {/* Call Button */}
      <div className="w-full flex justify-center mb-8 ">
        {callStatus !== "ACTIVE" ? (
          <button
            className="relative btn-call px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
            onClick={() => handleCall()}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75 inset-0",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />
            <span className="relative z-10">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Start Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button
            className="btn-disconnect px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
            onClick={() => handleDisconnect()}
          >
            End Call
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
