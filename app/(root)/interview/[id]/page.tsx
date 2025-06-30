import Image from "next/image";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-dark-200 border border-white/10 rounded-xl p-6 shadow-md">
          {/* Left section: Image, Role, and Tech Stack */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
            <div className="flex items-center gap-4">
              <Image
                src={getRandomInterviewCover()}
                alt="cover-image"
                width={50}
                height={50}
                className="rounded-full object-cover size-[50px] border border-white/20"
              />
              <h3 className="text-xl font-semibold capitalize text-primary-200">
                {interview.role} Interview
              </h3>
            </div>

            {/* Tech icons */}
            <div className="sm:ml-auto">
              <DisplayTechIcons techStack={interview.techstack} />
            </div>
          </div>

          {/* Right section: Type badge */}
          <div className="self-start sm:self-center">
            <span className="px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-primary text-white capitalize">
              {interview.type}
            </span>
          </div>
        </div>
      </div>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
      <Footer />
    </>
  );
};

export default InterviewDetails;
