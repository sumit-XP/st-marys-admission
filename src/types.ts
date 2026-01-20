export interface SATFormData {
  // Student Details
  classApplyingFor: string;
  studentName: string;
  gender: 'Male' | 'Female' | '';
  dob: string;
  motherTongue: string;

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
  gender: '',
  dob: '',
  motherTongue: '',
  fatherName: '',
  motherName: '',
  fatherMobile: '',
  email: '',
  declarationDate: new Date().toISOString().split('T')[0],
  declarationAccepted: false,
};