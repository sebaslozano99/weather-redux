import { useReducer } from "react";
import { UseAuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { UseTempContext } from "../contexts/TempContext";



const initialState = {
    email: "",
    password: "",
}


function reducer(state, action){
    switch(action.type){
        case "email/onChange":
            return{
                ...state,
                email: action.payload,
            }
        case "password/onChange":
            return {
                ...state,
                password: action.payload,
            }
        default: throw new Error("Unknown action type!");
    }
}

const LogIn = () => {

    const [{email, password}, dispatch] = useReducer(reducer, initialState);
    const { theme } = UseTempContext();
    const { authLoading, logIn, error } = UseAuthContext();


  return (
    <div className="w-full h-screen transition-all ease-in-out duration-300 flex items-center justify-center flex-col">
      <h2 className={`mb-4 text-xl ${theme ? "text-white" : "text-black"}`}>Log In</h2>
      
      <form className="w-[20em] h-auto" onSubmit={(e) => logIn(e, email, password)} >

            <input 
            type="email" 
            name="email" 
            placeholder="youremail@yahoo.com" 
            className="border-[1px] border-black p-2 w-full my-[3px] rounded outline-none" 
            value={email}
            onChange={(e) => dispatch({type: "email/onChange", payload: e.target.value })}
            required
            />

            <input type="password"
             name="password"
             placeholder="password"
             className="border-[1px] border-black p-2 w-full my-[3px] rounded outline-none" 
             value={password}
             onChange={(e) => dispatch({type: "password/onChange", payload: e.target.value })}
             required
             />

             <p className={ `text-center my-2 ${theme ? "text-white" : "text-black"}` } >You don&apos;t have an account yet? <span className={`cursor-pointer text-white underline ${theme && "text-cyan-500"}`}><Link to="/signup">Sign up</Link></span></p>

      </form>


      <div className="w-40 h-20 flex flex-col items-center">
        <button 
          className="bg-white px-3 py-1 rounded w-full" 
          disabled={authLoading}
          onClick={(e) => logIn(e, email, password)}
        >
          { authLoading ? "Loading..." : "Log in" }
        </button>

        { 
          error && 

          <p  className={ theme && "text-white mt-3" } >{error}</p>
        }
      </div>

    </div>
  )
}

export default LogIn
