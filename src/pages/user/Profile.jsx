import { useEffect } from "react";

const Profile = () => {

  useEffect(() => {
    document.title = "ChatStream • Profile";
  }, []);

  return (
    <div>
      <div className="">Profile</div>
    </div>
  );
};

export default Profile;
