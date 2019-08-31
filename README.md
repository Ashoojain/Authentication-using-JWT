# Authentication-using-JWT
![jwt Pi logo](https://camo.githubusercontent.com/b359ca11ac91fb7428e30e9557755e99105175db/687474703a2f2f692e696d6775722e636f6d2f71444f4f75346f2e6a7067)

# Server
Using the core node.js http server we create 5 routes 

- Signup : Signup page ( where our user create a profile ).
- Login : where our user can login with credetials(email,password).
- Update : our restricted content - login required (valid session token) to see this page and can update the data.
- logout : invalidates the token and logs out the user (prevent from re-using old token)
- Readalluser:Show all the data user from database  


