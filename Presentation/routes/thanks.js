const container = require("../../Common/di-container");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res, next) => {
  const cacheService = container.resolve("cacheService");
  const { user } = req.session;
  if(user){
    const expired = !await cacheService.get(`thanks-${user.hash}`);
    if(expired){
      res.redirect("/404");
    } else {
      next();
    }
  } else {
    res.redirect("/404");
  }
  
});

module.exports = router;
