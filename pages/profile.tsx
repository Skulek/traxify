import React from "react";
import { useUser } from "../lib/hooks";

const Profile = () => {
  const { user, isLoading } = useUser();
  return <div>{user?.firstName}</div>;
};

export default Profile;
