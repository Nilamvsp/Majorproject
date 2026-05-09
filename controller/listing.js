const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you are accessing doesn't exist or deleted");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
}

module.exports.createNewListing = async (req, res, next) => {
    //  let {title, description, image,price,location,country} = req.body  
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created!!");
    res.redirect("/listings");
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
        throw new ExpressErr(404, "Listing not found");
    }

    // ✅ SAFE body handling
    const data = req.body.listing || {};

    listing.title = data.title || listing.title;
    listing.description = data.description || listing.description;
    listing.price = data.price || listing.price;
    listing.location = data.location || listing.location;
    listing.country = data.country || listing.country;

    // ✅ image update only if file uploaded
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save();

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};



module.exports.deleteListing = async (req, res) => {
    let { id } = req.params
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings")
}
