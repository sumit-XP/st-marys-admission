import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AdmissionForm } from './components/AdmissionForm';
import { AdmissionFormData } from './types';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

// TODO: REPLACE THIS URL WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwOSaGhgPRBjLbeCqnx7iBpsQGFWzWmwI6O6tNA4QlGXKgjcqj-k8MHP17TDuUjuQdG/exec";

function App() {
  const [view, setView] = useState<'landing' | 'form' | 'success'>('landing');
  const [submittedData, setSubmittedData] = useState<AdmissionFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleApplyClick = () => {
    setView('form');
    window.scrollTo(0, 0);
  };

  // this is to redeploy


  const handleFormSubmit = async (data: AdmissionFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare Payload - simple JSON for SAT registration
      const payload = { ...data };

      // Send to Google Sheets (Apps Script)
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.result === 'success') {
        setSubmittedData(data);
        setView('success');
        window.scrollTo(0, 0);
      } else {
        throw new Error(result.error || 'Submission failed on server');
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Failed to submit registration. Please check your internet connection and try again.");

      // For development/demo purposes if no URL is set:
      if ((GOOGLE_SCRIPT_URL as string) === "INSERT_YOUR_GOOGLE_SCRIPT_URL_HERE") {
        alert("PLEASE CONFIGURE THE SCRIPT URL IN App.tsx.\n\nSimulating success for now.");
        setSubmittedData(data);
        setView('success');
        window.scrollTo(0, 0);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setView('landing');
    setSubmitError(null);
  };

  if (view === 'success' && submittedData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-school-navy mb-4">SAT Registration Complete!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for registering for the St. Mary's Admission Test. Registration for <span className="font-bold">{submittedData.studentName}</span> has been received.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg text-left mb-8 text-sm text-gray-700 overflow-auto max-h-60">
            <p><strong>Registration ID:</strong> SAT-{Math.random().toString(36).substring(2, 11).toUpperCase()}</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Class:</strong> {submittedData.classApplyingFor}</p>
            <p className="mt-2 text-xs text-gray-500 italic">Your SAT admit card will be sent to {submittedData.email} before the exam date.</p>
          </div>
          <button
            onClick={() => setView('landing')}
            className="w-full py-3 bg-school-navy text-white rounded-lg font-medium hover:bg-blue-900 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Overlay Loader */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center shadow-2xl">
            <Loader2 className="w-10 h-10 text-school-red animate-spin mb-3" />
            <p className="text-gray-800 font-bold">Submitting SAT Registration...</p>
            <p className="text-sm text-gray-500">Please wait...</p>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {submitError && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative z-50 flex items-center shadow-lg max-w-sm">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="block sm:inline">{submitError}</span>
          <button onClick={() => setSubmitError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <span className="text-xl">&times;</span>
          </button>
        </div>
      )}

      {view === 'landing' && <LandingPage onApply={handleApplyClick} />}
      {view === 'form' && <AdmissionForm onBack={handleBack} onSubmit={handleFormSubmit} />}
    </div>
  );
}

export default App;