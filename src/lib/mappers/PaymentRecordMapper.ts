import type { PaymentRecordDto } from '@/lib/api/PaymentRecordDto.ts'
import type { PaymentRecord } from '@/lib/model/PaymentRecord.ts'
import { DateTime } from 'luxon'

class PaymentRecordMapper {
  static toModel(dto: PaymentRecordDto): PaymentRecord {
    return {
      eventId: dto.eventId,
      dateCreated: DateTime.fromISO(dto.dateCreated),
      createdBy: dto.createdBy,
      paymentLinkTitle: dto.paymentLinkTitle,
      paymentLinkDetails: dto.paymentLinkDetails,
      paymentLinkURL: dto.paymentLinkURL,
      options: {
        includesComprehensiveCourse: dto.includesComprehensiveCourse,
        includesBootcamp: dto.includesBootcamp,
        includesUWorld: dto.includesUWorld,
        includesAAMC: dto.includesAAMC,
        tutoringHours: dto.tutoringHours,
        premiumTutor: dto.premiumTutor,
        installmentInterval: this.parseInstallmentInterval(dto.installmentInterval),
        frequency: dto.frequency,
        numberOfInstallments: dto.numberOfInstallments,
      },
    }
  }

  private static parseInstallmentInterval(
    interval: PaymentRecordDto['installmentInterval'],
  ): PaymentRecord['options']['installmentInterval'] {
    switch (interval) {
      case 0:
        return 'month'
      case 1:
        return 'week'
      case 2:
        return 'one-time'
      default:
        return 'one-time'
    }
  }
}

export default PaymentRecordMapper
