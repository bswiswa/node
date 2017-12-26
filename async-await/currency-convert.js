const axios = require("axios");

const getExchangeRate =  async (from, to) => {
    const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
    return response.data.rates[to];
};

//get countries that accept a given currency
const getCountries = async (currencyCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map(country => country.name);
};


const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then(tempCountries => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then(rate => {
        const exchangedAmount = amount * rate;
        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries ${countries.join(", ")}`;
    });
};


const convertCurrencyAlt = async (from, to, amount) => {
    let countries = await getCountries(to);
    let rate = await getExchangeRate(from, to);
    let exchangedAmount = amount*rate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries ${countries.join(", ")}`;
}

//getExchangeRate("USD", "CAD").then(rate => console.log(rate));
//
//getCountries("USD").then(countries => console.log(countries));

convertCurrency("ZAR", "USD", 100).then(conversion => console.log(conversion));

convertCurrencyAlt("USD", "EUR", 100).then(conversion => console.log(conversion));