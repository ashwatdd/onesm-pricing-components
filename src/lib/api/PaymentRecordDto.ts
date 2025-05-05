export interface PaymentRecordDto {
  dateCreated: Date
  paymentLinkTitle: string
  paymentLinkDetails: string
  price: number
  includesComprehensiveCourse: boolean
  includesBootcamp: boolean
  includesUWorld: boolean
  includesAAMC: boolean
  tutoringHours: number
  premiumTutor: boolean
  installmentInterval: 'month' | 'week' | 'one-time'
  frequency: number
  numberOfInstallments: number
  installmentAmount: number
  redirectURL: string
  studentName: string
  studentEmail: string
  imageURL: string
  createdBy: string
  paymentLinkURL: string
  eventId: string
}
