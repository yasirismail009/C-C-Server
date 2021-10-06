import axios from "axios";
import React, { Component } from "react";
import Avatar from "./Avatar";
import { useDispatch } from "react-redux";
import { changeDeviceKey, changeUserAddress } from "../../../store";

export default function ChatListItems(props) {
    const dispatch = useDispatch();
    const handleClick = ({ name, deviceKey }) => {
        dispatch(changeUserAddress({ userAddress: name }));
        axios
            .get(`/sms/conversations/${name}`, {
                headers: { "x-api-key": deviceKey },
            })
            .then(res => {
            });
    };

    return (
        <div
            style={{ animationDelay: `0.${props.animationDelay}s` }}
            onClick={() => handleClick(props)}
            className={`chatlist__item ${props.active ? props.active : ""} `}>
            <Avatar
                image={props.image ? props.image : "http://placehold.it/80x80"}
                isOnline={props.isOnline}
            />

            <div className='userMeta'>
                <p>{props.name}</p>
                <span className='activeTime'>32 mins ago</span>
            </div>
        </div>
    );
}
