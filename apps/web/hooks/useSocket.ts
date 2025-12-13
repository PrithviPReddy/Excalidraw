import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";
import jwt  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"

export function useSocket(){
    const [loading , setLoading] = useState(true)
    const [socket , setSocket] = useState<WebSocket>()


    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token={TOKEN}`)

        ws.onopen = () =>{
            setLoading(false)
            setSocket(ws)
        }

    },[])


    return {
        socket,
        loading
    }
}