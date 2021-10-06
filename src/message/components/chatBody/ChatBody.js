import React, { Component } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";

export default function ChatBody({ deviceKey }) {
    return (
        <div className='main__chatbody'>
            <ChatList deviceKey={deviceKey} />
            <ChatContent deviceKey={deviceKey} />
        </div>
    );
}
