import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FaTwitter,
    FaEnvelope,
    FaLink,
    FaLocationArrow,
    FaClock,
    FaBuilding,
    FaPeopleArrows,
} from "react-icons/fa";

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
    const [iprofile, setIProfile] = useState({});
    const [editMode, setEditMode] = useState(false);
    const getprofile = async () => {
        const result = await axios.get(
            `https://api.github.com/users/buezman?client_id=${client_id}?client_secret=${client_secret}`
        );
        setProfile(result.data);
        setIProfile({
            iname: result.data.name,
            ibio: result.data.bio,
            iblog: result.data.blog,
            icompany: result.data.company,
            ilocation: result.data.location,
            itwitter_username: result.data.twitter_username,
        });
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

    const { iname, ibio, iblog, icompany, ilocation, itwitter_username } =
        iprofile;

    const openEdit = () => {
        setEditMode(true);
    };
    const cancelEdit = () => {
        setProfile({
            ...profile,
            name: iname,
            bio: ibio,
            blog: iblog,
            company: icompany,
            location: ilocation,
            twitter_username: itwitter_username,
        });
        setEditMode(false);
    };
    const saveEdit = () => {
        setIProfile({
            iname: name,
            ibio: bio,
            iblog: blog,
            icompany: company,
            ilocation: location,
            itwitter_username: twitter_username,
        });
        setEditMode(false);
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
                <h2>{name}</h2>
            ) : (
                <div>
                    <h3>Name</h3>
                    <input
                        className="edit_input"
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
                    <h3>Bio</h3>
                    <textarea
                        className="edit_input"
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
            <div className="prop_icon">
                <FaPeopleArrows className="icon" />
                {followers} followers. {following} following
            </div>
            {!editMode ? (
                <p className="prop_icon">
                    <FaBuilding className="icon" />
                    {company}
                </p>
            ) : (
                <div className="prop_icon">
                    <FaBuilding className="icon" />
                    <input
                        className="edit_input"
                        type="text"
                        value={company}
                        name="company"
                        onChange={handleChange}
                    />
                </div>
            )}
            {editMode ? (
                <div className="prop_icon">
                    <FaLocationArrow className="icon" />
                    <input
                        className="edit_input"
                        type="text"
                        value={location}
                        name="location"
                        onChange={handleChange}
                    />
                </div>
            ) : (
                <p className="prop_icon">
                    <FaLocationArrow className="icon" />
                    {location}
                </p>
            )}
            <p className="prop_icon">
                <FaClock className="icon" />
                {`${currDate.toLocaleTimeString()} (GMT+1)`}
            </p>
            <p className="prop_icon">
                <FaEnvelope className="icon" />
                chibuezenwajiobi@gmail.com
            </p>
            {editMode ? (
                <div className="prop_icon">
                    <FaLink className="icon" />
                    <input
                        className="edit_input"
                        type="text"
                        value={blog}
                        name="blog"
                        onChange={handleChange}
                    />
                </div>
            ) : (
                <p className="prop_icon">
                    <FaLink className="icon" />
                    <a href={`https://${blog}`} target="_blank">
                        {blog}
                    </a>
                </p>
            )}
            {editMode ? (
                <div className="prop_icon">
                    <FaTwitter className="icon" />
                    <input
                        className="edit_input"
                        value={twitter_username}
                        name="twitter_username"
                        onChange={handleChange}
                    />
                </div>
            ) : (
                <p className="about_items prop_icon">
                    <FaTwitter className="icon" />
                    <a
                        href={`https://twitter.com/${twitter_username}`}
                        target="_blank"
                    >
                        @{twitter_username}
                    </a>
                </p>
            )}
            {editMode && (
                <div className="edit_buttons">
                    <button className="save_button" onClick={saveEdit}>
                        Save
                    </button>
                    <button className="cancel_button" onClick={cancelEdit}>
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default About;
