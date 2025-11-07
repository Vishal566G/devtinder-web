import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center my-20 font-semibold text-2xl">
        No Requests Found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold">Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, age, gender, photoURL, _id, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 m-4 p-4 rounded-lg bg-base-200 w-[90%] sm:w-[80%] mx-auto"
          >
            {/* LEFT — IMAGE */}
            <div className="flex-shrink-0">
              <img
                className="w-20 h-20 rounded-full object-cover"
                alt="photo"
                src={photoURL}
              />
            </div>

            {/* MIDDLE — USER INFO */}
            <div className="flex-1 text-center sm:text-left flex flex-col justify-center overflow-hidden">
              <h2 className="font-bold text-xl truncate">
                {firstName} {lastName}
              </h2>

              {age && gender && (
                <p className="text-sm opacity-70">
                  {age}, {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </p>
              )}

              <p className="text-sm text-wrap break-words line-clamp-none">
                {about}
              </p>
            </div>

            {/* RIGHT — BUTTONS */}
            <div className="flex flex-row sm:flex-col gap-3 sm:gap-2">
              <button
                className="btn btn-primary btn-sm sm:btn-md"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>

              <button
                className="btn btn-secondary btn-sm sm:btn-md"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
