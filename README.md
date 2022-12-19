# Node.js Practical Test

## Instructions to run the application after cloning locally

* To install dependencies run 'npm install' on the terminal after getting into backend folder

* To start the application  run 'npm start' on the terminal 

## Instructions to run the application 

* I have deployed the backend in AWS and used Nginx as web server & reverse proxy

* Live link : http://34.239.102.32/

## Api requests for each requirements

* http://34.239.102.32/api/users/signup  -- User Signup

    For signup you need to give the firstname,lastname,email and password in the request body

    sample input 

    {
    "firstName":"Rahul",
    "lastName":"P",
    "password":"99999",
    "email":"rahulpar1999@gmail.com"
    }

* http://34.239.102.32/api/users/login   -- User Login

    For logging in you need to give the email and password in the request body

    sample input 

    {
    "password":"99999",
    "email":"rahulpar1999@gmail.com"
    }

* http://34.239.102.32/api/users/profile     -- View User Profile

    To view the user profile section you need to attch the jwt token in thr headers

* http://34.239.102.32/api/users/user-history  -- View insights history 

* http://34.239.102.32/api/users/get-insights  -- Find out insights of new website

* http://34.239.102.32/api/users/add-to-fav-insight  -- Mark an insight as favourite

* http://34.239.102.32/api/users/remove-from-fav-insight -- Remove insight from favourite

* http://34.239.102.32/api/users/:id -- Remove an insight

* http://34.239.102.32/api/users/logout   -- User Logout



## Services used:
* Node.js
* Express.js
* MongoDB
* JWT
* Mongoose
* bcryptjs
* AWS
* Nginx
