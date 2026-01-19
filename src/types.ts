export interface SATFormData {
  // Student Details
  classApplyingFor: string;
  studentName: string;
  aadharNo: string;
  gender: 'Male' | 'Female' | '';
  dob: string;
  age: string;
  motherTongue: string;
  religion: string;
  category: 'General' | 'SC' | 'ST' | 'OBC' | 'Others' | '';
  
  // Contact Details
  fatherName: string;
  motherName: string;
  fatherMobile: string;
  email: string;
  
  // Declaration
  declarationDate: string;
  declarationAccepted: boolean;
}

// Keeping AdmissionFormData as alias for compatibility
export type AdmissionFormData = SATFormData;

export const initialFormData: SATFormData = {
  classApplyingFor: '',
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
  fatherMobile: '',
  email: '',
  declarationDate: new Date().toISOString().split('T')[0],
  declarationAccepted: false,
};