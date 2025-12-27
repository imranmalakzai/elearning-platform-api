import ApiError from "../utils/api_error.js";

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError("Access denied", 403);
    }
    next();
  };
};
