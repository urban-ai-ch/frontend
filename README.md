# URBAN-AI

## Team Members

1. Patrick Eugster
2. Noah Gerber
3. Eren Homburg
4. Saimaneesh Yeturu

## Project Description

Through this web application, we provide a simple interface for both experts and casual users to interact with URBAN-AI, an AI that offers meaningful architectural and civil engineering insights from simple images of buildings.

Our project is two fold: on the one side, we provide an interactive map for users to visualise the existing curated datasets from 5 major cities. On the other, we aim to provide a tool for users to upload their own images, to gain insights into structures that personally interest them.

The main emphasis of our project is scalability. We want our application to be very easy to scale to be used in industry, allowing for batch uploads for city-wide insights.

### Users
The target users are people interesting in gaining architectural and civil engineering insights on a city-wide scale. This would include non-profits, governments, NGOs, data analysts... Our website must be useable for non tech-saavy users.

### Tasks
- Provide an interactive map to visualise the datasets
- Provide a way of uploading your own images to obtain insights from the model, placing an emphasis on scalability
- Authentication, as part of of scalability focus. This is important as well to initially block off access to external members as the paper has not been published yet.
- Make the application responsive and easy to use on mobile. As our app accepts images, it only makes sense that it should be easy to upload photos directly with the camera.
- Set rate limits for API requests (dataset fetching, image uploads)
- Create a functional contact page, such that potential users can contact us for special demands or enquiries

---

## Requirements

## How to Run

First clone the repository.

To run the backend

- The Backend is running on cloudflare. This needs no further setup.
- In case that the backend is not running you can deploy it on your own cloudflare account with the command `npx wrangler deploy`. Note that you need to update the bindings in `wrangler.toml` to match your account resources (KV's and R2-bucket's)

To run the frontend

- Open a new terminal window and go to the project folder
- Enter the frontend folder called "react-frontend"
- Paste the following command to start te front end `npm run build && npm run start`
  If all the steps have been successfully executed a new browser window witht he dummy project loaded will open automatically.

## Milestones

- [ ] Page skeleton, implementation of core functionalities (Milestone 2)

  - [x] Responsive navigation bar
  - [x] Create filter components (dropdown menu)
  - [x] Basic interactive map
  - [x] Login frontend
  - [x] Conversion of data from shapefiles to geojson
  - [x] First test of interactive, clickable map with data
  - [x] Backend fetching of correct geojson file
  - [x] Home page
  - [ ] About page
  - [x] Functional contact page

- [ ] Processing of uploaded images, Google Maps StreetView API, accessibility, responsiveness (Milestone 3)
  - [ ] Improve responsiveness
  - [ ] Make dataset points clickable to display properties
  - [ ] Improve map performance with large datasets
  - [ ] Google Dynamic StreetView API for easy image uploads
  - [ ] Add animations to homepage

Create a list subtask.\
Open an issue for each subtask. Once you create a subtask, link the corresponding issue.\
Create a merge request (with corresponding branch) from each issue.\
Finally accept the merge request once issue is resolved. Once you complete a task, link the corresponding merge commit.\
Take a look at [Issues and Branches](https://www.youtube.com/watch?v=DSuSBuVYpys) for more details.

This will help you have a clearer overview of what you are currently doing, track your progress and organise your work among yourselves. Moreover it gives us more insights on your progress.

## Weekly Summary

In the first couple of weeks, we have managed to get the core functionalities of the application working. The interactive map, the fetching of datasets, deployment, authentication, home page, contact page are all complete.

## Versioning

Tags:

- Milestone 2: [Milestone 2 tag](https://gitlab.ethz.ch/webdev-hs24-urbanai/frontend/-/tags/v0.1)

