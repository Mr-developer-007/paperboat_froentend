import React from 'react';
import { 
  ShieldCheck, 
  Database, 
  Eye, 
  Cookie, 
  Lock, 
  Mail,
  Share2
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header Section */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShieldCheck size={32} strokeWidth={2} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            At PaperBoat, your privacy is our priority. This document outlines how we collect, use, and protect your information when you use our platform.
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
                <Database size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
              <div className="text-slate-600 space-y-3 leading-relaxed">
                <p>We only collect information that is necessary to provide you with the best experience on PaperBoat:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Personal Information:</strong> If you use our Contact form, request a paper, or subscribe to updates, we may collect your name and email address.</li>
                  <li><strong>Usage Data:</strong> We automatically collect non-personally identifiable information such as browser type, device type, pages visited, and the specific question papers downloaded. This helps us understand which exams are most popular and improve our database.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Eye size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
              <div className="text-slate-600 space-y-3 leading-relaxed">
                <p>The data we gather is used in the following ways:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To provide, operate, and maintain our repository of exam papers.</li>
                  <li>To respond to your inquiries, support requests, or paper contributions.</li>
                  <li>To analyze user behavior so we can optimize website navigation and fix broken links.</li>
                  <li>To send you administrative emails, such as updates to our policies or responses to your queries.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Cookie size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Cookies and Tracking</h2>
              <div className="text-slate-600 space-y-3 leading-relaxed">
                <p>
                  PaperBoat uses "cookies" to enhance your browsing experience. Cookies are small data files stored on your device that help us remember your preferences (like dark mode or recently searched exams) and understand how you interact with our site.
                </p>
                <p>
                  You can choose to disable cookies through your browser settings, though doing so may affect the functionality of certain features on our platform.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Share2 size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Third-Party Services</h2>
              <div className="text-slate-600 space-y-3 leading-relaxed">
                <p>
                  We may employ third-party companies and tools to facilitate our service, such as analytics providers (e.g., Google Analytics) to monitor website traffic. These third parties have access to your Usage Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
                <p>
                  Our site may contain links to external educational sites or official exam portals. We have no control over, and assume no responsibility for, the privacy policies of these third-party sites.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Lock size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Data Security</h2>
              <div className="text-slate-600 space-y-3 leading-relaxed">
                <p>
                  We value your trust in providing us your personal information, and we strive to use commercially acceptable means of protecting it (such as SSL encryption). However, remember that no method of transmission over the internet or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
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
              <h2 className="text-xl font-bold text-slate-900 mb-2">Questions about this policy?</h2>
              <p className="text-slate-600 mb-4">
                If you have any questions, concerns, or requests regarding your data and this privacy policy, please don't hesitate to reach out.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                Contact Our Team
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}