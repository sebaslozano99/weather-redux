import { UseAuthContext } from "../contexts/AuthContext";



const Profile = () => {


    const { user } = UseAuthContext();

    console.log(user);


    //user: user?.user.id
    //email: user?.user.email

  return (
    <div className="border-2 border-red-500 w-full h-full" >
      <p>User: {user?.user.id}</p>
      <p>Email: {user?.user.email}</p>
    </div>
  )
}

export default Profile
