import Link from "next/link";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="flex-1">
        <HeroSection />
      </section>

      {/* Main Content Container */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16 lg:space-y-20">
        {/* Your Interviews Section */}
        <section className="space-y-6 sm:space-y-8">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Your Interviews
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Review your completed interview sessions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
            {hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <div key={interview.id} className="p-2">
                  {" "}
                  {/* optional extra spacing */}
                  <InterviewCard
                    userId={user?.id}
                    interviewId={interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    createdAt={interview.createdAt}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="text-center py-12 sm:py-16 lg:py-20">
                  <div className="mx-auto max-w-md">
                    <div className="mx-auto h-12 w-12 text-muted-foreground/50">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-muted-foreground">
                      No interviews yet
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You haven&apos;t taken any interviews yet. Start
                      practicing to see your progress here.
                    </p>
                    <Button asChild className="mt-6">
                      <Link href="/interview">Start Your First Interview</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Available Interviews Section */}
        <section className="space-y-6 sm:space-y-8">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Available Interviews
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Choose from our curated interview sessions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
            {hasUpcomingInterviews ? (
              allInterview?.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))
            ) : (
              <div className="col-span-full">
                <div className="text-center py-12 sm:py-16 lg:py-20">
                  <div className="mx-auto max-w-md">
                    <div className="mx-auto h-12 w-12 text-muted-foreground/50">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-muted-foreground">
                      No interviews available
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      There are no interviews available at the moment. Check
                      back later for new opportunities.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
