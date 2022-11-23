import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
    let client_id;
    let client_secret;

    if (process.env.NODE_ENV !== "production") {
        client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
        client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    } else {
        client_id = process.env.GITHUB_CLIENT_ID;
        client_secret = process.env.GITHUB_CLIENT_SECRET;
    }
    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);
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

    const openEdit = () => {
        setEditMode(true);
    };
    const cancelEdit = () => {
        setEditMode(false);
    };
    const saveEdit = () => {
        cancelEdit();
    };

    const handleChange = (e) => {
        e.preventDefault();
        const val = e.target.value;
        setProfile({ ...profile, [e.target.name]: val });
    };

    useEffect(() => {
        getprofile();
        //eslint-disable-next-line
    }, []);
    const currDate = new Date(Date.now());

    return (
        <div>
            <img
                className="user_img"
                alt="profile of buezman"
                src={avatar_url}
            />
            {!editMode ? (
                <h3>{name}</h3>
            ) : (
                <div>
                    <p>Name</p>
                    <input
                        type="text"
                        value={name}
                        name="name"
                        onChange={handleChange}
                    />
                </div>
            )}
            <h4>{login}</h4>
            {editMode ? (
                <div>
                    <p>Bio</p>
                    <textarea
                        type="text"
                        value={bio}
                        name="bio"
                        onChange={handleChange}
                    />
                </div>
            ) : (
                <p>{bio}</p>
            )}
            <button className="about_edit" onClick={openEdit}>
                Edit Profile
            </button>
            <div>
                {followers} followers. {following} following
            </div>
            {!editMode ? (
                <p>{company}</p>
            ) : (
                <div>
                    <p>Company</p>
                    <input
                        type="text"
                        value={company}
                        name="company"
                        onChange={handleChange}
                    />
                </div>
            )}
            {editMode ? (
                <div>
                    <input
                        type="text"
                        value={location}
                        name="location"
                        onChange={handleChange}
                    />
                </div>
            ) : (
                <p>{location}</p>
            )}
            <p>{`${currDate.toLocaleTimeString()} (GMT+1)`}</p>
            <p>chibuezenwajiobi@gmail.com</p>
            {editMode ? (
                <input
                    type="text"
                    value={blog}
                    name="blog"
                    onChange={handleChange}
                />
            ) : (
                <p>
                    <a href={`https://${blog}`}>{blog}</a>
                </p>
            )}
            {editMode ? (
                <input
                    value={twitter_username}
                    name="twitter_username"
                    onChange={handleChange}
                />
            ) : (
                <p>
                    <a href={`https://twitter.com/${twitter_username}`}>
                        @{twitter_username}
                    </a>
                </p>
            )}
            {editMode && (
                <div className="edit_buttons">
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default About;
