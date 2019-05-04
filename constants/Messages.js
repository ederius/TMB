module.exports = {
  signin: {
    errors: {
      1: "Error signin",
      2: "Not found email",
      3: "Invalid password",
      invalidToken: "Invalid token!"
    },
    success: {
      1: "Success signin"
    }
  },
  auth: {
    errors: {
      userIWithoutPermissions: "User not have permissions for this action.",
      tokenDontSended: "Token not sent in the header."
    },
    success: {
      success: "Token valid"
    }
  },
  validations: {
      length: {
        max: {
          4: "The field must not have more than 4 characters",
          6: "The field must not have more than 6 characters",
          10: "The field must not have more than 10 characters",
          30: "The field must not have more than 30 characters",
          100: "The field must not have more than 100 characters",
          500: "The field must not have more than 500 characters"
        },
        min: {
          4: "The field must have more than 4 characters",
          6: "The field must have more than 6 characters",
          10: "The field must have more than 10 characters",
          30: "The field must have more than 30 characters"
        }
      },
      array: {
        length: {
          equal: {
            5: "The array must be of length equal to 5.",
            3: "The array must be of length equal to 3."
          }
        },
        error: "The element must be of type array"
      },
      isInt: {
        min: {
          1: "The number must not be less than 1.",
          8: "The number must not be less than 11111111."
        },
        max: {
          5: "The number must not be greater than 5.",
          15: "The number must not be greater than 999999999999999."
        }
      },
      string: "The field must be of string type",
      exist: "The field was not sent and it is required",
      not: "Empty field",
      email: "Invalid email format",
      numeric: "The parameter must be a number.",
      boolean: "The parameter must be a boolean (true or false)",
      emailRepeat: "User name or email already registered.",
      isBefore: "The date must be less than the current date.",
      isAfter: "The date must be after the current date.",
      ISODate: "The date sent does not have an ISO 8601 date format.",
      isURL: "The text sent does not have a URL format.",
      isMongoId: "The fiels must be mongo id type",
      error: "Error, some parameters sent do not comply with the mandatory characteristics.",
      serverError: "Uhhs.  error in the server"
    }
}