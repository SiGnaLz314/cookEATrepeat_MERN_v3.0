# cookEATrepeat
A web app to present recipes, cooking tips, and suggested preperation techniques for an array of dishes.  Supports user signup and login, as well as create, update and delete recipe capabilities.

- Built on MERN Stack
	- [MongoDB](https://cloud.mongodb.com/)
	- [Express](https://expressjs.com/)
	- [Node.js](https://nodejs.org/en/)
	- [React.js](https://reactjs.org/)

A work in progress.


## Wishlist
- [x] Display static images
- [x] Connect to Database to host recipe data
- [x] Dynamically load recipe data and images
- [x] Host images on AWS S3
- [x] CRUD capabilities (Create, Read, Update, Delete)
- [o] Authentication
	- [x] passport-local
	- [ ] passport-jwt
	- [ ] passport-google
- [o] Format and Validate Input (Images, Recipes, Users )
	- [x] Move Route logic to containers (test logic indepedently)
	- [ ] Testing
- [o] Search Functionality
	- [o] Sort Recipes
- [o] Recipe Features
	- [o] User Comments
	- [o] Edit Recipes
- [ ] Redux & Hooks Refactoring
- [ ] Plant roses and paint the barn


## RUN LOCAL:
1. After Repository is cloned, dependencies installed, and database is established.
2. Open a terminal window (CMD) and enter:
	```
	$ cd ..\cer_mern_v2>npm start
	$ cd ..\cer_mern_v2\client>npm start
	```

### .env
- Create .env file in root directory
- Add Keys to .env file:

SERVICE | ENTRY
------------ | -------------
Mongo Cloud DB | ATLAS_URI = [MongoDB Atlas](https://cloud.mongodb.com/)
Environment Variables | SECRET_KEY = **secret_key**
...| GENERATE_SOURCEMAP = false
Amazon Cloud | AWS_BUCKET_NAME = [AWS BUCKET](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)
... | AWS_ACCESS_KEY_ID = **AWS Access ID**
... | AWS_SECRET_ACCESS_KEY = **AWS Secret Key**
... | AWS_REGION = **YOUR REGION**
... | AWS_Uploaded_File_URL_Link = **YOUR FILE URL**
Authentication | SECRET_KEY = **YOUR SECRET FOR AUTHENTICATION**

## Setup:
1. Follow instructions to setup mongoDB Cloud: 
	- [MongoDB Atlas](https://cloud.mongodb.com/) 
	*There are other resources available, please use your own if you see fit*
2. Ensure **.env** file has proper entries.
    - [.env File Doc](https://create-react-app.dev/docs/adding-custom-environment-variables/)
3. Create Database
	- Follow **DatabaseConnection** Instructions
4. Run
	
## Database Connection:	
1. Open MongoDB Atlas Dashboard
2. Add environment variables to .env file
3. Create collection called 'cookeatrepeat'
4. Run Program and necessary collections will populate.
5. Sign up, and login.
6. Upload Recipes
