import type { CourseType } from '@/lib/model/CourseType.ts'

export default interface PricingConfiguration {
  courseType: CourseType
  tutoringHours: number
  premiumTutor: boolean
  aamcContent: boolean
  uworldContent: boolean
}
