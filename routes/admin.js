const router = require('express').Router();
const User = require('../models/user.model');
const AdminController = require('../controllers/admin.controller')(User);

/**
 * GET: All Profiles.
 * 
 * @alias /Profiles
 * @see profiles.component
 */
router.route('/').get(AdminController.GetProfiles);

module.exports = router;