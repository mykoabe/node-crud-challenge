const express = require("express");
const router = express.Router();
const {
  getAllPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/personController");

// Routes
router.route("/").get(getAllPersons).post(createPerson);
router
  .route("/:id")
  .get(getPerson)
  .put(updatePerson)
  .delete(deletePerson);

module.exports = router;
