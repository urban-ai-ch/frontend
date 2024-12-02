# URBAN-AI

## Team Members
1. Patrick Eugster
2. Noah Gerber
3. Eren Homburg
4. Saimaneesh Yeturu

## Project Description 
Through this web application, we provide a simple interface for both experts and casual users to interact with URBAN-AI, an AI that offers meaningful architectural and civil engineering insights from simple images of buildings.

Our project is two fold: on the one side, we provide an interactive map for users to visualise the existing curated datasets from 5 major cities. On the other, we aim to provide a tool for users to upload their own images, to gain insights into structures that personally interest them.

### Users
List your projects target Users.

### Tasks
Define all the tasks you want your dashboard solve.

- - -

## Requirements
Write here all intructions to build the environment and run your code.\
**NOTE:** If we cannot run your code following these requirements we will not be able to evaluate it.

## How to Run
Write here **DETAILED** intructions on how to run your code.\
**NOTE:** If we cannot run your code following these instructions we will not be able to evaluate it.

As an example here are the instructions to run the Dummy Project:
To run the Dummy project you have to:
- clone the repository;
- open a terminal instance and using the command ```cd``` move to the folder where the project has been downloaded;

To run the backend
- The Backend is running on cloudflare. This needs no further setup. 
- For more information see the [backend documentation](https://gitlab.inf.ethz.ch/course-fwe2024/students/final-project/fp-p5/-/blob/main/src/server/webdev-hs24-backend/README.md?ref_type=heads)
- In case that the backend is not running you can deploy it on your own cloudflare account with the command `npx wrangler deploy`. Note that you need to update the bindings in `wrangler.toml` to match your account resources (KV's and R2-bucket's)

To run the frontend
- Open a new terminal window and go to the project folder
- Enter the frontend folder called "react-frontend"
- Do the following command to start the front end ```npm install```, ```npm start```
If all the steps have been successfully executed a new browser window witht he dummy project loaded will open automatically.

## Milestones

- [ ] Page skeleton, implementation of core functionalities

  - [x] Responsive navigation bar
  - [x] Create filter components (dropdown menu)
  - [x] Basic interactive map
  - [x] Login frontend
  - [x] Conversion of data from shapefiles to geojson
  - [x] First test of interactive, clickable map with data
  - [ ]  Backend fetching of correct geojson file
  - [ ]  Home page
  - [ ]  About page
  - [ ]  Functional contact page

- [ ] Week 2
  - [ ] Sub-task: [#2](https://gitlab.inf.ethz.ch/COURSE-XAI-IML22/dummy-fullstack/-/issues/2)
  - [ ] Sub-task: ...
  - [x] Completed Sub-task: [#20984ec2](https://gitlab.inf.ethz.ch/COURSE-XAI-IML22/dummy-fullstack/-/commit/20984ec2197fa8dcdc50f19723e5aa234b9588a3)
  - [x] Completed Sub-task: ...


Create a list subtask.\
Open an issue for each subtask. Once you create a subtask, link the corresponding issue.\
Create a merge request (with corresponding branch) from each issue.\
Finally accept the merge request once issue is resolved. Once you complete a task, link the corresponding merge commit.\
Take a look at [Issues and Branches](https://www.youtube.com/watch?v=DSuSBuVYpys) for more details. 

This will help you have a clearer overview of what you are currently doing, track your progress and organise your work among yourselves. Moreover it gives us more insights on your progress.  

## Weekly Summary 
Write here a short summary with weekly progress, including challanges and open questions.\
We will use this to understand what your struggles and where did the weekly effort go to.

## Versioning
Create stable versions of your code each week by using gitlab tags.\
Take a look at [Gitlab Tags](https://docs.gitlab.com/ee/topics/git/tags.html) for more details. 

Then list here the weekly tags. \
We will evaluate your code every week, based on the corresponding version.

Tags:
- Week 1: [Week 1 Tag](https://gitlab.inf.ethz.ch/COURSE-XAI-IML22/dummy-fullstack/-/tags/stable-readme)
- Week 2: ..
- Week 3: ..
- ...


