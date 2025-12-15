import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, sendFriendRequest } from "../../../api/api.user";

const useAcceptFriendReq = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  return { isPending, error, acceptFriendReq: mutate };
};

const useSendFriendReq = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["sentFriendReqs"] }),
  });

  return { isPending, error, sendFriendReq: mutate };
};

export { useAcceptFriendReq, useSendFriendReq };
