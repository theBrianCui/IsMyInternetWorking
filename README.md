# Is My Internet Working?

Official source code for the website [Is My Internet Working?](https://ismyinternetworking.com/). Now powered by Node.js. 

## First Time Setup

Create a `.env` file in the base directory with the following:

```
NODE_ENV=production|dev
```

The `production` build enables minifaction, Google Analytics, and other small changes. The `dev` build is faster and better suited for development purposes.

Install dependencies:

```
npm install
```

For location services, `freegeoip` must be running in the background listening on port 8080. Binaries are available for all [operating systems here.](https://github.com/fiorix/freegeoip/releases)

To build the project, run

```
npm run build
```

This will build project files in the `/build` directory.

To build the project AND start a local web server, run

```
npm run start
```

The site will be hosted at `localhost:8000`.
