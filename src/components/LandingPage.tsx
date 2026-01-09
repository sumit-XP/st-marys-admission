import React, { useState } from 'react';
import { ArrowRight, BookOpen, Calendar, CheckCircle, GraduationCap } from 'lucide-react';

interface LandingPageProps {
  onApply: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onApply }) => {
  const [imageError, setImageError] = useState(false);
  
  // The specific school image URL from the original requirements
  const SCHOOL_IMAGE = "https://www.stmarysjajpurroad.com/school-admin/uploads/gallery/1576842162ing.jpg";
  // High quality fallback image (Unsplash)
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative min-h-[600px] flex items-center justify-center bg-school-navy text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={imageError ? FALLBACK_IMAGE : SCHOOL_IMAGE} 
            onError={() => setImageError(true)}
            alt="School Campus" 
            className={`w-full h-full object-cover transition-opacity duration-700 ${imageError ? 'opacity-90' : 'opacity-100'}`}
          />
          {/* Strong gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-school-navy/90 via-school-navy/80 to-school-navy/90 mix-blend-multiply"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="flex justify-center mb-8">
             <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-school-gold shadow-2xl">
                <GraduationCap className="w-12 h-12 text-school-gold" />
             </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-6 text-white drop-shadow-lg">
            St. Mary's Higher <br className="hidden md:block" />
            <span className="text-school-gold">Secondary School</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-light mb-4 text-gray-200 tracking-wide uppercase">
            Jajpur Road, Odisha
          </p>
          
          <p className="max-w-2xl mx-auto text-gray-300 mb-12 text-lg leading-relaxed">
            Service Through Excellence. Molding the leaders of tomorrow with holistic education, moral values, and academic rigor.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onApply}
              className="group relative inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-school-navy bg-school-gold hover:bg-yellow-400 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Apply for Admission 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="flex-grow bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-school-red" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-school-navy">Important Dates</h3>
              <p className="text-gray-600 leading-relaxed">
                Application submission deadline: <span className="font-bold text-school-red">April 30th, 2026</span>. 
                Please ensure all documents are scanned and ready before starting the application.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-school-navy">Required Documents</h3>
              <ul className="text-gray-600 space-y-3 text-sm">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-3 text-green-500 shrink-0"/> Passport Photograph</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-3 text-green-500 shrink-0"/> Birth Certificate</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-3 text-green-500 shrink-0"/> Aadhar Card (Student & Parents)</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-3 text-green-500 shrink-0"/> Transfer Certificate</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-school-navy" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-school-navy">Age Criteria</h3>
              <p className="text-gray-600 leading-relaxed">
                Students must meet the age requirements for their respective classes as per the government guidelines for the academic year 2026-2027.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-serif font-bold text-center text-school-navy mb-12 relative inline-block w-full">
              <span className="relative z-10 bg-white px-6">Admission Guidelines</span>
              <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0"></div>
            </h2>
            
            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200">
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p className="flex gap-4">
                  <span className="font-bold text-school-gold text-lg">01.</span>
                  <span>This application is not a guarantee for admission, since the number of seats is limited. Admission is granted based on merit and vacancy.</span>
                </p>
                <p className="flex gap-4">
                  <span className="font-bold text-school-gold text-lg">02.</span>
                  <span>Birth Certificate should be either in Hindi or English. Birth Certificate issued by Hospitals and Panchayats are not accepted; it must be from the Municipal Corporation/Nagar Nigam.</span>
                </p>
                <p className="flex gap-4">
                  <span className="font-bold text-school-gold text-lg">03.</span>
                  <span>One photo copy of the Birth Certificate and Aadhar card is compulsory at the time of physical verification.</span>
                </p>
                <p className="flex gap-4">
                  <span className="font-bold text-school-gold text-lg">04.</span>
                  <span>Payment of admission fees will be done through cash only at the school office upon selection.</span>
                </p>
                <p className="flex gap-4">
                  <span className="font-bold text-school-gold text-lg">05.</span>
                  <span>In case of inter-state transfer, the Transfer Certificate has to be countersigned by the appropriate education officer.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-school-navy text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-6">
            <GraduationCap className="w-10 h-10 text-school-gold mx-auto opacity-80" />
          </div>
          <h3 className="font-serif text-xl font-bold mb-2">St. Mary's Higher Secondary School</h3>
          <p className="text-gray-400 mb-8 text-sm">Jajpur Road, Odisha - 755019</p>
          <div className="border-t border-white/10 pt-8">
            <p className="text-gray-500 text-sm">&copy; 2026 St. Mary's Higher Secondary School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};