const Joi = require('joi');

// body searchRequest dates schema
let datesSchema = Joi.object().keys({
    checkIn: Joi.date(),
    checkOut: Joi.date()
});

// body searchRequest destination geoLocationInfo schema
const geoLocationInfoSchema = Joi.object().keys({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    radiusKm: Joi.number().required(),
});

// body searchRequest destination schema
let destinationSchema = Joi.object().keys({
    type: Joi.number().integer().required(),
    destinationId: Joi.string().required(),
    hotelIds: Joi.array().items(Joi.string()).required(),
    geoLocationInfo: geoLocationInfoSchema,
});

// body searchRequest roomsInfo Item schema
let roomsInfoItemSchema = Joi.object().keys({
    adultsCount: Joi.number().integer().required(),
    kidsAges: Joi.array().items(Joi.number().integer()).required(),
});

// body searchRequest schema
const searchRequestSchema = Joi.object().keys({
    nationality: Joi.string().required(),
    residency: Joi.string().required(),
    dates: datesSchema,
    destination: destinationSchema,
    roomsInfo: Joi.array().items(roomsInfoItemSchema),
})

// body schema
const requestBodySchema = Joi.object().keys({
  clientIp: Joi.string().required(),
  language: Joi.string().valid(['en', 'ar']).required(),
  currency: Joi.string().valid(['EUR', 'SAR', 'AED', 'USD']).required(),
  timeoutSeconds: Joi.number().integer().required(),
  searchRequest: searchRequestSchema,
});

module.exports = requestBodySchema;
