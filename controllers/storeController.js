const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .then(favourites => {
      const favouritesIds = favourites.map(fav => fav.houseId.toString());

      Home.find().then(registeredHomes => {
        console.log(favourites, registeredHomes);

        const favouriteHomes = registeredHomes.filter(home =>
          favouritesIds.includes(home._id.toString())
        );

        res.render("store/favourite-list", {
          favouriteHomes: favouriteHomes,
          pageTitle: "My Favourites",
          currentPage: "favourites",
        });
      });
    })
    .catch(err => console.log(err));
};

// exports.getFavouriteList = (req, res, next) => {
//   Favourite.find()
//     .populate('houseId')
//     .then(favourites => {
//       const favouriteHomes = favourites.map(fav => fav. houseId);
//         res.render("store/favourite-list", {
//           favouriteHomes: favouriteHomes,
//           pageTitle: "My Favourites",
//           currentPage: "favourites",
//         });
//       });
// };


exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;

  Favourite.findOne({ houseId: homeId })
    .then(fav => {
      if (fav) {
        console.log("Already marked as favourite");
      } else {
        const newFav = new Favourite({ houseId: homeId });
        newFav.save()
          .then(result => {
            console.log("Fav added:", result);
          })
          .catch(err => {
            console.log("Error saving favourite:", err);
          });
      }

      res.redirect("/favourites");
    })
    .catch(err => {
      console.log("Error while marking favourite:", err);
    });
};


exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({houseId:homeId}).then(result => {
    console.log('Fav Removed: ', result);
  }).catch(err => {
    console.log("Error while removing favourite: ", err);
  }).finally(() => {
    res.redirect("/favourites");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  })
};

