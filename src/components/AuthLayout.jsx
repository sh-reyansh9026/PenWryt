import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication=true}){
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state=>state.auth.status)

    useEffect(()=>{
        //Todo make it more easy
        // true && false!=true  ==>  true && true ==> true

        // if(authStatus === true)
        //     navigate("/")
        // else if(authStatus === false)
        //     navigate("/login")

        // let authValue = authStatus === true ? true : false
        
        if(authentication && authStatus!==authentication){
            navigate("/login")
        }
        //false(!authentication) && true(authStatus)!=true ==> false && false 
        else if(!authentication && authStatus!==authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate,authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

// function AuthLayout() {
// }
