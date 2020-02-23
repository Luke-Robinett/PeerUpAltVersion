// Functions to talk to the back end API

// Base URL for API calls. Will need to be changed when put into production
const baseUrl = "http://localhost:8080";

// POST calls

// Log in the user
function logIn(credentials, callback) {
    $.ajax(baseUrl + "/api/login", {
        method: "POST",
        data: {
            email: credentials.email,
            password: credentials.password
        }
    })
        .then(function (response) {
            if (!response) {
                return callback(new Error("Login failed."));
            }
            callback(null, response);
        })
        .catch(function (err) {
            callback(err);
        });
}

// Sign up a new user
function signUp(userInfo, callback) {
    $.ajax(baseUrl + "/api/signup", {
        method: "POST",
        data: {
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password
        }
    })
        .then(function (response) {
            if (!response) {
                return callback(new Error("Signup failed."));
            }
            callback(null, response);
        })
        .catch(function (err) {
            callback(err);
        });
}


// GET Calls

function getRandomUsername(callback) {
    $.get(baseUrl + "/api/namegen")
        .then(function (response) {
            callback(null, response);
        })
        .catch(function (err) {
            callback(err);
        });
}

// Get info about currently logged in user
function getUserInfo(callback) {
    $.get(baseUrl + "/api/user_info")
        .then(function (response) {
            callback(null, response);
        })
        .catch(function (err) {
            callback(err);
        });
}

function logOut(callback) {
    $.get(baseUrl + "/api/logout", function (response) {
        callback(null, response);
    })
        .catch(function (err) {
            callback(err);
        });
}

function getSkills(callback) {
    $.get(baseUrl + "/api/skills")
        .then(function (response) {
            callback(null, response);
        })
        .catch(function (err) {
            callback(err);
        });
}

function getPosts(callback) {
    $.get(baseUrl + "/api/posts")
        .then(function (response) {
            callback(null, response);
        })
        .catch(function (err) {
            callback(err);
        });
}

function getAnswers(postId, callback) {
    $.get(baseUrl + "/api/answers/" + postId, { async: false })
        .then(function (response) {
            callback(null, response);
        })
        .catch(function (err) {
            callback(err);
        });
}

function addPost(post, callback) {
    $.ajax(baseUrl + "/api/posts", {
        method: "POST",
        data: post
    })
        .then(function (response) {
            callback(null, response);
        })
        .catch(function (err) {
            callback(err);
        });
}