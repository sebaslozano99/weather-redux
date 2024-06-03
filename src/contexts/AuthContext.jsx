import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { clientSupabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";


const Auth = createContext();

const initialState = {
    user: null,
    error: "",
    authLoading: false,
}


function reducer(state, action){
    switch(action.type){
        case "user/signIn":
            return {
                ...state,
                user: action.payload,
            }
        case "user/signOut":
            return {
                ...state,
                user: null,
            }
        case "error/setError":
            return {
                ...state,
                error: action.payload,
            }
        case "authLoading/change":
            return {
                ...state,
                authLoading: action.payload,
            }
        default: throw new Error("Unknown action type!");
    }
}

const AuthContext = ({children}) => {


    const [{user,error,authLoading}, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    //listen to any auth changes such as sign in and sing out
    useEffect(() => {
        clientSupabase.auth.onAuthStateChange((event, session) => {
            console.log(session, event);
            if(session) dispatch({type: "user/signIn", payload: session});
            if(!session) dispatch({type: "user/signOut"})
        })
    }, [])


    useEffect(() => {
        if(error){
            setTimeout(() => {
                dispatch({type: "error/setError", payload: ""});
            }, 2500)
        }
    }, [error])


    async function signUp(e, email, password, confirm){
        e.preventDefault();

        if(!email || !password || !confirm) {
            alert("hello");
            return;
        }

        if(password !== confirm){
            alert("confirm your password appropiately!");
            return;
        }
        
        dispatch({type: "authLoading/change", payload: true});
        try{
            const { data, error } = await clientSupabase.auth.signUp({
                email,
                password,
            })

            if(error) {
                dispatch({type: "error/setError", payload: error.message});
                return;
            }

            console.log(data);
            navigate("/search");
        }
        catch(error){
            throw new Error(error);
        }
        finally{
            dispatch({type: "authLoading/change", payload: false});
        }
    }

    async function logIn(e, email, password){
        e.preventDefault();

        if(!email || !password) return;

        dispatch({type: "authLoading/change", payload: true});
        try{
            const { data, error } = await clientSupabase.auth.signInWithPassword({
                email,
                password,
            })

            if(error){
                dispatch({type: "error/setError", payload: error.message});
                return;
            }

            console.log(data);
            navigate("/search");
            
        }
        catch(error){
            throw new Error(error);
        }
        finally{
            dispatch({type: "authLoading/change", payload: false});
        }
    }

    async function logOut(){
        dispatch({type: "authLoading/change", payload: true});
        try{
            const { error } = await clientSupabase.auth.signOut();

            if(error){
                dispatch({type: "error/setError", payload: error.message});
                return;
            }

            navigate("/");

        }
        catch(error){
            throw new Error(error);
        }
        finally{
            dispatch({type: "authLoading/change", payload: false});

        }
    }


  return (
    <Auth.Provider value={{
        user,
        error,
        authLoading,
        dispatch,
        signUp,
        logIn,
        logOut,
    }} >
      {children}
    </Auth.Provider>
  )
}

    function UseAuthContext(){
        const context = useContext(Auth);
        if(context === undefined) throw new Error("UseAuthContext is being used outside AuthContext wrapper!");
        return context;
    }

export {AuthContext, UseAuthContext};


AuthContext.propTypes = {
    children: PropTypes.node,
}
