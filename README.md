# Musique Music Web Application

Music review site where users can submit reviews of musical performances, like IMDb. ReSTfull web API with front-end framework in angular and back-end implementation in node.js, and an authentication protocol providing different levels of functionality to authenticated vs. unauthenticated users. 

## Architecture
<img src="https://user-images.githubusercontent.com/55213734/81371635-590a6800-90c6-11ea-9ead-ce19781e07c1.png" alt="drawing" width="600"/>

The architecture of the application is shown above.
-	Web Tier: The front end, which can accept inputs and display the processes output, provided to the user to interact with the application in a controlled environment. 
-	 Application Tier: Components in the Application Tier process the inputs received from the web tier in application tier by interacting with the components defined in the Database Tier. 
-	 Database Tier: Details of the user, reviews, playlist and ID3V1 were stored in a no-SQL database such as Local MongoDB. Files such as MP3, images and icons were stored/committed into the repository. 

## Database Tier
For the above model the database created had the below tables, listing the columns in the table.
<img src="https://user-images.githubusercontent.com/55213734/81371664-6f182880-90c6-11ea-81a0-00cee257577b.png" alt="drawing" width="600"/>

## Application Tier:
### Authentication:
On accessing the website user is directed to the Login Page, where the person can choose from either of the below, and each path is authenticated/verified using the corresponding method and routed to the respective page. The access to admin page is determined based on ‘isAdmin’ flag for that user in the User database.
<img src="https://user-images.githubusercontent.com/55213734/81371693-7e977180-90c6-11ea-89c9-0a110f270c69.png" alt="drawing" width="500"/>


### Controllers:
Each content access page has a different set of controllers. All the requests to the user and admin controllers are first authenticated for validity using the JWT authentication token.
<img src="https://user-images.githubusercontent.com/55213734/81371712-8eaf5100-90c6-11ea-863c-dfa2fb32f1e3.png" alt="drawing" width="600"/>


## References
- Auth frontend: https://www.youtube.com/watch?v=6n8T_rXXWQg
- Firebase: https://fireship.io/lessons/angularfire-google-oauth/
- Node js: https://github.com/academind/node-restful-api-tutorial/tree/05-add-mongodb-and-mongoose
- Angular: https://coursetro.com/posts/code/174/Angular-8-Tutorial-&-Crash-Course
- Email verification: https://www.youtube.com/watch?v=gzDB0ZGOjA0
