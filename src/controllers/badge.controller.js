import ApiError from "../utils/api_error.js";
import asyncHandler from "../utils/async_handler.js";
import {
  createBadge,
  badgeById,
  updateBadge as updateBadgeRepo,
  deleteBadge as deleteBadgeRepo,
  badges as getAllBadges,
} from "../repository/badges.repository.js";

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

//**Updte bade Admin only */
export const updateBadge = asyncHandler(async (req, res) => {
  const { badge_id } = req.params;
  const { name, description, points_required } = req.body;

  if (!name || !description || !points_required) {
    throw new ApiError("All fileds are required");
  }

  //badge exist
  const badge = await badgeById(badge_id);
  if (!badge) throw new ApiError("Badge not exist");

  //badge
  const result = await updateBadgeRepo(
    { name, description, points_required },
    badge_id
  );
  if (!result) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "Badge updated successfully" });
});

//**Delete badge Admin only */
export const deleteBadge = asyncHandler(async (req, res) => {
  const { badge_id } = req.params;

  //badge exist
  const badge = await badgeById(badge_id);
  if (!badge) throw new ApiError("Badge not exist", 404);

  //result
  const result = await deleteBadgeRepo(badge_id);
  if (!result) throw new ApiError("Internal server error", 500);

  res.status(200).json({ message: "badge deleted successfully" });
});

//**Get All badges */
export const badges = asyncHandler(async (req, res) => {
  const result = await getAllBadges();
  res.status(200).json({ badges: result || [] });
});
