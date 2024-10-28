const { v4: uuidv4 } = require("uuid");
const asyncAwaitHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse.util");
const validatePersonData = require("../validators/personValidator");

/**
 * @description Get all persons
 * @route GET /api/v1/persons
 */
const getAllPersons = asyncAwaitHandler((req, res) => {
  const persons = req.app.get("db");
  res.json(persons);
});

/**
 * @description Get a person by ID
 * @route GET /api/v1/persons/:id
 */
const getPerson = asyncAwaitHandler((req, res, next) => {
  const { id } = req.params;
  const persons = req.app.get("db");
  const person = persons.find((p) => p.id === id);

  if (person) {
    return res.json(person);
  } else {
    return next(new ErrorResponse("Person not found", 404));
  }
});

/**
 * @description Create a person
 * @route POST /api/v1/persons
 */
const createPerson = asyncAwaitHandler((req, res, next) => {
  // Validate input data
  const errors = validatePersonData(req.body);
  if (errors.length > 0) {
    return next(new ErrorResponse(errors.join(", "), 400));
  }

  const { name, age, hobbies } = req.body;
  const persons = req.app.get("db");

  // Create a new person
  const newPerson = { id: uuidv4(), name, age, hobbies };
  persons.push(newPerson);
  req.app.set("db", persons);

  res.status(201).json({
    message: "Person created",
    person: newPerson,
  });
});

/**
 * @description Update a person
 * @route PUT /api/v1/persons/:id
 */
const updatePerson = asyncAwaitHandler((req, res, next) => {
  const { id } = req.params;
  const { name, age, hobbies } = req.body;
  const persons = req.app.get("db");
  const personIndex = persons.findIndex((p) => p.id === id);

  if (personIndex === -1) {
    return next(new ErrorResponse("Person not found", 404));
  }

  if (!name || typeof age !== "number" || !Array.isArray(hobbies)) {
    return next(new ErrorResponse("Invalid input", 400));
  }

  persons[personIndex] = { id, name, age, hobbies };
  req.app.set("db", persons);

  res.json({
    message: "Person updated",
    person: persons[personIndex],
  });
});

/**
 * @description Delete a person
 * @route DELETE /api/v1/persons/:id
 */
const deletePerson = asyncAwaitHandler((req, res, next) => {
  const { id } = req.params;
  const persons = req.app.get("db");
  const personIndex = persons.findIndex((p) => p.id === id);

  if (personIndex === -1) {
    return next(new ErrorResponse("Person not found", 404));
  }

  persons.splice(personIndex, 1);
  req.app.set("db", persons);

  res.status(204).send(); // No content
});

module.exports = {
  getAllPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
