export default function getConvertedDate(momentData) {
  // return 
  //   const convertedYear = birth_date._d.getUTCFullYear()
  //   const convertedMonth = birth_date._d.getUTCMonth().length === 1 ? "0" + birth_date._d.getUTCMonth() : birth_date._d.getUTCMonth()
  //   const convertedDate = birth_date._d.getUTCDate().length === 1 ? "0" + birth_date._d.getUTCDate() : birth_date._d.getUTCDate()
  console.log(momentData._d.getUTCMonth())
    return(
    `${momentData._d.getUTCFullYear()}-${momentData._d.getUTCMonth()<9 ? "0" + String(momentData._d.getUTCMonth()+1) : momentData._d.getUTCMonth()+1}-${momentData._d.getUTCDate()<10 ? "0" + String(momentData._d.getUTCDate()+1) : momentData._d.getUTCDate()}`
    );
}