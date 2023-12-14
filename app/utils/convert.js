import Freecurrencyapi from '@everapi/freecurrencyapi-js';

// I will hide api key later
const freecurrencyapi = new Freecurrencyapi(process.env.API_KEY);

// To get all currencies
async function getAllCurrencies() {
  const data = await freecurrencyapi.currencies();
  return data.data;
}

// Conver from one currency to another with default values
async function convert(from, to, amount) {

  const data = await freecurrencyapi.latest({
    base_currency: from,
    currencies: to
  });

  // return only the value in numbers (2 digits only)
  return (parseInt(amount) * data.data[to]).toFixed(2);
}


export {convert, getAllCurrencies}