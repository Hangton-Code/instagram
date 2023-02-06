import { followUser, unfollowUser } from "@/utils/db";
import protectApiRoute from "@/utils/protectApiRoute";

export default protectApiRoute(async (req, res, session) => {
  // body validation
  if (req.method === "PATCH") {
    const follow_id = req.query.id as string;

    // if already following
    if (session.user.following_ids.includes(follow_id))
      return res.status(400).json({
        error: true,
        message: "target has been followed by you",
      });

    // fetch db
    const dbRes = await followUser(follow_id, session.user);
    if (!dbRes)
      return res.status(400).json({
        error: true,
        message: "target does not exist, or server error",
      });

    return res.send("success");
  } else if (req.method === "DELETE") {
    const unfollow_id = req.query.id as string;

    // if already unfollowed
    if (!session.user.following_ids.includes(unfollow_id))
      return res.status(400).json({
        error: true,
        message: "target has been unfollowed by you",
      });

    // fetch db
    const dbRes = await unfollowUser(unfollow_id, session.user);
    if (!dbRes)
      return res.status(400).json({
        error: true,
        message: "target does not exist, or server error",
      });

    return res.send("success");
  } else {
    return res.status(404).end();
  }
});
