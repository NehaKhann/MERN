//?await schema.parseAsync(req.body) is the line where you
//use zod to validate the request body against the defined schema

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const message = "Fill the input properly";
    const extraDetails = err.errors[0].message;
    const status = 422;
    const error = {
      status,
      message,
      extraDetails,
    };

    // res.status(400).json({ msg: message });
    console.log(error);
    next(error);
  }
};
module.exports = validate;
