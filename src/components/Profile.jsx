import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

export const Profile = () => {
  const user = useSelector((store) => store.user);

  // Wait for user data to load
  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};
