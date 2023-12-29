'use strict';

/**
 * workout-plan service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::workout-plan.workout-plan');
