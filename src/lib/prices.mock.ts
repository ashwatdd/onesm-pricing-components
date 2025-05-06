export interface PriceConfig {
  coursePrices: {
    comprehensiveCoursePrice: number
    bootcampPrice: number
  }
  addonPrices: {
    premiumTutorPrice: number
    uworldPrice: number
    aamcPrice: number
  }
}

export const priceMocks: PriceConfig = {
  coursePrices: {
    comprehensiveCoursePrice: 2500,
    bootcampPrice: 1950,
  },
  addonPrices: {
    premiumTutorPrice: 50,
    uworldPrice: 300,
    aamcPrice: 300,
  },
}
