# Peer Up API Reference


## POST Routes


### api/login

Call this API to validate user credentials on the login page

Send it this as the data of your POST request, replacing the values on the right of the colins with form data:

```
data: {
 email: form-email-value-here,
 password: form-password-value-here
}
```

If successful, response object will contain a user object.


### api/signup

Post to this API wtih data from the signup form. The data of your POST ajax call would be osmething like this (replacing the values on the right of course):

```
data: {
 username: form_username,
 email: form-email,
 password: form-new-password
}
```


Should redirect to login page if successful.


### api/posts

Post to this to creat ea new post for the feed. Give it a data object like the follwing, substituing for for mdata:

```
data: {
 userId: user-id-from-form,
 skillId: skill-id-from-form,
 body: body of the post
}
```


## GET Routes

### api/user_data
No arguments need to be passed. Just use an ajax get call to this URL. The response will either contain the currently signed in user's info (ID, username and email) or an empty object if not signed in.
This is what you'll use to get user's ID and username for creating a new post in the feed, for example.


### api/posts

Returns an array containing all the posts in the db. Use this to populate the feed.


### api/skills

Send a GET request to this URL to get a list of skills. Use this to populate the skills drolpdown lists in various parts of the site.

### api/answers/:id

Send a GET request to this URL with the postId of the post you want to get replies for. REturns an array of replies you can iterate through in your JS script to display under each post in the feed. example: /api/answers/2


### api/namegen

Sam's function for getting random user names. This route is working but we'll require more work on the front end before we can integrate it. Might need to be for later. In the meantime it's fun to visit this route in the browser and hit  refresh to see all the hilarious and sometimes offensive names. :)


### api/logout

Probably don't need this, but if you do an ajax get request to this route it will sign out the current user.

