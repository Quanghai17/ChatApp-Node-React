const express = require('express')
const { Server } = require("socket.io");
const http  = require("http")
const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors : {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }
    
 })

 const onlineUser = new Set()

 io.on('connection', async (socket) => {

    const token = socket.handshake.auth.token
    const user = await getUserDetailsFromToken(token)

    socket.join(user?._id.toString())
    onlineUser.add(user?._id?.toString())

    io.emit('onlineUser',Array.from(onlineUser))

    socket.on('disconnect', () =>{
        onlineUser.delete(user?._id?.toString())
        console.log("disconnect user", socket.id)
    })

 })

 module.exports = {
    app,
    server
 }