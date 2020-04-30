const { Router } = require('express');
const router = Router();

router.post('/activate', (req, res) => {
  res.render('confirm');
})

module.exports = router;