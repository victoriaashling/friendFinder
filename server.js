const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let users = [
    {
        userName: "Olga",
        userPhotoURL: "/pics/olga-pic.jpg",
        scores: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    },
    {
        userName: "Albert",
        userPhotoURL: "/pics/albert-pic.jpg",
        scores: [2, 2, 3, 4, 4, 4, 2, 3, 3, 2]
    },
    {
        userName: "Emilia",
        userPhotoURL: "/pics/emilia-pic.jpg",
        scores: [1, 1, 2, 1, 3, 1, 2, 3, 2, 5]
    },
    {
        userName: "Hugo",
        userPhotoURL: "/pics/olga-pic.jpg",
        scores: [4, 1, 3, 4, 1, 3, 2, 5, 5, 5]
    }
]

app.use(express.static(path.join(__dirname, 'app/public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get("/api/friends", (req, res) => {
    res.json(users);
});

app.post("/api/friends", (req, res) => {
    let newUser = req.body;

    let totalDiffs = [];

    users.forEach(user => {
        let diff = 0;
        for (let i = 0; i < user.scores.length; i++) {
            diff += Math.abs(user.scores[i] - newUser.scores[i]);
        }
        totalDiffs.push(diff);
    });

    let lowestScore = Math.min(...totalDiffs);
    users.push(newUser);

    for (let i = 0; i < totalDiffs.length; i++) {
        if (totalDiffs[i] === lowestScore) {
            return res.json(users[i]);
        };
    };
});


app.listen(PORT, () => {
    console.log("Server listening on PORT " + PORT);
});