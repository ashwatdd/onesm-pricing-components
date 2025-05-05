import type { PaymentRecord } from '@/lib/model/PaymentRecord.ts'
import PaymentRecordApi from '@/lib/api/PaymentRecordApi.ts'
import PaymentRecordMapper from '@/lib/mappers/PaymentRecordMapper.ts'

class PaymentRecordRepository {
  async getPaymentRecords(): Promise<PaymentRecord[]> {
    const response = await PaymentRecordApi.getPaymentRecords()
    return response.paymentRecords.map(x => PaymentRecordMapper.toModel(x))
  }
}

export default new PaymentRecordRepository()
