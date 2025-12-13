import API from "./api.config";

const getRecommendedUsers = async () => {
  const response = await API.get("/user/recommendations");
  return response.data;
};

const getFriendList = async () => {
  const response = await API.get("/user/friends");
  return response.data;
};

const getOutgoingFriendRequests = async () => {
  const response = await API.get("/user/outgoing-friend-requests");
  return response.data;
};

const sendFriendRequest = async (id: string) => {
  const response = await API.get(`/user/friend-req/${id}`);
  return response.data;
};

export {
  getFriendList,
  getOutgoingFriendRequests,
  getRecommendedUsers,
  sendFriendRequest,
  j,
};
