import type { DateTime } from 'luxon'

export interface PaymentRecord {
  eventId: string
  dateCreated: DateTime
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
