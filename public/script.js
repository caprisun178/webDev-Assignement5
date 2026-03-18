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

    const headerRow = document.createElement("div");
    headerRow.classList.add("repo-header-row")

    // GitHub icon
    const icon = document.createElement("img");
    icon.src = "github-brands-solid.png";
    icon.alt = "GitHub";
    icon.classList.add("repo-icon");


    // Repo name ( and link)
    const repoHeader = document.createElement("a");
    repoHeader.textContent = repoDetails.name;
    repoHeader.classList.add("repo-name");
    repoHeader.href = repoDetails.url;

    // append icon and link
    headerRow.appendChild(icon);
    headerRow.appendChild(repoHeader);

    const repoInfo = document.createElement("div");
    repoInfo.classList.add("repo-info");

    repoInfo.appendChild(createInfoRow("Description: ", repoDetails.description));
    const createdDate = new Date(repoDetails.created_at).toLocaleDateString();
    repoInfo.appendChild(createInfoRow("Creation Date: ", createdDate));
    const updatedDate = new Date(repoDetails.created_at).toLocaleDateString();
    repoInfo.appendChild(createInfoRow("Updated Date: ", updatedDate));
    repoInfo.appendChild(createInfoRow("Language: ", repoDetails.language));
    repoInfo.appendChild(createInfoRow("Watchers: ", repoDetails.watchers));

    repoCard.appendChild(headerRow);
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