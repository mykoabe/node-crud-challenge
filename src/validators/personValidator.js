const fields = [
  { key: "name", required: true, type: "string", message: "Name is required" },
  { key: "age", required: true, type: "number", message: "Age is required" },
  {
    key: "hobbies",
    required: true,
    type: "array",
    message: "Hobbies must be an array",
  },
];

const validatePersonData = (data) => {
  const errors = [];

  fields.forEach(({ key, required, type, message }) => {
    // Check for required fields
    if (
      required &&
      (data[key] === undefined || data[key] === null || data[key] === "")
    ) {
      errors.push(message);
    } else if (data[key] !== undefined) {
      // Check for type correctness
      if (type === "number" && typeof data[key] !== "number") {
        errors.push(
          `${key.charAt(0).toUpperCase() + key.slice(1)} must be a ${type}`
        );
      }
      if (type === "array" && !Array.isArray(data[key])) {
        errors.push(
          `${key.charAt(0).toUpperCase() + key.slice(1)} must be a ${type}`
        );
      }
    }
  });

  return errors;
};

module.exports = validatePersonData;
