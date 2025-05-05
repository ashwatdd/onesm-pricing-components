import type { PaymentRecordDto } from '@/lib/api/PaymentRecordDto.ts'
import { api } from '@/lib/api/apiClient.ts'

class PaymentRecordApi {
  async getPaymentRecords(): Promise<GetPaymentRecordResponse> {
    return await api.get<GetPaymentRecordResponse>('payment-record').json()
  }
}

export default new PaymentRecordApi()

export interface GetPaymentRecordResponse {
  paymentRecords: PaymentRecordDto[]
}
