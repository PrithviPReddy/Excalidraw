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
        const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMGI0ZmY2ZC1jN2I5LTQ2YzYtYmI2Mi1mOWM5MWI0NzA5OGMiLCJpYXQiOjE3NjU2MzU0OTl9.skapcV7Yks_QFHZICY0kaR612ky2wHsxSL0h1JKR7ao"

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