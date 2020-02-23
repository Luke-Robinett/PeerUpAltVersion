// Wait for DOM to finish loading
$(document).ready(function () {
    // Points to the form DIVs
    const formDivs = $(".form-div");
    // Points to dropdown box for choosing which API to run
    const apiDropDown = $("#api-dropdown");

    // Hide all the API forms
    formDivs.hide();

    // Initialize the dropdown with a prompt to "choose one"
    apiDropDown.empty();
    apiDropDown.append("<option>Choose one ...</option>");

    // Append the ID of each API DIV to the dropdown list
    // This way, whenever we add a new API form, the dropdown box will automatically reflect it
    formDivs.each(function (i, div) {
        apiDropDown.append($(`<option value="${div.id}">${div.id}</option>`));
    });

    // Event handler for the dropdown 
    apiDropDown.on("change", function (event) {
        // Only execute an API form if not the first choice which is just the prompt
        if (apiDropDown.prop("selectedIndex") > 0) {
            // Hide the divs and only show the div that was chosen
            const divName = $(this).val();
            formDivs.hide();
            $("#" + divName).show();
            if (divName === "add-post") {
                initializeAddPostForm();
            }
        }
    });

    // Event handlers for the API forms and their respective controls

    $("#login-form").on("submit", function (event) {
        event.preventDefault();

        logIn({
            email: $("#login-email-field").val(),
            password: $("#login-password-field").val()
        }, function (err, response) {
            if (err) {
                return alert("Login failed\n");
            }
            alert(`Log in successful ${response.username} at ${response.email}!`);
        });
    });

    $("#signup-username-btn").click(function (event) {
        event.preventDefault();

        getRandomUsername(function (err, newUsername) {
            if (err) {
                return alert("Couldn't get random username due to server error.");
            }
            $("#signup-username-field").val(newUsername);
        });
    });

    $("#signup-form").on("submit", function (event) {
        event.preventDefault();

        signUp({
            username: $("#signup-username-field").val(),
            email: $("#signup-email-field").val(),
            password: $("#signup-password-field").val()
        }, function (err, newUser) {
            if (err) {
                return alert("Couldn't create user due to server error.");
            }
            alert(`New user ${newUser.username} created! Welcome to the family!`);
        });
    });

    $("#namegen-form").on("submit", function (event) {
        event.preventDefault();

        getRandomUsername(function (err, username) {
            if (err) {
                return alert("Couldn't get random username due to server error.");
            }
            $("#namegen-username-field").val(username);
        });
    });

    $("#user-info-form").on("submit", function (event) {
        event.preventDefault();

        getUserInfo(function (err, user) {
            if (err) {
                return alert("Couldn't get user info due to system error.");
            }
            $("#user-info-textarea").text("");
            if (!user) {
                return alert("No user signed in. Please log in first.");
            }
            $("#user-info-textarea").text(JSON.stringify(user));
        });
    });

    $("#logout-form").on("submit", function (event) {
        event.preventDefault();

        logOut(function (err, response) {
            if (err) {
                alert("Something went wrong. Couldn't log out.");
            } else {
                alert("Successfully logged out. Come back again soon!");
            }
        });
    });

    $("#skills-form").on("submit", function (event) {
        event.preventDefault();

        getSkills(function (err, skillList) {
            if (err) {
                return alert("Server error - couldn't retrieve skills.");
            }
            $("#skills-list").empty();
            skillList.forEach(skill => {
                $("#skills-list").append(`<li>${skill.subject}</li>`);
            });
        });
    });

    $("#posts-form").on("submit", function (event) {
        event.preventDefault();

        getPosts(function (err, posts) {
            if (err) {
                throw err;
            }
            $("#posts-container").empty();

            posts.forEach(post => {
                const postId = post.ID;
                const postHeader = $(`<h4>${post.username} says:</h4>`);
                const postBody = $(`<p>${post.body}</p>`);

                const postDiv = $("<div>");
                postDiv.append(postHeader, postBody);

                getAnswers(postId, function (err, answers) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(answers);
                    answers.forEach(answer => {
                        const answerHeader = $(`<h5>${answer.username} responded:</h5>`);
                        const answerBody = $(`<p>${answer.body}</p>`);

                        const answerDiv = $("<div>").attr("style", "margin-left: 4em;");
                        answerDiv.append(answerHeader, answerBody);

                        postDiv.append(answerDiv);
                    });
                });

                $("#posts-container").append(postDiv);
            });
        });
    });

    $("#add-post").on("show", function () {
        alert("Div loaded");
    });

    $("#add-post-form").on("submit", function (event) {
        event.preventDefault();

        const postData = {
            userId: $("#username-span").data("id"),
            skillId: $("#choose-skill-dropdown").val(),
            body: $("#post-body-textarea").val()
        };
        addPost(postData, function (err, response) {
            if (err) {
                throw err;
            }
            alert("Post saved!");
        });
    });

    $("#choose-skill-dropdown").on("change", function (event) {
        // alert($(this).children("option:selected").val());
    });

    $("#get-username-btn").on("click", function (event) {
        event.preventDefault();

        getUserInfo(function (err, user) {
            if (err) {
                return console.log(err);
            }
            if (!user.id) {
                return alert("Not signed in.");
            }
            $("#username-span").text(user.username);
            $("#username-span").data("id", user.id);
        });
    });

});

function initializeAddPostForm() {
    const skillDropDown = $("#choose-skill-dropdown");

    getSkills(function (err, skillList) {
        if (err) {
            return console.log(err);
        }
        skillList.forEach(skill => {
            const option = $(`<option value=${skill.ID}>${skill.subject}</option>`);
            skillDropDown.append(option);
        });
    });
}