"use strict";

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api/repos/:username", async (req, res) => {
    const username = req.params.username;

    try {
        const githubRes = await fetch(`https://api.github.com/users/${username}/repos`);

        if (!githubRes.ok) {
            return res.status(githubRes.status).json({
                error: "GitHub request failed"
            });
        }

        const repoData = await githubRes.json();

        const cleanedData = repoData.map(repo => ({
            name: repo.name,
            description: repo.description,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            language: repo.language,
            watchers: repo.watchers,
            url: repo.html_url
        }));

        res.json(cleanedData);
    } catch (err) {
        res.status(500).json({
            error: "Server error",
            message: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});