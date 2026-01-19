import React, { useState, ChangeEvent } from 'react';
import { AdmissionFormData, initialFormData } from '../types';
import { Input } from './ui/Input';
import { ChevronLeft, Save, User, FileText } from 'lucide-react';

interface AdmissionFormProps {
    onBack: () => void;
    onSubmit: (data: AdmissionFormData) => void;
}

export const AdmissionForm: React.FC<AdmissionFormProps> = ({ onBack, onSubmit }) => {
    const [formData, setFormData] = useState<AdmissionFormData>(initialFormData);
    const [activeSection, setActiveSection] = useState<number>(0);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.declarationAccepted) {
            onSubmit(formData);
        }
    };

    const sections = [
        { id: 0, title: 'Student', icon: User },
        { id: 1, title: 'Submit', icon: FileText },
    ];

    const classOptions = [
        "Nursery", "LKG", "UKG",
        "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
        "Class 6", "Class 7", "Class 8", "Class 9",
        "Class 11"
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="bg-school-navy px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button onClick={onBack} className="text-white hover:text-school-gold transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-serif text-white font-bold">SAT Registration 2026-27</h1>
                    </div>
                    <div className="hidden md:flex space-x-1">
                        {sections.map((section, idx) => (
                            <div
                                key={section.id}
                                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${activeSection === idx
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
                            <h2 className="text-2xl font-bold text-gray-900">Student Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                            {/* Contact fields */}
                            <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-200">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
                            </div>
                            <Input label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                            <Input label="Mother's Name" name="motherName" value={formData.motherName} onChange={handleChange} required />
                            <Input label="Mobile Number" name="fatherMobile" value={formData.fatherMobile} onChange={handleChange} required placeholder="Primary contact number" />
                            <Input label="E-Mail ID" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>

                    {/* Section 1: Declaration & Submit */}
                    <div className={activeSection === 1 ? 'block' : 'hidden'}>
                        <div className="flex items-center space-x-2 mb-6 border-b-2 border-gray-100 pb-2">
                            <FileText className="text-school-red w-6 h-6" />
                            <h2 className="text-2xl font-bold text-gray-900">Declaration & Submit</h2>
                        </div>

                        {/* Declaration Text */}
                        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6 shadow-sm">
                            <h3 className="font-bold text-school-navy text-lg mb-2">Declaration:</h3>
                            <p className="text-base text-gray-800 italic leading-relaxed">
                                I, declare the above said information is true to the best of my knowledge and I shall abide by the rules & regulations of the school for the SAT examination.
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
                                <p className="text-gray-600 mt-1">You must accept the declaration to register for SAT.</p>
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
                                onClick={() => setActiveSection(prev => prev + 1)}
                                className="px-6 py-3 bg-school-navy text-white font-bold rounded-md transition-colors shadow-lg hover:bg-blue-900"
                            >
                                Next Section
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={!formData.declarationAccepted}
                                className={`px-8 py-3 font-bold rounded-md transition-all shadow-lg flex items-center ${formData.declarationAccepted
                                        ? 'bg-school-red text-white hover:bg-red-900 cursor-pointer transform hover:scale-105'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <Save className="w-5 h-5 mr-2" /> Register for SAT
                            </button>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
};