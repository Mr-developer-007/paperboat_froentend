"use client"

import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Mail, 
  MessageSquare,
  BookMarked
} from 'lucide-react';

// Educational FAQ Data
const faqs = [
  {
    question: "Are the question papers free to download?",
    answer: "Yes, our core database of previous year question papers is completely free to access and download. We believe that every student should have equal access to essential preparation materials."
  },
  {
    question: "Which competitive exams do you cover?",
    answer: "PaperBoat covers a wide variety of competitive exams including UPSC, SSC, Banking (IBPS/SBI), Railways (RRB), State PSCs, Engineering (JEE/GATE), and Medical (NEET). We are constantly updating our database to include more state-level and niche examinations."
  },
  {
    question: "Are answer keys or solutions provided with the papers?",
    answer: "Whenever official answer keys are released by the examining body, we attach them directly to the corresponding question paper PDF. For select popular exams, we also aim to provide detailed solution sheets."
  },
  {
    question: "How often are new exam papers added?",
    answer: "Our team updates the database on a weekly basis. Whenever a major exam is conducted, we typically upload the paper and its tentative answer key within 48 to 72 hours."
  },
  {
    question: "What format are the question papers in?",
    answer: "All papers are available in high-quality PDF format. They are optimized for both mobile viewing and printing, allowing you to take mock tests in an offline, exam-like environment."
  },
  {
    question: "I can't find a specific paper. Can I request it?",
    answer: "Absolutely! If you are looking for a specific year or regional paper that isn't currently on PaperBoat, you can use the 'Request a Paper' form on our Contact page. Our team will do their best to source and upload it for you."
  }
];

// Reusable Accordion Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-2xl mb-4 bg-white overflow-hidden transition-all duration-200 hover:border-blue-300 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <h3 className="text-lg font-semibold text-slate-800 pr-4">{question}</h3>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-600 text-white' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header Section */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <HelpCircle size={32} strokeWidth={2} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Got questions? We've got answers. Find out how to make the most of PaperBoat for your exam preparation.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 mb-8 text-blue-600 font-semibold px-2">
          <MessageSquare size={20} />
          <h2>Common Queries</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Still Need Help CTA */}
      <section className="max-w-3xl mx-auto px-6">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <BookMarked size={160} className="absolute -right-10 -bottom-10 text-slate-800 opacity-50" />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Can't find what you're looking for?</h3>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto text-lg">
              Whether you need to request a specific exam paper or report a broken link, our support team is ready to assist you.
            </p>
            <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-500 transition-colors shadow-md">
              <Mail size={20} />
              Contact Support
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}