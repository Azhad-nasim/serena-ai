import InterviewForm from "@/components/InterviewForm";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-6 mt-[10rem]">
        <h3 className="text-4xl sm:text-5xl font-extrabold  bg-clip-text  animate-fadeIn drop-shadow-[0_1px_2px_rgba(186,104,200,0.6)] mb-6 text-center">
          🚀 Interview Generation
        </h3>

        <InterviewForm userId={user?.id!} />
      </div>

      <Footer />
    </>
  );
};

export default Page;
