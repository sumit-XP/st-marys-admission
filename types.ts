export interface SiblingInfo {
  name: string;
  admNo: string;
  class: string;
}

export interface AdmissionFormData {
  // Student Details
  classApplyingFor: string;
  studentPhoto: File | null;
  studentName: string;
  aadharNo: string;
  gender: 'Male' | 'Female' | '';
  dob: string;
  age: string;
  motherTongue: string;
  religion: string;
  category: 'General' | 'SC' | 'ST' | 'OBC' | 'Others' | '';
  
  // Parent Details
  fatherName: string;
  motherName: string;
  fatherAadhar: string;
  motherAadhar: string;
  fatherMobile: string;
  motherMobile: string;
  email: string;
  fatherQualification: string;
  motherQualification: string;
  fatherOccupation: string;
  motherOccupation: string;
  
  // Address
  presentAddress: string;
  permanentAddress: string;
  
  // Siblings
  sibling1: SiblingInfo;
  sibling2: SiblingInfo;
  
  // Payment
  paymentScreenshot: File | null;
  
  // Documents & Declaration
  fatherSignature: File | null;
  motherSignature: File | null;
  declarationDate: string;
  declarationAccepted: boolean;
}

export const initialFormData: AdmissionFormData = {
  classApplyingFor: '',
  studentPhoto: null,
  studentName: '',
  aadharNo: '',
  gender: '',
  dob: '',
  age: '',
  motherTongue: '',
  religion: '',
  category: '',
  fatherName: '',
  motherName: '',
  fatherAadhar: '',
  motherAadhar: '',
  fatherMobile: '',
  motherMobile: '',
  email: '',
  fatherQualification: '',
  motherQualification: '',
  fatherOccupation: '',
  motherOccupation: '',
  presentAddress: '',
  permanentAddress: '',
  sibling1: { name: '', admNo: '', class: '' },
  sibling2: { name: '', admNo: '', class: '' },
  paymentScreenshot: null,
  fatherSignature: null,
  motherSignature: null,
  declarationDate: new Date().toISOString().split('T')[0],
  declarationAccepted: false,
};