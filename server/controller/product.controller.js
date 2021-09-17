
const { googleTranslate, getEtsyActiveListings, getEtsyImageURL} = require('../service/product.service');
const { convertToDOGECoin} = require('../service/crypto.service');
const { catchAsync } = require('../utils/catchAsync');

/**
 * @param {express.Request} req Express request object
 * @param {express.Response} res Express response object
 * @param {express.NextFunction} next Express next func
 */
exports.fetchAllProducts = catchAsync(async (req, res, next) => {
    // TODO step 1: GC Translate user's inputs into English and detect user's input language
	const userInput = req.query.search;
	const translateResults = await googleTranslate(userInput, 'en');
	const {translatedText, detectedSourceLanguage}  = translateResults[0];

	// TODO step 2: Given translated input from Step 1, call Etsy's API to return a list of relevant listings
	const listings = await getEtsyActiveListings(translatedText);
	
	// TODO step 3: Given detected language, GC translates Etsy's listing title to user's language (and display on product card)
    let titles = listings.map(({title}) => title);
	const translateListingTitles = await googleTranslate(titles, detectedSourceLanguage);
	translateListingTitles.forEach((result, index) => {
		listings[index].title = result.translatedText;
    });
	
	const delay = (ms = 50) => new Promise(r => setTimeout(r, ms));
	for(let listing of listings) {
		await delay();
		
		// TODO step 4: Given Etsy's price & currency (from Step 3) -> call Nomics's API to convert into DOGE coin (and display on product card)
		const { price, currency_code, listing_id } = listing;
		const convertedPrice = await convertToDOGECoin(price, currency_code);
		listing.price = convertedPrice;
		listing.currency_code = process.env.CRYPTOCURRENCY;


		// TODO step 5: Given Etsy's listing ID (from Step 3) -> call Etsy's API to get images' URL  (and display on product card)
		const imageResponse = await getEtsyImageURL(listing_id);
		listing.image_url = imageResponse;
	}

	res.status(200).json({
		message: 'ok',
		data: [...listings.map(({title, image_url, price}) => ({
			title,
			image_url,
			price,
		}))]
	});
});