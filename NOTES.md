# Twinkl TypeScript Test

- [Task implementation](#task-implementation)
- [Things to consider and improve](#things-to-consider-and-improve)

## Task implementation

Structure

- The app was built with the purpose of scaling from a relatively simple app, to using a fully fleshed database and the addition of more services / endpoints in the future with minimal changes

- See diagram below for a brief explanantion
  ![architecture diagram](<Screenshot 2025-03-02 at 20.24.40.png>)

## Things to consider and improve

1.  Code quality

- we currently have test coverage at 100% on all files, however, I did not manage to implement husky - something to consider for the future particularly for pre-push hooks.
- I ran into some issues when configuring / setting up eslint - so definitely something to improve as a matter of priority

2. Database

- in order to keep things simple, I decided to use an internal DB, more specifically a private variable which can only be modified by a number of service methods (`findUser` and `addUser`)
  However, due to the structure of the project this can be easily amended to use a real DB.

3. API design consideration

- Fur the purpose of having structured data which has a lot more uses, I have interpreted the `fullName` requirement as two separate data items: `firstName` and `lastName`. This makes it easier to use independently but if there is a requirement to have the fullname comeback concatenated this can be done either on the API or on the UI.

4. Security

- Currently the app has no authentication, anyone could use the client application to perform operations. This can be done by using auth0.
