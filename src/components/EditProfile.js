import React, { useEffect, useState } from "react";
import axios from "axios";

const EditProfile = () => {
    const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

    const [profile, setProfile] = useState({});
    const getprofile = async () => {
        const result = await axios.get(
            `https://api.github.com/users/buezman?client_id=${client_id}?client_secret=${client_secret}`
        );
        setProfile(result.data);
    };
    const {
        login,
        name,
        bio,
        avatar_url,
        followers,
        blog,
        following,
        company,
        location,
        twitter_username,
    } = profile;

    useEffect(() => {
        getprofile();
        //eslint-disable-next-line
    }, []);
    return (
        <div>
            <img
                className="user_img"
                alt="profile of buezman"
                src={avatar_url}
            />
            <h3>{name}</h3>
            <h4>{login}</h4>
            <p>{bio}</p>
            <button className="about_edit">Edit Profile</button>
            <div>
                {followers} followers. {following} following
            </div>
            <p>{company}</p>
            <p>{location}</p>
            <p>15:34 (UTC +01:00)</p>
            <p>chibuezenwajiobi@gmail.com</p>
            <p>
                <a href={`https://${blog}`}>{blog}</a>
            </p>
            <p>
                <a href={`https://twitter.com/${twitter_username}`}>
                    @{twitter_username}
                </a>
            </p>
        </div>
    );
};

export default EditProfile;
