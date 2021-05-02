# Blog (client) - MERN

This project was made using MREN, you can view it [here](https://developer-social-website.herokuapp.com/).

> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.

## to clone or download (client)
```terminal
$ git clone https://github.com/halevyoren/full-stack-blog-client.git
$ npm i
```

# Usage (run client app on your machine)

## Prerequirements
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client   // go to client folder
$ npm install       // npm install pacakges
$ npm start // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

