import type { CourseType } from '@/lib/model/CourseType.ts'
import type PriceData from '@/lib/model/PriceData.ts'
import type PricingConfiguration from '@/lib/model/PricingConfiguration.ts'
import { round } from '@/lib/utils.ts'

class PriceService {
  doesCourseProvide15PercentDiscount(courseType: CourseType): boolean {
    return courseType === 'bootcamp'
  }

  doesCourseProvideComboDiscount(courseType: CourseType): boolean {
    return courseType === 'comprehensive-course'
  }

  /**
   * Calculates the hourly rate for a given number of tutoring hours.
   *
   * Rules:
   * - Hours between 5-10 are billed at $195/hr
   * - Hours between plan tiers use weighted average pricing
   * - Plans >60 hours use the same hourly rate as the 60-hr plan
   * - We don't offer plans less than 5 hours
   */
  calculateHourlyRate(tutoringPrices: PriceData['tutoringHourPrices'], hours: number): number {
    if (!tutoringPrices || tutoringPrices.length < 1) {
      throw new Error('No tutoring prices found')
    }

    // We don't offer plans less than 5 hours
    if (hours < 5) {
      throw new Error('Minimum tutoring package is 5 hours')
    }

    // For hours less than 10, use a fixed rate
    if (hours < 10) {
      return tutoringPrices[0]!.hourlyRate
    }

    // For hours greater than or equal to the max, use that hourly rate
    const maxHours = tutoringPrices.reduce((max, current) =>
      current.hours > max.hours ? current : max, { hourlyRate: 0, hours: 0 })

    if (hours >= maxHours.hours) {
      return maxHours.hourlyRate
    }

    // Find the two price points that our hour count falls between
    let lowerPricePoint = tutoringPrices[0]!
    let upperPricePoint = tutoringPrices[1]!

    for (let i = 1; i < tutoringPrices.length; i++) {
      if (hours <= tutoringPrices[i]!.hours) {
        lowerPricePoint = tutoringPrices[i - 1]!
        upperPricePoint = tutoringPrices[i]!
        break
      }
    }

    // If the hours exactly match a price point, return that price point's rate
    if (hours === upperPricePoint.hours) {
      return upperPricePoint.hourlyRate
    }

    // Calculate weighted average for hours that fall between price points
    const hourRange = upperPricePoint.hours - lowerPricePoint.hours
    const hoursAboveLower = hours - lowerPricePoint.hours
    const rateDifference = lowerPricePoint.hourlyRate - upperPricePoint.hourlyRate

    // Calculate weighted average
    // As hours get closer to upperPricePoint, the rate approaches upperPricePoint.hourlyRate linearly
    return lowerPricePoint.hourlyRate - (rateDifference * (hoursAboveLower / hourRange))
  }

  calculateDiscountedTutoringPrice(tutoringHourPrices: PriceData['tutoringHourPrices'], tutoringHours: number, courseType: CourseType): number {
    const hourlyRate = this.calculateHourlyRate(tutoringHourPrices, tutoringHours)
    let tutoringPrice = tutoringHours * hourlyRate

    if (this.doesCourseProvide15PercentDiscount(courseType)) {
      tutoringPrice = tutoringPrice * 0.85 // 15% discount
    }
    else if (this.doesCourseProvideComboDiscount(courseType)) {
      if (tutoringHours <= 20) {
        tutoringPrice = tutoringPrice -= 700
      }
      else if (tutoringHours < 30) {
        tutoringPrice = tutoringPrice -= 600
      }
      else if (tutoringHours >= 30) {
        tutoringPrice = tutoringPrice -= 500
      }
    }
    return tutoringPrice
  }

  priceCalculator(
    prices: PriceData,
    config: PricingConfiguration,
  ): number {
    let total = 0

    if (config.courseType === 'comprehensive-course') {
      total += prices.coursePrices.comprehensiveCoursePrice
    }
    else if (config.courseType === 'bootcamp') {
      total += prices.coursePrices.bootcampPrice
    }

    if (config.tutoringHours > 0) {
      // Calculate tutoring price based on hourly rate and number of hours
      total += this.calculateDiscountedTutoringPrice(
        prices.tutoringHourPrices,
        config.tutoringHours,
        config.courseType,
      )
    }
    if (config.premiumTutor) {
      total += prices.addonPrices.premiumTutorPrice
    }
    if (config.aamcContent) {
      total += prices.addonPrices.aamcContentPrice
    }
    if (config.uworldContent) {
      total += prices.addonPrices.uworldContentPrice
    }

    return round(total, 2)
  }
}

export default new PriceService()
