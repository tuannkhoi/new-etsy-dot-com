const axios = require('axios').default;
/**
 * convert the price in Etsy's original currency to DOGE coin
 * @param {string | string[]} ids the (array of) cryptocurrency
 * @param {string} convert the original currency
 * @returns {integer} the listing's price in DOGE coin
 */
 exports.convertToDOGECoin = async (price, currency_code) => {
	const NOMICS_URL = 'https://api.nomics.com/v1/currencies/ticker'
	const nomicsResponse = await axios.get(NOMICS_URL, {
		params: {
			ids: process.env.CRYPTOCURRENCY,
			convert: currency_code,
			key: process.env.NOMICS_API_KEY
		}
	})
	let convertedPrice = price / nomicsResponse.data[0]['price'];
	return convertedPrice;
}