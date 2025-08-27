# Sapio

This repo contains all the tools and apps necessary to run the project Sapio

There are two parts to it broken down:
    - The Webscraper
    - The Website

The Webscraper pulls data from SEC.EDGAR into local files, which then you need to upload to PostgreSQL database. <- This part is a simple script

The Website contains of two components:
    - The client (What we call the frontend) 
    - The server (What we call the backend)

The client and server both need to be hosted on separate services and need to be connected to each other. 

The code stack is official React + Node & Express + Postgre.

To break it down a little bit more, the frontend and backend use Javascript but slightly different versions of javascript from each other (React vs. Node):
    - React handles all the front end using something called JSX, and is essentially what the user sees and interacts with. I use a library called Tailwind to deal with the formatting. 
    - Node.js + Express is a slightly different version of Javascript which uses a library called Express to handle all the server side details. It's not meant for handling user interaction
    - Postgre is the database that we use and query from.

The code flow goes from React -> Node -> Postgre when you query data and then Postgre would return to Node, which in turn returns that data to React. 

What will happen is that you need to connect all three services together, and thats the part where I am stuck right now. To give you a place to start looking, here is where you might want to start looking:
    - client: Everywhere, all fetch() functions need to point to the url of the server for example fetch(/api/users) -> fetch(https://api.myapp.com/api/users)
    - server: dataController.js (SUPABASE_URL, SUPABASE_ANON_KEY) <- this is the connection to PostgreSQL

These files are where you need to link things up with each other. 