const Validator = require("validator");

module.exports = function validateCommentInput(data) {
  data.comment = !!data.comment ? data.comment : "";

  let errors = {};

  if (Validator.isEmpty(data.comment)) {
    errors.comment = "Comment is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
