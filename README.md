# podcaster

# Explanation

## Scaffolding
- backend
- src -> frontend
- public -> assets 

## Libraries

- [Vite](https://vitejs.dev/) for packaging
- [React](https://facebook.github.io/react/)  for UI
- [Material UI](https://mui.com/) for components
- [React Router](https://reactrouter.com/en/main) for SPA routing
- [Redux](https://redux.js.org/) for state management
- [Prettier](https://prettier.io/) for formatting code 

## Setup

Originally I thought to develop an application with two screens, in the first one, the applications page, there would be a list of cards with all candidates with a small info panel with all details like: name, title, position where applied, brief description, total videos that the hiring manager has seen and overall evaluation.
Clicking on the card, there would be an animation that put all the candidates in a navbar and the page switch to the candidates page (src/cadidates).
For this application I thought to implement react router to switch between pages, and redux to caching data in the store, to not make api calls if switching through pages.
For time reason I just developed the candidates page and left the setup to develop the improvements.
The page of candidates would have an url like 'path/candidates' that can switch to a 
'path/candidates/applicationId=12345' in case the application '12345' is selected. This is usefull to share links about a specific video. For time reason I decided to let the candidates page in the root path.