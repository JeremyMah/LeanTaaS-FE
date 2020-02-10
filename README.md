# LeanTaaS - FE Coding Challenge - Jeremy

This app displays images of selected cameras from NASA's Curiosity rover for a given sol.

## Installation
This app requires [Node.js](https://nodejs.org/) v7.6.0 to run because we use async / await.

Update with Homebrew
```sh
$brew update
$brew upgrade node
```
Update with N
```sh
$npm install -g n
$sudo n latest
```

#### Install and run the app

1. Install dependencies using `npm install`
2. Start your server using `npm start`
3. Navigate to app in [browser](http://localhost:3000)
4. Enjoy!

## Discussion

I used the following frameworks and technologies:  [React](https://reactjs.org/), [axios](https://github.com/axios/axios), HTML, CSS.
I used [create-react-app](https://goo.gl/26jfy4) to generate the scaffolding for this app.

## High-level Overview
The project's files are grouped by file type and placed in either the api folder or the components folder. 

All components are functional components, with the mindset of using the [State Hook](https://reactjs.org/docs/hooks-state.html) when using states.

Here is a representation of how components are used in the code:

CuriosityApp.js
- Header 
- InputForm
  - NumberInput
  - MultiSelect
- ImageGallery
  - CameraCards

## Features

### Search / API calls
When a user changes the sol, CuriosityApp calls the `fetchPhotos()` method imported from the `Utils.js` file in the `api` folder. The result is passed to `ImageGallery` to be ingested and transformed into `CameraCards`.
Asynchronous calls are dealt with a combination of async/await and axios.

### If the user changes sols quickly, only one request is sent
If the user changes the sols while a request is pending, we cancel the existing request with [axios cancellation](https://github.com/axios/axios#cancellation).

### Simple Caching
The application stores the results in-app after every fetch. If the user enters a sol that has already been used prior, `fetchPhotos()` will return the results from the in-app cache instead of making another API request. The cache is reset when the page is reloaded or if application restarts.


