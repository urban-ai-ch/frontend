# URBAN-AI

## Team Members

1. Patrick Eugster
2. Noah Gerber
3. Eren Homburg
4. Saimaneesh Yeturu

## Project Description

Through this web application, we provide a simple interface for both experts and casual users to interact with URBAN-AI, an AI that offers meaningful architectural and civil engineering insights from simple images of buildings.

Our project is two fold: on the one side, we provide an interactive map for users to visualise the existing curated datasets from 6 major cities. On the other, we aim to provide a tool for users to upload their own images, to gain insights into structures that personally interest them.

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

You will be prompted to login. The register page is locked for now as we do not wish to make the data public (due to the unpublished nature of the paper).

You may use the username 'test' and password 'test'. Please do not share these credentials.

## Milestones

- [x] Page skeleton, implementation of core functionalities (Milestone 2)

  - [x] Responsive navigation bar
  - [x] Create filter components (dropdown menu)
  - [x] Basic interactive map
  - [x] Login frontend
  - [x] Conversion of data from shapefiles to geojson
  - [x] First test of interactive, clickable map with data
  - [x] Backend fetching of correct geojson file
  - [x] Home page
  - [x] About page
  - [x] Functional contact page

- [ ] Processing of uploaded images, Google Maps StreetView API, accessibility, responsiveness (Milestone 3)
  - [x] Improve responsiveness
  - [x] Make dataset points clickable to display properties
  - [x] Google StreetView API to view relevant (to data point) street view panoramas
  - [x] More consistent design layout
  - [x] Host Grounding-SAM on Replicate
  - [x] Host an LLM on Cloudflare
  - [x] Create an image portal for direct uploads to the AI
  - [x] Make all pages responsive and usable on mobile devices
  - [x] Profile page
  - [x] Token purchasing system

## Weekly Summary
For a clearer overview of our achievements, we present our summary as a list of implemented features.

### Backend

#### Authentication
We implemented our own authentication, consisting of jwt signing and verification aswell as hashing.

#### Data-Storage
We use a KV-Storage for user related data, running on Cloudflares Edge.For larger data like images and geojson data we user an R2-Object-Storage.

#### Data Security
We moved the R2-Bucket with our geojson data from a public subdomain to an endpoint behind our Worker, to prevent data leaks of the raw geojson data.

#### Image Upload
The image endpoint leverages file streaming to ensure a fast upload of multiple images to its dedicated R2-Bucket.

#### Resource Caching
To minimize request fees of the R2-Object-Storage, we decided to implement a caching.This caching consists of the standard browser cache, aswell as the Cloudflare edge cache.

#### Rate Limiting
Another mechanism, we leverage to minimize request fees, is ratelimiting. We ratelimit specific endpoints to prevent abusive behavior.

#### Mail Service
We have an email endpoint that redirects requests from our contact form to our private email accounts. The form submissions are processed and sent from our project domain email `backend@urban-ai.ch'.

#### Cross Origin Resource Sharing
Since our backend is deployed on a different subdomain than our frontend, we implemented Cross-Origin Resource Sharing (CORS), which involves modifying response headers and handling preflight OPTIONS requests.

#### Cloudflare Features
We deployed a variety of Cloudflare Features ranging from DDOS-Protection, bot detection or load time optimization to analytics and logs.

## Versioning

Tags:

- Milestone 2: [Milestone 2 tag](https://gitlab.ethz.ch/webdev-hs24-urbanai/frontend/-/tags/v0.1)

