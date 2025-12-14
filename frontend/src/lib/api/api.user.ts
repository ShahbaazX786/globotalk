import API from "./api.config";

const getRecommendedUsers = async () => {
  const response = await API.get("/user/recommendations");
  return response.data;
};

const getFriendList = async () => {
  const response = await API.get("/user/friends");
  return response.data;
};

const getSentFriendRequests = async () => {
  const response = await API.get("/user/sent-friend-requests");
  return response.data;
};

const sendFriendRequest = async (userId: string) => {
  const response = await API.get(`/user/friend-request/${userId}`);
  return response.data;
};

const getFriendRequests = async () => {
  const response = await API.get(`/user/friend-requests`);
  return response.data;
};

const acceptFriendRequest = async (requestId: string) => {
  const response = await API.put(`/user/friend-request/${requestId}`);
  return response.data;
};

export {
  acceptFriendRequest,
  getFriendList,
  getFriendRequests,
  getSentFriendRequests,
  getRecommendedUsers,
  sendFriendRequest,
};
