export interface PaymentRecord {
  eventId: string
  dateCreated: Date
  createdBy: string
  paymentLinkTitle: string
  paymentLinkDetails: string
  paymentLinkURL: string

  options: {
    includesComprehensiveCourse: boolean
    includesBootcamp: boolean
    includesUWorld: boolean
    includesAAMC: boolean
    tutoringHours: number
    premiumTutor: boolean
    installmentInterval: 'month' | 'week' | 'one-time'
    frequency: number
    numberOfInstallments: number
  }
}
