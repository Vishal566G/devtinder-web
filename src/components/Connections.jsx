import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h1 className="flex justify-center my-20 font-semibold text-2xl">
        No Connections Found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, age, gender, photoURL, _id, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 m-4 p-4 rounded-lg bg-base-200 w-[90%] sm:w-[70%] lg:w-[50%] mx-auto"
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
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>

              {age && gender && (
                <p className="text-sm opacity-70">
                  {age}, {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </p>
              )}

              <p className="text-sm">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
