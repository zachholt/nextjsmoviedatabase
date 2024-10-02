## Movie Database

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This Movie Database is a small user interface project that built for a CRUD Back-End Application. 

## Description

This project involves many lessons I have learned over the course of a couple months to demonstrate my abilities to create a user interface using React, NextJS, Tailwind and more.

This website gets and sends data specifically for a local swagger client ran on the user's computer. This client contains an api that holds information for directors, movies, and actors. The goal of this project was to create an interface that talked to this back-end api to present data to the user and allow the user to input their own data as well. 

## Challenges I faced

I came across small bugs and had to learn how to resolve issues. For example, text not rendering on screen and the timing of fetching and posting information. Another issue was an incorrect date being added to the database. The date would be off by one day. 

## My workflow and thoughts on the making of this project

## Reading the data

I started this project by figuring out what was really needed. I made a Trello board to show my ideas for the website’s features. The main goal of this site was to show how to do CRUD (Create, Read, Update, Delete) operations. I started by reading the data. The local Swagger client had all the details about the data structure and what we needed to get it.

I started by reading data about movies and putting it in a simple table. The table had headers like movie title, release date, director, actors, genre, and rating. Once I figured out how to talk to the server and get the data, I moved on to reading data about actors and directors. The process was the same, but there was less data to read.

I copied the movie table page and got rid of any extra information that did not relate to the actors and directors. I also changed the server calls from “movie” to “directors” and “actors". Then I noticed that I had copied and pasted the same code over and over again. To fix this, I decided to make a reusable Table component that could be used on all the pages. I could pass data into this component to keep the design the same across all the pages. The Table component needed headers defined on the pages for directors, actors, and movies. This was important because the “Movies” page had more headers than the “Directors” and “Actors” pages. Also, the actors and directors in this project were the same. 

## Creating the Data

Once all the correct data was showing in tables. I had to create the user interface for adding a movie. I first created the Movie form and create inputs and dropdowns and selectors for the movie. I mainly referenced the example provided in the local swagger client. I wanted to keep this page simple. Once the user interface was created, I had to implement the upload of data. I grabbed all the form information and put it in a nice movieData package that was in the format of what the local swagger client was expecting. once this was working, I linked the page to an add movie button on the movies page and copied my approach to the actors and directors page. 

I added an add actor's page and I was halfway through the director's page when I decided to merge the two. Both actors and directors had the same data. I used dynamic routing and entity passing to the page to know the difference in what we were adding.


## Updating and Deleting the Data

These two actions were simple. I added a delete button to the tables and when the button was clicked, it would remove the value based on id in one action. For updating a selected value, I recreated the add page for actor and director and change the axios operation from a post to put and changed wording from add to update. 

## Thoughts

I enjoyed working on this project. I was familiar with code before but nothing related to react. I am a fan of simplicity and I try to reuse as much code as I can. Is there things I would improve in this project? Of course. However I am satisfied with what I ended up creating at this point in development. Overall this project was me creating code, realizing I can simplify it, and then improving. There are still things that can be simplified, maybe combining the actor and director pages. More features can be added but that is what updates are for.


## Running the project for yourself

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Tests

Two unit tests are included, rending the add movie page and adding a movie.


## Files relating to project

[Trello Board](https://trello.com/b/eNjtxTSP/front-end-spring-2024)

[Figma](https://www.figma.com/design/N3CLZkN7IMpW1GZmXMkXZi/Movie-Database?node-id=5-1185&node-type=canvas&t=LMMl8ldxuWcKELFr-0)