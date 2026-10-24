import ExamSection from "@/components/ExamSection";
import HeroSection from "@/components/HeroSection";
import Job from "@/components/Job";
import StateCompo from "@/components/StateCompo";
import TopArticles from "@/components/TopArticles";
import TopNotes from "@/components/TopNotes";
import TopPaper from "@/components/TopPaper";
import YearComp from "@/components/YearComp";
import Image from "next/image";

export default function Home() {
  return (
  
<div className="">
<HeroSection />
<YearComp />
<StateCompo />

<TopPaper />
<ExamSection />
<TopArticles />
<TopNotes />

{/* <Job /> */}
{/* <div className="h-screen">

</div> */}

</div>

  );
}
