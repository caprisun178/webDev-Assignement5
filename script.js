"use strict";

const searchInput = document.getElementById("search-input");
const repoContainer = document.getElementById("repo-container");

// reused function for creating the template based on passed in params
function createNewTemplate(parent, repoDetails) {
    const repoCard = document.createElement("div");
    repoCard.classList.add("repo-card");

    const repoHeader = document.createElement("h3");
    repoHeader.textContent = repoDetails.name;
    repoHeader.classList.add("repo-name");

    const repoInfo = document.createElement("div");
    repoInfo.classList.add("repo-info");

    function makeRow(labelText, valueText) {
        const row = document.createElement("div");
        row.classList.add("repo-info-row");

        const label = document.createElement("label");
        label.textContent = labelText;

        const value = document.createElement("p");
        value.textContent = valueText;

        row.appendChild(label);
        row.appendChild(value);

        return row;
    }

    repoInfo.appendChild(makeRow("Description: ", repoDetails.description || "No description"));
    repoInfo.appendChild(makeRow("Creation Date: ", repoDetails.created_at));
    repoInfo.appendChild(makeRow("Updated Date: ", repoDetails.updated_at));
    repoInfo.appendChild(makeRow("Language: ", repoDetails.language || "Not listed"));
    repoInfo.appendChild(makeRow("Watchers: ", repoDetails.watchers));

    repoCard.appendChild(repoHeader);
    repoCard.appendChild(repoInfo);
    parent.appendChild(repoCard);
}

async function getRepos(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    try {
        let res = await fetch(apiUrl);

        if (!res.ok) {
            throw new Error("User not found or GitHub request failed");
        }

        let repos = await res.json();
        console.log("Repos resolved: My Repo Data:", repos);

        repoContainer.innerHTML = "";

        repos = repos.slice(0, 10);

        repos.forEach(repo => {
            createNewTemplate(repoContainer, repo);
        });
    } catch (err) {
        console.error("Error:", err);
        repoContainer.innerHTML = `<p style="color:white;">Error: ${err.message}</p>`;
    }
}

// add event listener on the search bar, when the value is updated
// try to search for a repo
searchInput.addEventListener("change", function () {
    const username = searchInput.value.trim();

    if (username !== "") {
        getRepos(username);
    }
});