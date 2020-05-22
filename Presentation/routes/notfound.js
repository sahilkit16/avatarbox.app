const ErrorVM = require("../view-models/error.vm");
const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  const model = new ErrorVM();
  model.title = "Page Not Found | Avatar Box";
  model.subtitle = "404 Page Not Found";
  model.message = "The page you are looking for could not be found.";
  return res.status(404).render("error", model);
});

module.exports = router;
