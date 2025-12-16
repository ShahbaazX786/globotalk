import { BellIcon, ClockIcon, UserCheckIcon, UserPlus2 } from "lucide-react";
import NoNotificationsFound from "../../components/Misc/NoNotificationsFound";
import { useAcceptFriendReq } from "../../lib/hooks/queries/mutations/useFriendMutation";
import useAuthUser from "../../lib/hooks/queries/queries/useAuthQuery";
import useFriendQuery from "../../lib/hooks/queries/queries/useFriendQuery";
import { formatTo12HourDateTime } from "../../utils/helpers";

const NotificationsPage = () => {
  const { authUser } = useAuthUser();
  const { friendReqs, isLoading } = useFriendQuery();
  const pendingReqs = friendReqs?.pendingReqs || [];
  const acceptedReqs = friendReqs?.acceptedReqs || [];

  const { acceptFriendReq, isPending } = useAcceptFriendReq();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {pendingReqs?.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="size-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">
                    {pendingReqs?.length}
                  </span>
                </h2>

                <div className="space-y-3">
                  {pendingReqs.map((request: any) => (
                    <div
                      key={request._id}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="avatar size-14 rounded-full bg-base-300">
                              <img
                                src={request.sender.profilePic}
                                alt={request.sender.fullName}
                              />
                            </div>
                          </div>
                          <h3 className="font-semibold">
                            {request.sender.fullName}
                          </h3>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <span className="badge badge-secondary badge-sm">
                              Native:{request.sender.nativeLanguage}
                            </span>
                            <span className="badge badge-outline badge-sm">
                              Learning:{request.sender.learningLanguage}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => acceptFriendReq(request._id)}
                        disabled={isPending}
                      >
                        Accept
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {acceptedReqs?.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="size-5 text-primary" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedReqs.map((notification: any) => {
                    const isSender =
                      notification?.sender?._id === authUser?._id;

                    return (
                      <div
                        key={notification._id}
                        className="card bg-base-200 shadow-sm"
                      >
                        <div className="card-body p-4">
                          <div className="flex items-start gap-3">
                            <div className="avatar mt-1 size-10 rounded-full">
                              <img
                                src={
                                  isSender
                                    ? notification?.recipient?.profilePic
                                    : notification?.sender?.profilePic
                                }
                                alt={
                                  isSender
                                    ? notification?.recipient?.fullName
                                    : notification?.sender?.fullName
                                }
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {isSender
                                ? notification?.recipient?.fullName
                                : notification?.sender?.fullName}
                            </h3>
                            <p className="text-base my-1">
                              {isSender
                                ? `${notification?.recipient?.fullName} 
                              has accepted your friend Request`
                                : `You have accepted ${notification?.sender?.fullName}'s friend request`}
                            </p>
                            <p className="text-sm flex items-center opacity-70">
                              <ClockIcon className="size-4 mr-2" />
                              {formatTo12HourDateTime(notification?.updatedAt)}
                            </p>
                          </div>
                          <div className="badge badge-success text-white font-semibold p-4">
                            <UserPlus2 className="size-4 mr-2" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {pendingReqs?.length === 0 && acceptedReqs?.length === 0 && (
              <NoNotificationsFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
