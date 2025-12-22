import ApiError from "../utils/api_error.js";
const errorHandlerMiddleWare = (err, req, res, next) => {
  try {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ ...err, message: err.message });
    }
    res.status(err.statusCode || 500).json({ ...err, message: err.message });
  } catch (error) {
    res.status(500).json({ ...error, message: error.message });
  }
};
export default errorHandlerMiddleWare;
