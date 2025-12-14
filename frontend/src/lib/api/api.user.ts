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

const sendFriendRequest = async (userId: string) => {
  const response = await API.get(`/user/friend-req/${userId}`);
  return response.data;
};

const getFriendRequests = async () => {
  const response = await API.get(`/user/friend-requests`);
  return response.data;
};

const acceptFriendRequest = async (requestId: string) => {
  const response = await API.get(`/user/friend-request/${requestId}/accept`);
  return response.data;
};

export {
  acceptFriendRequest,
  getFriendList,
  getFriendRequests,
  getOutgoingFriendRequests,
  getRecommendedUsers,
  sendFriendRequest,
};
