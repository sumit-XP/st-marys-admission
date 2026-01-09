import React from 'react';
import { ArrowRight, BookOpen, Calendar, CheckCircle, GraduationCap } from 'lucide-react';

interface LandingPageProps {
  onApply: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onApply }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-school-navy text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://www.stmarysjajpurroad.com/school-admin/uploads/gallery/1576842162ing.jpg" 
            alt="School Campus" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-6">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-12 h-12 text-school-red" />
               </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-4 text-school-gold">
              St. Mary's Higher Secondary School
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-gray-200">
              Jajpur Road, Odisha | Est. 2026-2027
            </p>
            <p className="max-w-2xl mx-auto text-gray-300 mb-10 text-lg">
              Service Through Excellence. Molding the leaders of tomorrow with holistic education and values.
            </p>
            <button
              onClick={onApply}
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-school-navy bg-school-gold hover:bg-yellow-400 transition-colors duration-300 shadow-xl"
            >
              Apply for Admission <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="flex-grow bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Calendar className="w-10 h-10 text-school-red mb-4" />
              <h3 className="text-xl font-bold mb-2 text-school-navy">Important Dates</h3>
              <p className="text-gray-600">
                Application submission deadline: <span className="font-semibold">April 30th, 2026</span>. 
                Please ensure all documents are ready before starting.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <BookOpen className="w-10 h-10 text-school-red mb-4" />
              <h3 className="text-xl font-bold mb-2 text-school-navy">Required Documents</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-500 shrink-0"/> Passport Photograph</li>
                <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-500 shrink-0"/> Birth Certificate</li>
                <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-500 shrink-0"/> Aadhar Card (Student & Parents)</li>
                <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-500 shrink-0"/> Transfer Certificate (if applicable)</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <GraduationCap className="w-10 h-10 text-school-red mb-4" />
              <h3 className="text-xl font-bold mb-2 text-school-navy">Age Criteria</h3>
              <p className="text-gray-600">
                Students must meet the age requirements for their respective classes as per the government guidelines for the academic year 2026-2027.
              </p>
            </div>
          </div>

          <div className="mt-16 border-t pt-10">
            <h2 className="text-3xl font-serif font-bold text-center text-school-navy mb-8">Admission Guidelines</h2>
            <div className="prose max-w-4xl mx-auto text-gray-600 space-y-4">
              <p>1. This application is not a guarantee for admission, since the number of seats is limited.</p>
              <p>2. Birth Certificate should be either in Hindi or English. Birth Certificate issued by Hospitals and Panchayats are not accepted; it must be from the Municipal Corporation.</p>
              <p>3. One photo copy of the Birth Certificate and Aadhar card is compulsory.</p>
              <p>4. Payment of admission fees will be done through cash only at the school office upon selection.</p>
              <p>5. In case of inter-state transfer, the Transfer Certificate has to be countersigned for admission.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-school-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 St. Mary's Higher Secondary School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};