'use strict';

/**
 * rpe service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::rpe.rpe');
