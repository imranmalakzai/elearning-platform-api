export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    try {
      schema.parse(req[property]);
      next();
    } catch (error) {
      // Zod errors are in error.issues
      const errors = error.issues?.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      return res.status(400).json({
        success: false,
        message: errors[0].message || "validation error",
      });
    }
  };
};
