const Joi = require('joi');

let datesSchema = Joi.object().keys({
    checkIn: Joi.date(), // .format('YYYY-MM-DD')
    checkOut: Joi.date() // format('YYYY-MM-DD')
});


// destination schemas
const geoLocationInfoSchema = Joi.object().keys({
    latitude: Joi.number(),
    longitude: Joi.number(),
    radiusKm: Joi.number(),
});
let destinationSchema = Joi.object().keys({
    type: Joi.number().integer().required(),
    destinationId: Joi.string().required(),
    hotelIds: Joi.array().items(Joi.string()).required(),
    geoLocationInfo: geoLocationInfoSchema,
});


// roomsInfo schemas
let roomsInfoItemSchema = Joi.object().keys({
    adultsCount: Joi.number().integer().required(),
    kidsAges: Joi.array().items(Joi.number().integer()).required(),
});


// searchRequest schema
const searchRequestSchema = Joi.object().keys({
    nationality: Joi.string().required(), // 'UAE'
    residency: Joi.string().required(), // 'GB'
    dates: datesSchema,
    destination: destinationSchema,
    roomsInfo: Joi.array().items(roomsInfoItemSchema),
})


// search request schema
const searchSchema = Joi.object().keys({
  clientIp: Joi.string().required(),
  language: Joi.string().valid(['en', 'ar']).required(),
  currency: Joi.string().valid(['EUR', 'SAR', 'AED', 'USD']).required(),
  timeoutSeconds: Joi.number().integer().required(),
  searchRequest: searchRequestSchema,
});

module.exports = searchSchema;
