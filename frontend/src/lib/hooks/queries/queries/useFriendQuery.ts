import { useQuery } from "@tanstack/react-query";
import {
  getFriendList,
  getFriendRequests,
  getRecommendedUsers,
  getSentFriendRequests,
} from "../../../api/api.user";

const useFriendQuery = () => {
  const friendReqs = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    retry: false,
  });

  return {
    isLoading: friendReqs?.isLoading,
    friendReqs: friendReqs?.data,
    error: friendReqs?.error,
  };
};

const useFriendListQuery = () => {
  const friendList = useQuery({
    queryKey: ["friends"],
    queryFn: getFriendList,
  });

  return {
    isLoading: friendList?.isLoading,
    friendList: friendList?.data as [],
    error: friendList?.error,
  };
};

const useSentFriendReqQuery = () => {
  const sentReqs = useQuery({
    queryKey: ["sentFriendReqs"],
    queryFn: getSentFriendRequests,
  });

  return {
    isLoading: sentReqs?.isLoading,
    sentReqs: sentReqs?.data,
    error: sentReqs?.error,
  };
};

const useGetRecommendedUserQuery = () => {
  const recommendedList = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  return {
    isLoading: recommendedList?.isLoading,
    recommendedList: recommendedList?.data,
    error: recommendedList?.error,
  };
};

export default useFriendQuery;
export {
  useFriendListQuery,
  useGetRecommendedUserQuery,
  useSentFriendReqQuery,
};
