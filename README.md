# About 

This is a social media application built with Node.js and MongoDB, designed to allow users to share posts, follow other users, comment, and like posts. The app features user authentication, secure password management, media uploads (images and videos), and role-based access control for certain actions. Users can create and manage personal profiles, share posts with text and media, and follow and interact with other users through likes, comments, and sharing posts. The application provides functionalities such as signing in, signing up, changing passwords, and allows users to edit or delete their own comments, ensuring a smooth user experience. Additionally, users can view a personalized timeline based on the accounts they follow and experience real-time updates on likes and comments. This project focuses on providing a robust and scalable backend, ensuring smooth user interactions, secure data management, and an enjoyable experience for all users.


## Features

 * User Authentication: Secure sign-in and sign-up processes with password encryption.
 * Logging with Morgan: Use Morgan for logging HTTP requests to improve debugging and monitor application performance.
 * Security with Helmet: Employ Helmet to enhance your application’s security by setting various HTTP headers, helping to protect against common web vulnerabilities.
 * Profile Management: Users can create and edit personal profiles, including profile and cover photos.
 * Post Creation: Share posts containing text, images, or videos, with the ability to edit or delete posts.
 * File Uploads: Utilize Multer for handling file uploads, allowing users to upload images and videos with their posts.
 * Timeline: View a personalized feed of posts from users that you follow.
 * Comments and Likes: Interact with posts by adding comments and liking them, with the option to edit or delete your own comments.
 * Sharing Posts: Share posts from other users on your timeline to promote content and engage with the community.
 * Follow System: Follow other users to see their posts in your timeline and get real-time updates on their activity.
 * Real-time Updates: Enjoy live notifications for new likes and comments on your posts.
 * Role-based Access Control: Differentiate access and permissions between regular users and admins for certain actions.
 * JWT Authentication: Ensures secure user authentication and authorization for accessing protected routes based on user roles (user and admin).
 * Admin Dashboard: A comprehensive interface for admins to manage users, posts, comments, and view analytics.

 
## Using  

 * JavaScript.
 * Express.js.
 * Helmet: Security middleware for securing HTTP headers.
 * Morgan: HTTP request logger for API requests.
 * DB ( MongoDB ).
 * ORM Mongoose.
 * User Authentication: JWT-based authentication.
 * Authorization: Role-based access control for both users and admins.
 * File Upload: Using Multer.
 * bcrypt.
 * API Validation: Using Joi for validating API inputs.
 * dotenv.
 * Cors: Enabled for secure handling of API requests.

## Collections

* Users: Stores user information, including profiles, followers, and following relationships.
* Posts: Contains shared content with descriptions, media, and associations to users.
* Comments: Holds user comments on posts, linked to both the user and the post.
* Auth: Manages user authentication, including registration and password management.
* Shares: Tracks shared posts, allowing users to share content from others.

## API Endpoints
### Auth APIs : 

1. `POST /auth/signUp`: Register a new user. This route includes middleware to check for email duplication and validate the input based on the provided schema.
2. `POST /auth/signIn` : Authenticate a user and log them in.
3. `PATCH /auth` : Change the authenticated user's password.

### User APIs

1. `PUT /users`: Update the authenticated user's details. This route requires user authentication.
2. `DELETE /users/:id`: Delete a user by their ID. This route requires admin authorization.
3. `GET /users/:id`: Retrieve a user by their ID. This route requires user authentication.
4. `GET /users`: Retrieve all users. This route requires admin authorization.
5. `PUT /users/:id/follow`: Follow a user by their ID. This route requires user authentication.
6. `PUT /users/:id/unFollow`: Unfollow a user by their ID. This route requires user authentication.

### Post APIs

1. `POST /posts`: Create a new post. This route requires user authentication and allows uploading media files.
2. `PUT /posts/:id`: Update an existing post by its ID. This route requires user authentication and allows uploading media files.
3. `GET /posts`: Retrieve all posts.
4. `GET /posts/:id`: Retrieve a specific post by its ID, including associated comments.
5. `DELETE /posts/:id`: Delete a post by its ID. This route requires user authentication.
6. `PUT /posts/:id/like`: Like a post by its ID. This route requires user authentication.
7. `PUT /posts/:id/unlike`: Unlike a post by its ID. This route requires user authentication.
8. `GET /posts/:id/likes`: Retrieve all likes for a specific post by its ID.
9. `GET /posts/timeline/all`: Retrieve posts from users that the authenticated user follows. This route requires user authentication.

### Comment APIs

1. `POST /comments`: Create a new comment. This route requires user authentication and validates the input based on the provided schema.
2. `GET /comments/:id`: Retrieve all comments for a specific post by its ID.
3. `PATCH /comments/:id`: Update an existing comment by its ID. This route requires user authentication, and users can only modify their own comments.
4. `DELETE /comments/:id`: Delete a comment by its ID. This route requires user authentication, and users can only delete their own comments.


### Share APIS

1. `POST /share`: Share a post. This route requires user authentication to ensure that only authenticated users can share posts.


## Deployment

* MongoDB Atlas: Use MongoDB Atlas for a managed cloud database.
* Vercel: Deploy the application on Vercel for easy hosting and management.

## Key Takeaways from this Project

This project emphasizes user-centric design, ensuring a seamless experience for following, commenting, and sharing posts. It incorporates robust security measures with authentication and authorization, allowing users to access and modify only their content. Built with Node.js and MongoDB, the application is scalable and efficient, supporting media uploads through Multer for enhanced user engagement. The real-time updates on likes and comments improve interaction, while comprehensive input validation and error handling maintain data integrity. The modular structure simplifies maintenance and testing, showcasing best practices in modern web development.

## Project Inspiration

This project was inspired by the need for a platform that fosters community engagement and interaction in a digital space. Observing the success of existing social media platforms, I aimed to create a simplified yet effective solution that allows users to share their thoughts, connect with others, and express themselves through multimedia content. The desire to enhance user experience through real-time interactions and secure data handling further motivated the development of this social media app. The goal was to build a user-friendly environment that encourages authentic communication while prioritizing privacy and security.



