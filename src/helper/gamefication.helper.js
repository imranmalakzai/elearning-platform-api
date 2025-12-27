export const checkAndAwardBadge = async (user_id, conn) => {
  //user points
  const [[{ points }]] = await conn.query(
    "SELECT points FROM users WHERE id = ? ",
    [user_id]
  );

  //select all elegibale badges
  const [badges] = await conn.query(
    "SELECT id from badges WHERE points_required <= ?",
    [points]
  );

  //Get allready owned badges
  const [owned] = await conn.query(
    "select badge_id FROM user_badges WHERE user_id = ?",
    [user_id]
  );

  const ownedId = owned.map((b) => b.badge_id);

  //Insert missing badges
  for (const badge of badges) {
    if (!ownedId.includes(badge.id)) {
      await conn.query(
        "INSERT INTO user_badges (user_id,badge_id) VALUES (?,?)",
        [user_id, badge.id]
      );
    }
  }
};
