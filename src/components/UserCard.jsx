import axios from "axios";
import { useDispatch } from "react-redux";

const UserCard = ({ user, showActions = true }) => {
  const { firstName, lastName, age, gender, about, photoURL, _id } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserfromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm overflow-hidden">
      <figure className="h-60 w-full overflow-hidden bg-base-200">
        <img
          src={photoURL}
          alt={firstName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>

        {age && gender && (
          <p>
            {age}, {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </p>
        )}

        <p className="line-clamp-3">{about}</p>

        {/* ✅ Render action buttons ONLY if showActions === true */}
        {showActions && (
          <div className="card-actions justify-between my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
