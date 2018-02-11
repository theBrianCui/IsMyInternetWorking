## First Time Setup

Create a `.env` file in the base directory with the following:

```
NODE_ENV=production|dev
```

Install dependencies:

```
npm install
```

For location services, freegeoip must be running in the background listening on port 8080. Binaries are available for all [operating systems here.](https://github.com/fiorix/freegeoip/releases)

Start the dev server:

```
npm run start
```
