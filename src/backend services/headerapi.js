import axios from "axios"


export const headerapi=async(http,path,body)=>
{
    const reqconfig={
        method:http,
        url:path,
        data:body,
        Headers:{
            "Content-Type":"application/json"
        }
    }
    return await axios(reqconfig).then((result)=>
    {
        return result
    }).catch((err)=>
    {
        return err
    })
}