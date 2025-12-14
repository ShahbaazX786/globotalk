import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircleIcon,
  MapIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import {
  getFriendList,
  getOutgoingFriendRequests,
  getRecommendedUsers,
  sendFriendRequest,
} from "../lib/api/api.user";
import NoFriendsFound from "../components/Misc/NoFriendsFound";
import { cn } from "../utils/classMerge";

const HomePage = () => {
  const queryClient = useQueryClient();

  const [outgoingRequestsIds, setOutGoingRequestIds] = useState<Set<string>>(
    new Set()
  );

  const { data: friendList = [], isLoading: isFriendListLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriendList,
  });

  const { data: RecommendedList, isLoading: isRecommendedListLoading } =
    useQuery({
      queryKey: ["users"],
      queryFn: getRecommendedUsers,
    });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendRequests,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req: any) => {
        outgoingIds.add(req?.recipient._id);
      });
      setOutGoingRequestIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <section id="HomePage" className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to={"/notifications"} className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {isFriendListLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friendList.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friendList.map((friend: any) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section id="recommended-users">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your
                  profile
                </p>
              </div>
            </div>
          </div>

          {isRecommendedListLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : RecommendedList.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No recommendations available
              </h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {RecommendedList.map((user: any) => {
                const hasRequestBeenSent = outgoingRequestsIds?.has(user._id);
                return (
                  <div
                    key={user._id}
                    className="card caret-base-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16 rounded-full">
                          <img src={user?.profilePic} alt={user?.fullName} />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">
                            {user?.fullName}
                          </h3>
                          {user?.location && (
                            <div className="flex text-center text-xs opacity-70 mt-1">
                              <MapIcon className="size-3 mr-1" />
                              {user?.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="badge badge-secondary text-xs">
                          {getLanguageFlag(user?.nativeLanguage)}
                          Native:{user?.nativeLanguage}
                        </span>
                        <span className="badge badge-outline text-xs">
                          {getLanguageFlag(user?.learningLanguage)}
                          Native:{user?.learningLanguage}
                        </span>
                      </div>

                      {user?.bio && (
                        <p className="text-sm opacity-70">{user?.bio}</p>
                      )}

                      <button
                        className={cn(
                          "btn w-full mt-2",
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        )}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" /> Request
                            Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" /> Send Friend
                            Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

export default HomePage;
