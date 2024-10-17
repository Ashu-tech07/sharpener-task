import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";

const UserProfile = () => {
    
  return (
    <section >
      <h1 className={classes.profile}>Contact Details</h1>
      <ProfileForm />
    </section>
  );
};
export default UserProfile;