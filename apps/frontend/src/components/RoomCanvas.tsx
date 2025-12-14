"use client"

import { WS_URL } from "@/config";
import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import Loader from "./Loader";

export function RoomCanvas({roomId}:{
    roomId : string
}){

        const canvasRef = useRef<HTMLCanvasElement>(null)
        const [socket, setSocket] = useState<WebSocket | null>(null)
        const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYWMyMDJmNy1kNTFmLTRiMjktOGEyMy1jOWE1NTMxMTc3MDYiLCJpYXQiOjE3NjU2OTA1OTB9._hszaK0GFjw24_UH858UOvFzZdEC_Z6Bov8ITT9eqAg"
        useEffect(() => {
            const ws = new WebSocket(`${WS_URL}?token=${TOKEN}`)

            ws.onopen = () => {
                setSocket(ws)
                ws.send(JSON.stringify({
                    type:"join_room",
                    roomId
                }))
            }
        },[])

        if(!socket){
            return <Loader/>

        }
    
    
        return <div>
            <Canvas roomId={roomId} socket ={socket}/>
        </div>
}