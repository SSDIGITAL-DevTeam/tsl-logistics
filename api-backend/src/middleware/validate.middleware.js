/**
 * Express middleware factory that validates req.body against a Zod schema.
 * On failure returns 400 with field-level error messages.
 */
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data;
    next();
  };
}

export function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        message: 'Invalid query parameters',
        errors: result.error.flatten().fieldErrors,
      });
    }
    req.query = result.data;
    next();
  };
}
