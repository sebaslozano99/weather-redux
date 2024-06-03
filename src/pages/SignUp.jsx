import { useReducer } from "react";
import { UseAuthContext } from "../contexts/AuthContext";
import { UseTempContext } from "../contexts/TempContext";


const initialState = {
    userName: "",
    email: "",
    password: "",
    confirm: "",
}

function reducer(state, action){
    switch(action.type){
       
        case "email/onChange":
            return {
                ...state,
                email: action.payload,
            }
        case "password/onChange":
            return {
                ...state,
                password: action.payload,
            }
        case "confirm/onChange":
            return {
                ...state,
                confirm: action.payload,
            }
        default: throw new Error("Unknown action type!");
    }
}


const SignUp = () => {

    const { theme } = UseTempContext();
    const [{ email, password, confirm}, dispatch] = useReducer(reducer, initialState);
    const { signUp, authLoading, error } = UseAuthContext();

  return (

    <div className={`${theme ? "bg-[#252525]" : "bg-blue-500"} w-full h-screen transition-all ease-in-out duration-300 flex items-center justify-center flex-col`} >

        <h2 className={`mb-4 text-xl ${theme && "text-white"}`}>Sign Up</h2>

        <form className="w-[20em] h-auto" onSubmit={(e) => signUp(e, email, password, confirm)} >

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

            <input type="password"
             name="confirm password"
             placeholder="confirm password"
             className={!confirm ? "border-[1px] border-black p-2 w-full my-[3px] rounded outline-none" :  confirm === password ? "border-[1px] border-green-500 p-2 w-full my-[3px] rounded outline-none" : "border-[2px] border-red-500 w-full my-[3px] rounded p-2 outline-none"} 
             value={confirm}
             onChange={(e) => dispatch({type: "confirm/onChange", payload: e.target.value })}
             required
             />

        </form>

        <button 
            className="bg-white px-3 py-1 rounded mt-3" 
            disabled={authLoading}
            onClick={(e) => signUp(e, email, password, confirm)}
            >
                { authLoading ? "Loading..." : "Sign up" }
        </button>

        {
            error && 

            <p className={`${theme && "text-white"}`} >{error}</p>
        }


    </div>

  )
}

export default SignUp
