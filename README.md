# cookEATrepeat
A web app to present my recipes.
A working prototype, proof of concept, test environment, aiding in the creation of a react.js (MERN Stack) application of the same nature.


## Wishlist
- [x] Display static images
- [x] Connect to Database to host recipe data
- [x] Dynamically load recipe data and images
- [x] Complete CRUD capabilities (Create, Read, Update, Delete)
- [ ] Complete Authentication
- [ ] Format and Validate Input (Images, Recipes, Users )
- [ ] Testing
- [ ] Plant roses and paint the barn


## RUN LOCAL:
1. After Repository is cloned, dependencies installed, and database is established.
2. Open a terminal window (CMD) and enter:
	```
	$ cd ..\cer_mern_v2>npm start
    $ cd ..\cer_mern_v2\backend>nodemon server.js
	```

### .env
- Create .env file in ../backend/
- Add Keys to .env file:
    SERVICE | Entry
    --------|-------
    Mongo Cloud DB | ATLAS_URI = [MongoDB Atlas](https://cloud.mongodb.com/)
    Amazon Cloud Hosting | AWS_BUCKET_NAME = [AWS BUCKET](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)
    ...| AWS_ACCESS_KEY_ID = **OPTION for hosting images instead of inside a static folder**
    ...| AWS_SECRET_ACCESS_KEY = **see above**
    ...| AWS_REGION = **YOUR REGION**
    ...| AWS_Uploaded_File_URL_Link = **YOUR FILE URL**
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
5. Upload Recipes
