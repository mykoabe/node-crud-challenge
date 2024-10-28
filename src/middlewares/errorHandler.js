const ErrorResponse = require("../utils/errorResponse.util");

const errorHandler = (err, req, res, next) => {
  let error;

  if (err instanceof ErrorResponse) {
    error = err;
  } else {
    error = new ErrorResponse(
      err?.message || "An unexpected error occurred. Please try again later",
      500
    );
    // console.error(err);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

const urlNotFound = (req, res, next) => {
  const error = new ErrorResponse(`URL ${req.originalUrl} not found 🤷‍♂️`, 404);
  return next(new ErrorResponse(error.message, error.statusCode));
};

module.exports = { errorHandler, urlNotFound };
