# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Hosted at https://main.d3srwgjggapz7i.amplifyapp.com

## Next steps

### P0

- ~~get image ~~upload~~/render working~~
- ~~show success message on create/update~~
  - ~~show processing/loading indicator overlay in modal~~
  - ~~show form modal with success message modal~~
  - ~~add dismiss X button to modals~~
  - ~~update events list on update event~~
- ~~change getEvent to be by date, use date as path parameter~~
- ~~add a delete event button~~
- style calendar event
  - ~~approved (green)/pending (blue)~~
  - ~~enforce 1 pending or approved event per day~~
  - ~~filter out either denied or cancelled events, another event can be created for that day~~
- add contact info to event
  - email/phone?
- ~~hydrate edit form with data~~
- ~~implement update event~~
- ~~implement review event form~~
- ~~implement authorization to review an event~~
- ~~style Header~~
- ~~deploy site (amplify)~~
- enable social logins for anyone
- ~~show "my past/upcoming events" on profile page~~
- ~~hook up profile update~~
- ~~redirect / to /events~~
- ~~!! resolve hybrid of public vs authenticated interactions !!~~
  - ~~!! render action buttons which the current user is authorized to do !!~~
- ~~improve styling and customizability of `withManagerAccess` to render in a modal~~
- add path alias to webpack and jest
- ~~handle api loader errors correctly~~

### P1

- notify managers of new requests
- notify requesters when request is responded to
- profile page
  - delete profile
  - ~~improve ui for listing events to show more fields (cards?)~~
- ~~make custom queries for getting events on and after a date and events before a date~~
- ~~enforce only events in the near future can be created/updated~~
- pre-populate new event form data with profile data

### P2

- backend validation
  - enforce 1 pending or approved event per day
  - enforce only events in the near future can be created
  - past events cannot be modified

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
