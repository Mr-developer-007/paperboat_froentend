import React from 'react';
import { 
  GraduationCap, 
  Target, 
  BookOpen, 
  Compass, 
  FileText, 
  Award, 
  Users,
  Search
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <GraduationCap size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Navigate Your Exams with <span className="text-blue-600">Confidence</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
            Welcome to PaperBoat, your ultimate destination for previous year question papers. We help aspirants steer through the sea of competitive exams with exactly what they need to succeed.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
            <Target size={16} />
            <span>Our Mission</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why We Built PaperBoat</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Preparing for competitive exams is daunting enough without having to endlessly search for authentic past papers. We realized that students were wasting hundreds of hours just trying to find reliable study materials.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            PaperBoat was created to solve this. We act as your vessel, cutting through the noise to bring you organized, high-quality, and easily accessible previous year question papers. Because we believe that analyzing the past is the best way to conquer your future.
          </p>
        </div>
        <div className="order-1 md:order-2 relative h-80 md:h-[400px] rounded-3xl bg-blue-50 overflow-hidden flex items-center justify-center border border-blue-100 shadow-inner">
          <Compass size={140} className="text-blue-100 absolute -top-10 -right-10" />
          <FileText size={100} className="text-blue-500 relative z-10 drop-shadow-sm" />
        </div>
      </section>

      {/* What You'll Find Section */}
      <section className="bg-slate-50 py-20 px-6 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything You Need to Prepare</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              We provide a comprehensive, organized archive designed specifically to optimize your study sessions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Extensive Archives</h3>
              <p className="text-slate-600">
                Access years of authentic previous question papers (PYQs) across major competitive exams, all in one place.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Easy Navigation</h3>
              <p className="text-slate-600">
                Search by exam name, year, or subject. Our platform is designed to get you the paper you need in seconds.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">High Quality Format</h3>
              <p className="text-slate-600">
                Download clear, readable, and properly formatted PDFs so you can practice under real exam conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <BookOpen size={48} className="mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Anchor Your Success?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Don't let past papers be the missing piece in your preparation strategy. Join thousands of aspirants already using PaperBoat.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg transform hover:-translate-y-0.5">
            Browse Papers Now
          </button>
        </div>
      </section>

    </div>
  );
}