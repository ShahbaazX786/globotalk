import API from "./api.config";

const getStreamToken = async () => {
  const response = await API.get(`/chat/token`);
  return response.data;
};

export { getStreamToken };
