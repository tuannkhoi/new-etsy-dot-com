const axios = require('axios').default;
/**
 * get all Etsy active listings
 * @param {string} translatedText the translated search query
 * @param {integer} limit the number of listings Etsy should return
 * @returns {array} array of listings
 */
 exports.getEtsyActiveListings = async (translatedText) => {
	const ESTY_LISTINGS_URL = 'https://openapi.etsy.com/v2/listings';
	const listingResponse = await axios.get(`${ESTY_LISTINGS_URL}/active`, {
        params: {
            tags: translatedText,
            limit: process.env.LISTING_LIMIT,
            api_key: process.env.ETSY_API_KEY
        }
    });

    return listingResponse.data.results;
}
 
/**
 * get etsy listing image url by provided listing_id
 * only the first image url will be returned
 * @param {string} listing_id id of listing
 * @returns {string} Image URL of the provided listingId
 */
exports.getEtsyImageURL = async (listing_id) => {
	const ESTY_LISTINGS_URL = 'https://openapi.etsy.com/v2/listings';
    const imageResponse = await axios.get(`${ESTY_LISTINGS_URL}/${listing_id}/images`, {
		params: {
			listing_id,
			api_key: process.env.ETSY_API_KEY
		}
	});

	return imageResponse.data.results[0]['url_fullxfull'];
}

/**
 * translate text or array of text to destination language
 * @param {string | string[]} input the search input of user
 * @param {string} targetLang destination language
 * @returns {array} array of translated text
 */
exports.googleTranslate = async (input, targetLang) => {
	console.log(1);
    const GC_TRANSLATE_URL = `https://translation.googleapis.com/language/translate/v2`;
	const response = await axios.post(GC_TRANSLATE_URL, {
		q: input,
		target: targetLang
	},
	{
		params: {
			key: process.env.GOOGLE_API_KEY
		}
	});
    return response?.data?.data?.translations;
}