import React from 'react';
import { 
  Scale, 
  UserCheck, 
  BookCopy, 
  UploadCloud, 
  AlertTriangle, 
  RefreshCw,
  Mail,
  Copyright
} from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header Section */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Scale size={32} strokeWidth={2} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Please read these terms carefully before using PaperBoat. By accessing our repository of question papers, you agree to be bound by these conditions.
          </p>
          <p className="text-sm text-slate-400 mt-6 font-medium">
            Last Updated: May 29, 2026
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 space-y-12">
          
          {/* Section 1 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <UserCheck size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
              <div className="text-slate-600 space-y-3 leading-relaxed">
                <p>
                  By accessing and using PaperBoat (the "Website"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this platform. 
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Copyright size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Educational Fair Use & IP</h2>
              <div className="text-slate-600 space-y-3 leading-relaxed">
                <p>
                  PaperBoat operates as an educational aggregator. The previous year question papers hosted on this site are the intellectual property of their respective examination boards, commissions, and government bodies. 
                </p>
                <p>
                  We provide these documents strictly for <strong>educational purposes, personal study, and non-commercial fair use</strong>. We do not claim ownership over the actual exam questions or official answer keys.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <BookCopy size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Permitted Use & Restrictions</h2>
              <div className="text-slate-600 space-y-3 leading-relaxed">
                <p>You are granted a limited license to access and download the materials for your personal exam preparation. However, you are strictly prohibited from:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Selling, renting, or sub-licensing the downloaded question papers.</li>
                  <li>Using automated scripts, bots, or scrapers to extract data or bulk-download PDFs from our servers.</li>
                  <li>Repackaging our platform's specific UI, curated content collections, or original articles for a competing commercial product.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <UploadCloud size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. User Contributions</h2>
              <div className="text-slate-600 space-y-3 leading-relaxed">
                <p>
                  Users may voluntarily submit question papers to our database to help fellow aspirants. By uploading or submitting a document to PaperBoat, you guarantee that it is a legitimate exam paper and that sharing it does not violate any confidentiality agreements.
                </p>
                <p>
                  PaperBoat reserves the right to review, edit, or delete any user-submitted content at our sole discretion.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Disclaimer of Warranties</h2>
              <div className="text-slate-600 space-y-3 leading-relaxed">
                <p>
                  While we strive to provide accurate, high-quality, and up-to-date resources, PaperBoat makes no warranties regarding the absolute accuracy of the question papers or the provided answer keys. 
                </p>
                <p>
                  Typographical errors or discrepancies may exist in official papers. Using our platform does not guarantee success in your respective competitive exams. The materials are provided on an "as is" and "as available" basis.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <RefreshCw size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Modifications to Terms</h2>
              <div className="text-slate-600 space-y-3 leading-relaxed">
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of any significant changes by updating the "Last Updated" date at the top of this page. Your continued use of the site after such changes constitutes your acceptance of the new Terms of Service.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 my-8"></div>

          {/* Contact Section */}
          <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md">
                <Mail size={28} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Have a legal question?</h2>
              <p className="text-slate-600 mb-4">
                If you have questions about these terms or believe a document on our site infringes upon your copyright, please contact our administrative team.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                Contact Administration
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}