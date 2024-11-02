// app.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Import MongoDB connection and Chat model
const connectDB = require('./db.js');
const Chat = require('./models/Chat.js');

// Connect to MongoDB
connectDB();

io.on("connection", async (socket) => {
    console.log("A user connected");

    // Fetch existing chat messages from MongoDB and send them to the client
    const messages = await Chat.find().sort({ timestamp: 1 });
    socket.emit("chat", messages);

    // Listen for 'message' events from the client
    socket.on("message", async (data) => {
        console.log("Message received:", data);

        // Save the message to MongoDB
        const chatMessage = new Chat({
            username: data.user,
            message: data.message,
            avatar: data.avatar
        });
        await chatMessage.save();

        // Broadcast the message to all connected clients
        io.emit("message", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
