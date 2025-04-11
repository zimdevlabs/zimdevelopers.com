import { db } from "@/server/db";

export async function getUserPosition(userId: string) {
  try {
    // Get all users sorted by total points in descending order
    const allUsers = await db.query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.totalPoints)],
    });

    // Find the position of the current user
    const userPosition = allUsers.findIndex((user) => user.id === userId) + 1;
    const totalUsers = allUsers.length;

    return {
      position: userPosition,
      totalUsers,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching user position:", error);
    return {
      position: 0,
      totalUsers: 0,
      error: "An error occurred while fetching user position",
    };
  }
}
