import GoogleSheet from '../api/googleSheetApi.ts'

const sheet = new GoogleSheet()

const output = await sheet.loadSheetData('1vC51T8jpZETYYErLEE4n820aHKrldKx14_HZRoHG4kk', 'A2:U4')

await GoogleSheet.saveToFile(output, 'sheet-data-raw.json')

const rawPaymentRecords = GoogleSheet.parseSpreadsheet(output)

await GoogleSheet.saveToFile(rawPaymentRecords, 'sheet-data.json')

console.log(`Found payment records ${rawPaymentRecords.length}`)

