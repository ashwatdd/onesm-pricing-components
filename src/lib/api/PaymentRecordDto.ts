export interface PaymentRecordDto {
  eventId: string
  dateCreated: string
  createdBy: string
  paymentLinkTitle: string
  paymentLinkDetails: string
  paymentLinkURL: string

  includesComprehensiveCourse: boolean
  includesBootcamp: boolean
  includesUWorld: boolean
  includesAAMC: boolean
  tutoringHours: number
  premiumTutor: boolean
  installmentInterval: 0 | 1 | 2
  frequency: number
  numberOfInstallments: number
}
