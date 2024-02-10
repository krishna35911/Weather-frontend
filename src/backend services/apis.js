import { backendurl } from "./backendurl"
import { headerapi } from "./headerapi"



export const registerapi=async(user)=>
{
    return await headerapi('POST',`${backendurl}/register`,user,"")
}

export const loginapi=async(user)=>
{
    return await headerapi('POST',`${backendurl}/login`,user,"")
}

export const adminloginapi=async(user)=>
{
    return await headerapi('POST',`${backendurl}/admin/login`,user,"")
}