const express = require("express")
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review.js");
const Listing = require("../models/listing");
const {validateReview, isLoggedIn, isreviewAuthor} = require("../middleware.js");
const { createNewReview, deleteReview } = require("../controller/review.js");


router.post("/", isLoggedIn, validateReview,wrapAsync(createNewReview))


//Review Delete Route

router.delete("/:reviewId",isLoggedIn, isreviewAuthor, wrapAsync(deleteReview));


module.exports = router;