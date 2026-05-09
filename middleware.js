const Listing = require("./models/listing");
const Review = require("./models/review.js")
const ExpressErr = require("./utils/EspressErr");
const { listingSchema, reviewSchema } = require("./schema.js");




module.exports.validateListing = (req, res, next) => {
    let listingData = {};

    // handle both cases safely
    if (req.body.listing) {
        listingData = req.body.listing;
    } else {
        listingData = req.body;
    }

    const { error } = listingSchema.validate({
        listing: listingData
    });

    if (error) {
        let msg = error.details.map(e => e.message).join(",");
        throw new ExpressErr(400, msg);
    }

    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressErr(400, errMsg);
    } else {
        next();
    }
};





module.exports.isLoggedIn = (req,res,next)=>{
    
     if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error","need to login");
        return res.redirect("/login");
    }
    next()
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();

}

module.exports.isOwner= async(req,res,next)=>{
    let { id } = req.params;
            let listing = await Listing.findById(id);
            if (!listing.owner.equals(res.locals.currentUser._id)) {
                req.flash("error", "you can not update");
                return res.redirect(`/listings/${id}`);
            }
            next();
}

module.exports.isreviewAuthor= async(req,res,next)=>{
    let {id, reviewId } = req.params;
            let review = await Review.findById(reviewId);
            if (!review.author.equals(res.locals.currentUser._id)) {
                req.flash("error", "you can not delete review");
                return res.redirect(`/listings/${id}`);
            }
            next();
}
