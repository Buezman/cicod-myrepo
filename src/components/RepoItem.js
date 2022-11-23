import React from "react";

const RepoItem = ({ repo }) => {
    const today = Date.now();
    const date = new Date(repo.updated_at).getTime();
    const diff = today - date;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const val = days > 1 ? "days" : "day";
    return (
        <div className="card">
            <h3 className="repo_name">
                <a href={repo.html_url}>{repo.name}</a>
            </h3>
            <p className="repo_language">
                {repo.language} <span>{`Updated ${days} ${val} ago`}</span>
            </p>
        </div>
    );
};

export default RepoItem;
