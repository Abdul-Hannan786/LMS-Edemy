import { clerkClient } from "@clerk/express";

// Update role to educator
export const updatRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({ success: true, message: "Now you can publish courses" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
