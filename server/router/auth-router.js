const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");


router.route("/").get(authControllers.home);
//check if user entered data is valid according to zod schema
router.route("/register").post(validate(signupSchema),authControllers.register);
router.route("/login").post(authControllers.login);
module.exports = router;
