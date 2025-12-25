import ApiError from "../utils/api_error.js";
import asyncHandler from "../utils/async_handler.js";
import { createBadge } from "../repository/badges.repository.js";

//** create badges Admin only */
export const createBadge = asyncHandler(async (req, res) => {
  const { name, description, points_required } = req.body;

  if (!name || !description || !points_required) {
    throw new ApiError("All fileds are required");
  }

  const badge = await createBadge({ name, description, points_required });
  if (!badge) throw new ApiError("Internal server error", 500);

  res.status(201).json({ message: "badge created successfully" });
});
