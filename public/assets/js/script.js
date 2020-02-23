<<<<<<< HEAD
$(document).ready(function () {
    // index.html - sign up for account
    const letsGo = $(".lets-go");
    const signUpDiv = $(".sign-up");
    const createAccount = $(".create-account");
    const createPartial = $(".create-partial");
    const continueBtn = $(".continue-one");
    const usernamePartial = $(".username-partial");
    const checkedUsername = $('input[type="radio"]:checked').val();
    const continue2Btn = $(".continue-two");
    const strengthsPartial = $(".strengths-partial");
    const strengths = $(".strength");
    const newPost = $(".new-post");
    var chatBtn = $(".chat");
    var answerBtn = $(".answer");
    var answerModal = $("#modal-sections")

    // const {getNames} = require("../../../controllers/name-generator");
    // const names = getNames();

    createAccount.on("click", function (event) {
        event.preventDefault();
        signUpDiv.hide();
        createPartial.show();
    });

    const usernames = [$(".username1"), $(".username2"), $(".username3"), $(".username4"), $(".username5")];

    continueBtn.on("click", function (event) {
        event.preventDefault();
        createPartial.hide();
        usernamePartial.show();
        // for (i=0; i<usernames.length; i++) {
        //     usernames[i].append(names[i]);
        // }
    });

    continue2Btn.on("click", function (event) {
        event.preventDefault();
        usernamePartial.hide();
        strengthsPartial.show();
        console.log(checkedUsername)
    });

    strengths.on("click", function (event) {
        event.preventDefault();
        $(this).attr("style", "background-color: #F2F2F2;");
    });

    newPost.on("click", function (event) {
        event.preventDefault();

        // Get current user's info
        $.GET("/api/userinfo")
            .then(function (response) {
                $.ajax("/api/posts", {
                    type: "POST",
                    data: {
                        userId: response.id,
                        username: response.username
                    }
                }).then(function () {
                    // Reload the page to get the updated list
                    location.reload();
                });
            });
    });

    // end sign up for account
});

=======
// index.html - sign up for account
const letsGo = $(".lets-go");
const signUpDiv = $(".sign-up");
const createAccount = $(".create-account");
const createPartial = $(".create-partial");
const continueBtn = $(".continue-one");
const usernamePartial = $(".username-partial");
const checkedUsername = $('input[type="radio"]:checked').val();
const continue2Btn = $(".continue-two");
const strengthsPartial = $(".strengths-partial");
const strengths = $(".strength");
const skillSelection = $(".skill")
const post = $(".login-post");
const newPost = $(".new-post");
const saveResponse = $(".save");

// const {getNames} = require("../../../controllers/name-generator");
// const names = getNames();

createAccount.on("click", function (event) {
    event.preventDefault();
    signUpDiv.hide();
    usernamePartial.show();
});

const usernames = [$(".username1"), $(".username2"), $(".username3"), $(".username4"), $(".username5")];

continueBtn.on("click", function (event) {
    event.preventDefault();
    usernamePartial.hide();
    strengthsPartial.show();
    // for (i=0; i<usernames.length; i++) {
    //     usernames[i].append(names[i]);
    // }
});

continue2Btn.on("click", function (event) {
    event.preventDefault();
    strengthsPartial.hide();
    createPartial.show();
    console.log(checkedUsername)
});

strengths.on("click", function (event) {
    event.preventDefault();
    $(this).attr("style", "background-color: #F2F2F2;");
});

skillSelection.on("click", function (event) {
    event.preventDefault();
    $(this).attr("style", "background-color: #F2F2F2;");
});

// end sign up for account

post.on("click", function(event) {
    var addPost = {
        userId: 1,
        skillId: 1,
        body: $(".login-post-body").val().trim()
    }

    console.log(addPost.body);

    $.ajax("/api/posts", {
        type: "POST",
        data: addPost
      }).then(function() {
        // Reload the page to get the updated list
        location.reload();
      });
    
});

newPost.on("click", function (event) {

    var addPost = {
        userId: 1,
        skillId: 1,
        body: $(".post-body").val().trim()
    };

    console.log (addPost.body);

    $.ajax("/api/posts", {
        type: "POST",
        data: addPost
      }).then(function() {
        // Reload the page to get the updated list
        window.location.replace("http://localhost:8080/feed");
      });

});

// saveResponse.on("click", function(event) {
//     var addResponse = {
//         userId: 1,
//         replyToId: 1,
//         body: $(".response-body").val().trim()
//     };

//     console.log (addResponse.body);

//     $.ajax("/api/posts", {
//         type: "POST",
//         data: addResponse
//       }).then(function() {
//         // Reload the page to get the updated list
//         window.location.replace("http://localhost:8080/feed");
//       });
// });
>>>>>>> e11faf842094ed12e1f5c193a9f580331caf2c70
