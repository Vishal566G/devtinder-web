import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_SVG } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || USER_SVG);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age: Number(age), gender, about, photoURL },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Edit Profile</legend>

            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="label">Age</label>
            <input
              type="text"
              className="input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
            <textarea
              className="textarea"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About"
            ></textarea>
            <label className="label">Gender</label>
            <input
              type="text"
              className="input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />

            {error && <p className="text-red-600 text-lg">{error}</p>}

            <button className="btn btn-neutral mt-4" onClick={saveProfile}>
              Save Profile
            </button>
          </fieldset>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoURL }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
