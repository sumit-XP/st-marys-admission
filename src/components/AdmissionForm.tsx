import React, { useState, ChangeEvent } from 'react';
import { AdmissionFormData, SiblingInfo, initialFormData } from '../types';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';
import { ChevronLeft, Save, Upload, User, Users, MapPin, FileText, CreditCard, CheckCircle } from 'lucide-react';

interface AdmissionFormProps {
  onBack: () => void;
  onSubmit: (data: AdmissionFormData) => void;
}

export const AdmissionForm: React.FC<AdmissionFormProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState<AdmissionFormData>(initialFormData);
  const [activeSection, setActiveSection] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Handle checkbox specifically
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: keyof AdmissionFormData) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, [fieldName]: e.target.files![0] }));
    }
  };

  const handleSiblingChange = (index: 1 | 2, field: keyof SiblingInfo, value: string) => {
    const key = `sibling${index}` as keyof AdmissionFormData;
    setFormData(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] as SiblingInfo),
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.declarationAccepted && formData.paymentScreenshot) {
        onSubmit(formData);
    }
  };

  const sections = [
    { id: 0, title: 'Student', icon: User },
    { id: 1, title: 'Parents', icon: Users },
    { id: 2, title: 'Address', icon: MapPin },
    { id: 3, title: 'Payment', icon: CreditCard },
    { id: 4, title: 'Submit', icon: FileText },
  ];

  const classOptions = [
    "Nursery", "LKG", "UKG",
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
    "Class 6", "Class 7", "Class 8", "Class 9",
    "Class 11"
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-school-navy px-8 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <button onClick={onBack} className="text-white hover:text-school-gold transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-serif text-white font-bold">Admission Form 2026-27</h1>
            </div>
            <div className="hidden md:flex space-x-1">
                {sections.map((section, idx) => (
                    <div 
                        key={section.id} 
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            activeSection === idx 
                            ? 'bg-school-gold text-school-navy font-bold shadow-sm scale-105' 
                            : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        <section.icon className="w-3 h-3" />
                        <span>{section.title}</span>
                    </div>
                ))}
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          
          {/* Section 0: Student Details */}
          <div className={activeSection === 0 ? 'block' : 'hidden'}>
            <div className="flex items-center space-x-2 mb-6 border-b-2 border-gray-100 pb-2">
                <User className="text-school-red w-6 h-6" />
                <h2 className="text-2xl font-bold text-gray-900">Student Profile</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="md:col-span-2">
                        <Input 
                            label="Name of the Child" 
                            name="studentName" 
                            value={formData.studentName} 
                            onChange={handleChange} 
                            placeholder="IN CAPITAL LETTERS"
                            required
                        />
                     </div>
                     
                     {/* Class Selection Dropdown */}
                     <div className="flex flex-col mb-4">
                        <label className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-wide">
                            Class Applying For <span className="text-red-600">*</span>
                        </label>
                        <select
                            name="classApplyingFor"
                            value={formData.classApplyingFor}
                            onChange={handleChange}
                            required
                            className="border border-gray-400 rounded-md px-3 py-2 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-school-red/50 transition-colors cursor-pointer"
                        >
                            <option value="">Select Class</option>
                            {classOptions.map((cls) => (
                                <option key={cls} value={cls}>
                                    {cls}
                                </option>
                            ))}
                        </select>
                     </div>

                     <Input 
                        label="Aadhar No" 
                        name="aadharNo" 
                        value={formData.aadharNo} 
                        onChange={handleChange} 
                        placeholder="12-digit number"
                        maxLength={12}
                    />
                     <Input 
                        label="Date of Birth" 
                        type="date" 
                        name="dob" 
                        value={formData.dob} 
                        onChange={handleChange}
                        onClick={(e) => (e.target as HTMLInputElement).showPicker && (e.target as HTMLInputElement).showPicker()}
                        required
                    />
                     <Input 
                        label="Age (as on 1st April)" 
                        name="age" 
                        value={formData.age} 
                        onChange={handleChange} 
                    />
                     <div className="flex flex-col mb-4">
                        <label className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-wide">Gender</label>
                        <div className="flex space-x-6 mt-2">
                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="Male" 
                                    checked={formData.gender === 'Male'} 
                                    onChange={handleChange}
                                    className="w-5 h-5 text-school-red focus:ring-school-red border-gray-400"
                                />
                                <span className="ml-2 text-gray-900 font-medium">Male</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="Female" 
                                    checked={formData.gender === 'Female'} 
                                    onChange={handleChange}
                                    className="w-5 h-5 text-school-red focus:ring-school-red border-gray-400"
                                />
                                <span className="ml-2 text-gray-900 font-medium">Female</span>
                            </label>
                        </div>
                     </div>
                     <Input 
                        label="Mother Tongue" 
                        name="motherTongue" 
                        value={formData.motherTongue} 
                        onChange={handleChange} 
                    />
                     <Input 
                        label="Religion" 
                        name="religion" 
                        value={formData.religion} 
                        onChange={handleChange} 
                    />
                     <div className="flex flex-col mb-4">
                        <label className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-wide">Category</label>
                        <select 
                            name="category" 
                            value={formData.category} 
                            onChange={handleChange}
                            className="border border-gray-400 rounded-md px-3 py-2 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-school-red/50 mt-0 bg-white"
                        >
                            <option value="">Select Category</option>
                            <option value="General">General</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                            <option value="OBC">OBC</option>
                            <option value="Others">Others</option>
                        </select>
                     </div>
                </div>

                {/* Photo Upload Area */}
                <div className="md:col-span-3 flex flex-col items-center">
                    <label className="block text-sm font-bold text-gray-900 mb-2 uppercase text-center w-full">Child's Photograph</label>
                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 w-full h-48 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileChange(e, 'studentPhoto')}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {formData.studentPhoto ? (
                            <div className="text-center">
                                <span className="text-green-700 font-bold text-sm break-all">{formData.studentPhoto.name}</span>
                                <p className="text-xs text-gray-600 mt-1">Click to change</p>
                            </div>
                        ) : (
                            <>
                                <Upload className="w-8 h-8 text-gray-500 mb-2" />
                                <span className="text-xs text-gray-600 font-semibold text-center">Click or Drag to Upload</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
          </div>

          {/* Section 1: Parent Details */}
          <div className={activeSection === 1 ? 'block' : 'hidden'}>
            <div className="flex items-center space-x-2 mb-6 border-b-2 border-gray-100 pb-2">
                <Users className="text-school-red w-6 h-6" />
                <h2 className="text-2xl font-bold text-gray-900">Parental Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2 bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="font-serif text-lg font-bold text-school-navy mb-4 border-b border-blue-200 pb-2">Father's Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                        <Input label="Father's Aadhar No" name="fatherAadhar" value={formData.fatherAadhar} onChange={handleChange} />
                        <Input label="Qualification" name="fatherQualification" value={formData.fatherQualification} onChange={handleChange} />
                        <Input label="Occupation" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />
                    </div>
                </div>

                <div className="md:col-span-2 bg-pink-50 p-6 rounded-lg border border-pink-100">
                    <h3 className="font-serif text-lg font-bold text-school-red mb-4 border-b border-pink-200 pb-2">Mother's Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Mother's Name" name="motherName" value={formData.motherName} onChange={handleChange} required />
                        <Input label="Mother's Aadhar No" name="motherAadhar" value={formData.motherAadhar} onChange={handleChange} />
                        <Input label="Qualification" name="motherQualification" value={formData.motherQualification} onChange={handleChange} />
                        <Input label="Occupation" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />
                    </div>
                </div>
            </div>
          </div>

          {/* Section 2: Contact Details */}
          <div className={activeSection === 2 ? 'block' : 'hidden'}>
            <div className="flex items-center space-x-2 mb-6 border-b-2 border-gray-100 pb-2">
                <MapPin className="text-school-red w-6 h-6" />
                <h2 className="text-2xl font-bold text-gray-900">Contact & Address</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="Father's Mobile" name="fatherMobile" value={formData.fatherMobile} onChange={handleChange} required />
                    <Input label="Mother's Mobile" name="motherMobile" value={formData.motherMobile} onChange={handleChange} />
                    <Input label="E-Mail ID" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                
                <TextArea label="Present Address" name="presentAddress" value={formData.presentAddress} onChange={handleChange} required placeholder="Full address for correspondence" />
                <TextArea label="Permanent Address" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required placeholder="Permanent residence address" />
            </div>
          </div>

          {/* Section 3: Payment Details */}
          <div className={activeSection === 3 ? 'block' : 'hidden'}>
            <div className="flex items-center space-x-2 mb-6 border-b-2 border-gray-100 pb-2">
                <CreditCard className="text-school-red w-6 h-6" />
                <h2 className="text-2xl font-bold text-gray-900">Application Fee Payment</h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* QR Code Column */}
                    <div className="flex flex-col items-center bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-bold text-school-navy mb-2">Scan to Pay</h3>
                        <p className="text-sm text-gray-500 mb-4">Amount: <span className="font-bold text-school-red">₹500.00</span></p>
                        <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
                            {/* Placeholder QR Code */}
                            <img 
                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi%3A%2F%2Fpay%3Fpa%3Dstmaryschool%40bank%26pn%3DStMarysSchool%26am%3D500.00%26cu%3DINR" 
                                alt="Payment QR Code" 
                                className="w-48 h-48"
                            />
                        </div>
                        <p className="text-xs text-gray-500 text-center max-w-[200px]">
                            Accepts UPI, GPay, PhonePe, Paytm
                        </p>
                    </div>

                    {/* Instruction & Upload Column */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Instructions</h3>
                            <ol className="list-decimal list-inside space-y-2 text-gray-600">
                                <li>Scan the QR code to pay the application fee of ₹500.</li>
                                <li>Complete the payment using any UPI app.</li>
                                <li>Take a screenshot of the <strong>Payment Success</strong> screen.</li>
                                <li>Upload the screenshot below as proof of payment.</li>
                            </ol>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                             <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                                Upload Payment Screenshot <span className="text-red-600">*</span>
                             </label>
                             <div className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer relative ${
                                formData.paymentScreenshot ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:bg-gray-50'
                             }`}>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => handleFileChange(e, 'paymentScreenshot')}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {formData.paymentScreenshot ? (
                                    <div className="text-center">
                                        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                                        <span className="text-green-700 font-bold break-all">{formData.paymentScreenshot.name}</span>
                                        <p className="text-xs text-gray-600 mt-1">Click to replace</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                        <span className="text-sm text-gray-600 font-semibold">Click to upload screenshot</span>
                                        <p className="text-xs text-gray-400 mt-1">JPG, PNG supported</p>
                                    </div>
                                )}
                             </div>
                             {!formData.paymentScreenshot && (
                                 <p className="text-xs text-red-500 mt-2 font-medium">
                                     * Payment proof is required to proceed.
                                 </p>
                             )}
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Section 4: Declaration & Siblings */}
          <div className={activeSection === 4 ? 'block' : 'hidden'}>
            <div className="flex items-center space-x-2 mb-6 border-b-2 border-gray-100 pb-2">
                <FileText className="text-school-red w-6 h-6" />
                <h2 className="text-2xl font-bold text-gray-900">Other Details & Declaration</h2>
            </div>

            {/* Siblings */}
            <div className="mb-8">
                <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">Child's Own Sibling/s Studying in this School</label>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 space-y-4">
                    <div className="grid grid-cols-12 gap-2 text-xs font-bold text-gray-700 uppercase">
                        <div className="col-span-5">Name</div>
                        <div className="col-span-4">Adm No.</div>
                        <div className="col-span-3">Class</div>
                    </div>
                    {/* Sibling 1 */}
                    <div className="grid grid-cols-12 gap-2">
                         <div className="col-span-5">
                             <input 
                                className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-gray-900 placeholder-gray-400" 
                                placeholder="Sibling 1 Name"
                                value={formData.sibling1.name}
                                onChange={(e) => handleSiblingChange(1, 'name', e.target.value)}
                            />
                         </div>
                         <div className="col-span-4">
                            <input 
                                className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-gray-900 placeholder-gray-400" 
                                placeholder="Adm No."
                                value={formData.sibling1.admNo}
                                onChange={(e) => handleSiblingChange(1, 'admNo', e.target.value)}
                            />
                         </div>
                         <div className="col-span-3">
                            <input 
                                className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-gray-900 placeholder-gray-400" 
                                placeholder="Class"
                                value={formData.sibling1.class}
                                onChange={(e) => handleSiblingChange(1, 'class', e.target.value)}
                            />
                         </div>
                    </div>
                    {/* Sibling 2 */}
                    <div className="grid grid-cols-12 gap-2">
                         <div className="col-span-5">
                             <input 
                                className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-gray-900 placeholder-gray-400" 
                                placeholder="Sibling 2 Name"
                                value={formData.sibling2.name}
                                onChange={(e) => handleSiblingChange(2, 'name', e.target.value)}
                            />
                         </div>
                         <div className="col-span-4">
                            <input 
                                className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-gray-900 placeholder-gray-400" 
                                placeholder="Adm No."
                                value={formData.sibling2.admNo}
                                onChange={(e) => handleSiblingChange(2, 'admNo', e.target.value)}
                            />
                         </div>
                         <div className="col-span-3">
                            <input 
                                className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-gray-900 placeholder-gray-400" 
                                placeholder="Class"
                                value={formData.sibling2.class}
                                onChange={(e) => handleSiblingChange(2, 'class', e.target.value)}
                            />
                         </div>
                    </div>
                </div>
            </div>

            {/* Declaration Text */}
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6 shadow-sm">
                <h3 className="font-bold text-school-navy text-lg mb-2">Declaration:</h3>
                <p className="text-base text-gray-800 italic leading-relaxed">
                    I, declare the above said information is true to the best of my knowledge and I shall abide by the rules & regulations of the school.
                </p>
            </div>
            
            {/* Declaration Checkbox */}
            <div className="flex items-start mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex h-6 items-center">
                    <input
                        id="declarationAccepted"
                        name="declarationAccepted"
                        type="checkbox"
                        checked={formData.declarationAccepted}
                        onChange={handleChange}
                        className="h-5 w-5 rounded border-gray-400 text-school-red focus:ring-school-red cursor-pointer"
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="declarationAccepted" className="font-bold text-gray-900 cursor-pointer select-none">
                        I hereby accept the declaration above and confirm that all information provided is accurate.
                    </label>
                    <p className="text-gray-600 mt-1">You must accept the declaration to submit the form.</p>
                </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">Father's Signature</label>
                    <input type="file" onChange={(e) => handleFileChange(e, 'fatherSignature')} className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-school-navy file:text-white hover:file:bg-blue-800 cursor-pointer"/>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">Mother's Signature</label>
                    <input type="file" onChange={(e) => handleFileChange(e, 'motherSignature')} className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-school-navy file:text-white hover:file:bg-blue-800 cursor-pointer"/>
                 </div>
            </div>
            
            <div className="flex justify-end border-t border-gray-200 pt-6">
                 <div className="w-full md:w-1/3">
                    <Input label="Date" type="date" name="declarationDate" value={formData.declarationDate} onChange={handleChange} />
                 </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t-2 border-gray-100 flex justify-between">
             {activeSection > 0 ? (
                 <button 
                    type="button" 
                    onClick={() => setActiveSection(prev => prev - 1)}
                    className="px-6 py-3 border border-gray-300 text-gray-800 font-bold rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                 >
                    Previous
                 </button>
             ) : <div></div>}
             
             {activeSection < sections.length - 1 ? (
                 <button 
                    type="button" 
                    disabled={activeSection === 3 && !formData.paymentScreenshot} // Disable next on payment step if no screenshot
                    onClick={() => setActiveSection(prev => prev + 1)}
                    className={`px-6 py-3 bg-school-navy text-white font-bold rounded-md transition-colors shadow-lg ${
                        (activeSection === 3 && !formData.paymentScreenshot) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-900'
                    }`}
                 >
                    {activeSection === 3 ? 'Upload & Continue' : 'Next Section'}
                 </button>
             ) : (
                 <button 
                    type="submit" 
                    disabled={!formData.declarationAccepted}
                    className={`px-8 py-3 font-bold rounded-md transition-all shadow-lg flex items-center ${
                        formData.declarationAccepted 
                        ? 'bg-school-red text-white hover:bg-red-900 cursor-pointer transform hover:scale-105' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                 >
                    <Save className="w-5 h-5 mr-2" /> Submit Application
                 </button>
             )}
          </div>

        </form>
      </div>
    </div>
  );
};