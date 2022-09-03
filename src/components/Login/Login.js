// import Home from "./Home/Home";
import { useContext, useState } from "react";
import { userContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { createWithEmailAndPassword, handleGoogleSignIn, handleWithSignOut, initializeLoginFramework, signInEmailAndPassword, resetEmail} from './LoginManager'


initializeLoginFramework()

function Login() {

  
  const [newUser,setNewUser] = useState(false)
  const [user,setUser] = useState({
    isSignIn : false,
    name : '',
    email: '',
    photo:'',
    password:'',
    error:'',
    success : false
  })
  const [loggedInUser , setLoggedInUser] = useContext(userContext);
  const navigate = useNavigate();
  const state = useLocation();
  

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      navigate(state?.path || "/shipment")
    })
  }

  const handleSignOut = () => {
    handleWithSignOut()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
    })
  }
  
  const handleBlur = (e) => {
    let isFormValid = true;
    if(e.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if(e.target.name === 'password'){
      isFormValid = /\d{1}/.test(e.target.value) && (e.target.value).length > 6;
    }
    if(isFormValid){
      const newUserInfo = {...user}
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createWithEmailAndPassword(user.name , user.email , user.password)
      .then(res => {
        setLoggedInUser(res);
        setUser(res);
        navigate(state?.path || "/shipment")
      })
    }
    if(!newUser && user.email && user.password){
      signInEmailAndPassword(user.email , user.password)
      .then(res => {
        setLoggedInUser(res);
        setUser(res);
        navigate(state?.path || "/shipment")
      })
    } 
    e.preventDefault()
  }
  
  return (
    <div style={{textAlign:"center"}}>
    { user.isSignIn ? <button onClick={handleSignOut}>Sign Out </button> :
      <button onClick={googleSignIn}>Sign In </button>
    }
    {
      user.isSignIn && <div>
        <p>Welcome, {user.name}</p>
        <p>Your Email : {user.email}</p>
        <img src={user.photo} alt="" />
      </div>
    }
    <div>
      <h2>Our Own Authentication</h2>
      <input type="checkbox" name="newUser" onChange={()=> setNewUser(true)} id="" />
      <label htmlFor="newUser">New User Sign In</label>
      <form action="" onSubmit={handleSubmit}>
      { newUser && <input type="text" name='name' placeholder='Your Name' onBlur={handleBlur} required/>}
        <br />
        <input type="email" name="email" id="" placeholder='Write Your Email Address' onBlur={handleBlur} />
        <br />
        <input type="password" name="password" id="" placeholder='Write Your Password' onBlur={handleBlur}/>
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <button onClick={()=>{resetEmail(user.email)}}>Reset Your Email</button>
      <p style={{color : 'red'}}>{user.error}</p>
      {user.success && <p style={{color : 'green'}}>User {newUser? "Generated" : "Logged In"} Successfully</p>}
    </div>
    </div>
  );
}


export default Login;
