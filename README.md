[![Netlify Status](https://api.netlify.com/api/v1/badges/62eb377f-ea8c-4bb6-9707-d22d598b6a0d/deploy-status)](https://app.netlify.com/sites/strong-gaufre-fe61be/deploys)

[Click here to visit the production site] (https://main--strong-gaufre-fe61be.netlify.app/)

# QuestionBox

QuestionBox is a React application where users can post a public question and receive answers as well as respond to other users' quesitons. It utilizes React Router and was styled primarily using Material UI. It communicates with the QuestionBox API created by the Lightning BackEnd Team.

QuestionBox features the following:

	Users can view questions and answers on the home page.
	Users can log in.
	Authenticated users can ask a question.
	Authenticated users can answer a question.
	Conditional rendering of components based on whether a user is authenticated.
	Authenticated users can choose an accepted answer among the answers to one of their questions.
	A 404 page when for when the user finds themself in the wrong place.

React router is utilized for routing unique URLs for the following:

	Registering for a new account.
	Signing in to an existing account.
	Asking a question.
	Viewing the homepage (the list of all questions).
	* Non-existent routes redirect to a 404 page.

In the future, we plan to implement the following:

	A user can delete their own question.
	Authenticated users can "star" and "unstar" a question or answer they like.
	Authenticated users can edit their questions and answers.