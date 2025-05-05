import type { PaymentRecordDto } from '@/lib/api/PaymentRecordDto.ts'
import type { PaymentRecord } from '@/lib/model/PaymentRecord.ts'

class PaymentRecordMapper {
  static toModel(dto: PaymentRecordDto): PaymentRecord {
    return {
      eventId: dto.eventId,
      dateCreated: dto.dateCreated,
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
        installmentInterval: dto.installmentInterval,
        frequency: dto.frequency,
        numberOfInstallments: dto.numberOfInstallments,
      },
    }
  }
}

export default PaymentRecordMapper
