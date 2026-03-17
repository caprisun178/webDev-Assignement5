
"use scrict"

// Declare function for retrieving repos
var apiUrl = "https://api.github.com/users/#/repos";
async function getRepos() {
  try {
    let res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(await res.text())
    }
    res = await res.json();

    console.log("Repos resolved: My Repo Data:", res);
  } catch (err) {
    console.error("Error:", err);
  }
}

// add event listener on the search bar, when the value is updated 
// try to search for a repo

// for each repo found create a new div to display data
// ensure we do not exceed 10 repos, 4 per row would look nice


// reused function for creating the template based on passed in params
function createNewTemplate(parent, repoDetails){
    //create new repo card
    const repoCard = document.createElement("div");
    repoCard.classList.add("repo-card");

    //create new repo header and assing the name to the component
    const repoHeader = document.createElement("h3");
    repoHeader.textContent = repoDetails["name"];
    repoHeader.id = "repo-name";

    //create new repo info section of the card
    const repoInfo = document.createElement("div");
    repoInfo.classList.add("repo-info");
    // create all the labels and values and append to repoInfo
    const descRow   = document.createElement()
    const description = document.createElement("label");
    description.textContent = 'Description:';
    const descValue = document.createElement('p');
    descValue.textContent = repoDetails["description"]

    const creationDate= document.createElement("label");
    creationDate.textContent = 'Creation Date:';
    const creationValue = document.createElement('p');
    creationValue.textContent = repoDetails["createdDate"]

    const updateDate = document.createElement("label");
    updateDate.textContent = 'Updated Date:'
    const updateValue = document.createElement('p');
    updateValue.textContent = repoDetails["updatedDate"]

    const languages = document.createElement("label");
    languages.textContent = 'Languages:'
    const langValue = document.createElement('p');
    langValue.textContent = repoDetails["languages"]

    const watchers = document.createElement("label");
    watchers.textContent = 'Watchers:'
    const watchersValue = document.createElement('p');
    watchersValue.textContent = repoDetails["watchers"]

    
}
