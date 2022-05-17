const validation = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .send({ msg: 'Incorrect validation data. Please check input fields.' });
  }
};

module.exports = validation;
