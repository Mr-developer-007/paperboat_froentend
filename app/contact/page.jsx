"use client"

import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock,
  BookOpen
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Message sent successfully! Our team will get back to you soon.");
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header Section */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <MessageSquare size={32} strokeWidth={2} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you want to request a specific exam paper, report a broken link, or just say hello—we're here to help you navigate your preparation.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-12">
          
          {/* Left Column: Contact Info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Reach Out to Us</h2>
              <p className="text-slate-600">
                Fill out the form and our support team will get back to you within 24-48 hours.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Email Us</h4>
                  <p className="text-slate-600 text-sm mb-1">For general queries & support:</p>
                  <a href="mailto:support@paperboat.com" className="text-blue-600 font-medium hover:underline">
                    support@paperboat.com
                  </a>
                </div>
              </div>

              {/* Location Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Our Location</h4>
                  <p className="text-slate-600 text-sm mb-1">Headquarters:</p>
                  <p className="text-slate-800 font-medium">Chandigarh, Punjab, India</p>
                </div>
              </div>

              {/* Working Hours Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Support Hours</h4>
                  <p className="text-slate-600 text-sm mb-1">When we're online:</p>
                  <p className="text-slate-800 font-medium">Mon - Sat: 9:00 AM - 6:00 PM (IST)</p>
                </div>
              </div>
            </div>

            {/* Decorative Banner */}
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
              <BookOpen size={32} className="mx-auto text-blue-400 mb-3" />
              <h4 className="font-bold text-blue-900 mb-2">Have a paper to share?</h4>
              <p className="text-blue-700 text-sm">
                Help fellow aspirants by submitting question papers you own. Select "Contribute a Paper" in the form.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:col-span-3">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-slate-700">How can we help you?</label>
                  <select 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Request a Paper">Request a specific Question Paper</option>
                    <option value="Report an Error">Report a broken link or error</option>
                    <option value="Contribute a Paper">Contribute a Paper</option>
                    <option value="Partnership">Partnership & Advertising</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">Your Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 resize-none"
                    placeholder="Tell us what you need..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold transition-all shadow-md ${
                    isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send size={18} />}
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}