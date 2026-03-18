"use strict";

const searchInput = document.querySelector("#search-bar input");
const repoRows = document.querySelectorAll(".repo-row");

function clearRows() {
    repoRows.forEach(row => {
        row.innerHTML = "";
    });
}

function createInfoRow(labelText, valueText) {
    const row = document.createElement("div");
    row.classList.add("repo-info-row");

    const label = document.createElement("label");
    label.textContent = labelText;

    const value = document.createElement("p");
    value.textContent = valueText || "N/A";

    row.appendChild(label);
    row.appendChild(value);

    return row;
}

function createNewTemplate(parent, repoDetails) {
    const repoCard = document.createElement("div");
    repoCard.classList.add("repo-card");

    const repoHeader = document.createElement("h3");
    repoHeader.textContent = repoDetails.name;
    repoHeader.classList.add("repo-name");

    const repoInfo = document.createElement("div");
    repoInfo.classList.add("repo-info");

    repoInfo.appendChild(createInfoRow("Description: ", repoDetails.description));
    repoInfo.appendChild(createInfoRow("Creation Date: ", repoDetails.created_at));
    repoInfo.appendChild(createInfoRow("Updated Date: ", repoDetails.updated_at));
    repoInfo.appendChild(createInfoRow("Language: ", repoDetails.language));
    repoInfo.appendChild(createInfoRow("Watchers: ", repoDetails.watchers));

    repoCard.appendChild(repoHeader);
    repoCard.appendChild(repoInfo);

    parent.appendChild(repoCard);
}

async function getRepos(username) {
    try {
        const res = await fetch(`/api/repos/${username}`);

        if (!res.ok) {
            throw new Error("Could not get repos");
        }

        const repos = await res.json();

        clearRows();

        const limitedRepos = repos.slice(0, 10);

        limitedRepos.forEach((repo, index) => {
            let rowIndex = Math.floor(index / 4);

            if (rowIndex > 2) {
                rowIndex = 2;
            }

            createNewTemplate(repoRows[rowIndex], repo);
        });
    } catch (err) {
        clearRows();

        const errorMsg = document.createElement("p");
        errorMsg.textContent = "Error: " + err.message;
        errorMsg.style.color = "white";

        repoRows[0].appendChild(errorMsg);
        console.error(err);
    }
}

searchInput.addEventListener("change", function () {
    const username = searchInput.value.trim();

    if (username !== "") {
        getRepos(username);
    }
});