import React, { Component, useState, createRef, useEffect } from "react";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { useDispatch, useSelector } from "react-redux";
import { selectDeviceKey, selectUserAddress } from "../../../store";
import axios from "axios";

const _sample = {
    id: 308,
    created_datetime: "2021-10-06 11:35:16",
    modified_datetime: "2021-10-06 11:35:16",
    sms_id: 17,
    threadId: 13,
    type: "INBOX",
    person: 0,
    protocol: 0,
    locked: false,
    read: false,
    seen: false,
    receivedDate: 1632995372724,
    sentDate: 1632995052000,
    status: "NONE",
    address: "JazzCash",
    body:
        "JazzCash par aaye aur paaye Rs.50 FORI. Abhi apne mobile say *786# milaye aur JazzCash Account kholnay pr pyen Rs.50 FORI. Apni CNIC issuance date register kartay hoye theek tarah darj karein, agar apki CNIC issuance date 12.10.2015 hai toh aisy likhein 12102015",
    created_by: null,
    modified_by: null,
    device: 135,
};

const chatItms = [
    {
        key: 1,
        image:
            "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
        type: "",
        msg: "Hi Tim, How are you?",
    },
    {
        key: 2,
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        type: "other",
        msg: "I am fine.",
    },
    {
        key: 3,
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        type: "other",
        msg: "What about you?",
    },
    {
        key: 4,
        image:
            "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
        type: "",
        msg: "Awesome these days.",
    },
    {
        key: 5,
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        type: "other",
        msg: "Finally. What's the plan?",
    },
    {
        key: 6,
        image:
            "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
        type: "",
        msg: "what plan mate?",
    },
    {
        key: 7,
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        type: "other",
        msg: "I'm taliking about the tutorial",
    },
];

export default function ChatContent(props) {
    const [chat, setChat] = useState(chatItms);
    const deviceKey = useSelector(selectDeviceKey());
    const userAddress = useSelector(selectUserAddress());

    useEffect(() => {
        async function getChat() {
            const res = await axios.get(`/sms/conversations/${userAddress}`, {
                headers: { "x-api-key": deviceKey },
            });

            const data = res.data.data;
            setChat(data);
        }
        getChat();
    }, [userAddress, deviceKey]);

    return (
        <div className='main__chatcontent'>
            <div className='content__header'>
                <div className='blocks'>
                    <div className='current-chatting-user'>
                        <Avatar
                            isOnline='active'
                            image='https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png'
                        />
                        <p>{userAddress}</p>
                    </div>
                </div>

                <div className='blocks'>
                    <div className='settings'>
                        <button className='btn-nobg'>
                            <i className='fa fa-cog' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='content__body'>
                <div className='chat__items'>
                    {chat.map((itm, index) => {
                        return (
                            <ChatItem
                                animationDelay={index + 2}
                                key={itm.id}
                                user={itm.type === "SENT" ? "me" : "other"}
                                msg={itm.body}
                                image='https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png'
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
