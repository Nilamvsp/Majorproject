const express = require("express")
const router = express.Router();
const Listing = require("../models/listing");
const ExpressErr = require("../utils/EspressErr");
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, renderNewForm, showListing, createNewListing, editListing, updateListing, deleteListing } = require("../controller/listing.js");

const multer  = require('multer');
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage});


router.route("/")
.get(index)
.post(isLoggedIn,  upload.single("image") ,validateListing,wrapAsync(createNewListing))
 
//New route
router.get("/new", isLoggedIn, renderNewForm);

router.route("/:id")
.get(wrapAsync(showListing))
.put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(updateListing)
)

.delete(isLoggedIn, isOwner, wrapAsync( deleteListing))

//edit route

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( editListing));



module.exports = router;