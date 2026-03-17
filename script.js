
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

