import React, { useState, useEffect } from "react";
import axios from "axios";
import RepoItem from "./RepoItem";

const Repos = () => {
    const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

    const [loading, setLoading] = useState(false);
    const [repos, setRepos] = useState([]);
    const [repoArr, setRepoArray] = useState([]);
    const [language, setLanguage] = useState("");
    const [sortParam, setSortParam] = useState("updated");
    const [type, setType] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const fetchRepos = async () => {
        setLoading(true);
        const result = await axios.get(
            `https://api.github.com/users/Buezman/repos?type=${type}&page=${page}&per_page=22&sort=${sortParam}&client_id=${client_id}?client_secret=${client_secret}`
        );
        setRepos(result.data);
        setRepoArray(result.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchRepos();
        //eslint-disable-next-line
    }, [page, language, sortParam, type]);

    const handleChange = (e) => {
        const text = e.target.value;
        setSearch(text);
        searchRepos(text);
    };

    const selectLanguage = (e) => {
        const val = e.target.value;
        console.log(val);
        setLanguage(val);
        filterReposByLanguage(val);
    };

    const filterReposByLanguage = async (lang) => {
        if (lang === "") {
            setRepoArray(repos);
        } else {
            const result = await axios.get(
                `https://api.github.com/users/Buezman/repos?per_page=45&client_id=${client_id}?client_secret=${client_secret}`
            );
            const arr = result.data.filter((repo) => repo.language === lang);
            setRepoArray(arr);
        }
    };

    const selectType = (e) => {
        const val = e.target.value;
        setType(val);
        fetchRepos();
    };

    const selectSort = (e) => {
        const val = e.target.value;
        setSortParam(val);
        fetchRepos();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchRepos(search);
    };

    const incrementPage = () => {
        setPage((prev) => prev + 1);
    };
    const decrementPage = () => {
        setPage((prev) => prev - 1);
    };
    const searchRepos = async (search) => {
        const result = await axios.get(
            `https://api.github.com/users/Buezman/repos?per_page=45&client_id=${client_id}?client_secret=${client_secret}`
        );
        let arr = [];
        if (search !== "") {
            arr = result.data.filter((repo) => repo.name.includes(search));
            setRepoArray(arr);
        } else {
            setRepoArray(repos);
        }
    };
    return (
        <div className={loading ? "repo_container_blur" : "repo_container"}>
            <div className="repo_filter">
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="find a repository.."
                        type="text"
                        value={search}
                        onChange={handleChange}
                    />
                </form>
                <select value={type} onChange={selectType}>
                    <option value="" disabled>
                        Type
                    </option>
                    <option>All</option>
                    <option>Public</option>
                </select>
                <select value={language} onChange={selectLanguage}>
                    <option value="" disabled>
                        Language
                    </option>
                    <option value="">All</option>
                    <option value="Java">Java</option>
                    <option value="TypeScript">Typescript</option>
                    <option value="JavaScript">Javascript</option>
                    <option value="CSS">CSS</option>
                    <option value="Python">Python</option>
                </select>
                <select value={sortParam} onChange={selectSort}>
                    <option value="" disabled>
                        Sort
                    </option>
                    <option value="updated">Last updated</option>
                    <option value="name">Name</option>
                    <option value="stars">Stars</option>
                </select>
            </div>
            {repoArr.map((repo) => (
                <RepoItem repo={repo} key={repo.id} />
            ))}
            <div className="page_buttons">
                <button onClick={decrementPage} disabled={page < 2}>
                    {`< Previous`}
                </button>
                <button onClick={incrementPage} disabled={page > 1}>
                    {`Next >`}
                </button>
            </div>
        </div>
    );
};

export default Repos;
