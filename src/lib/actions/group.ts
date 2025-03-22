import { groupRatings, groups, userRatings } from "@/demo/data";

export function getGroupRatings(id: string) {
  return groupRatings.filter((rating) => rating.groupId == id);
}

export function getUserGroup(id: string) {
  return groups.find((group) => group.id == id);
}

export function getUserRatings(id: string) {
  return userRatings.filter((rating) => rating.userId == id);
}
