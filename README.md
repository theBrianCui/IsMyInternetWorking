## First Time Setup

Create a `.env` file in the base directory with the following:

```
NODE_ENV=production|dev
```

The `dev` setting is recommended for development purposes. The `production` setting enables additional minification and increases compilation time.

### Install dependencies:

```
npm install
```

For location services, `freegeoip` must be running in the background listening on port 8080. Binaries are available for all [operating systems here.](https://github.com/fiorix/freegeoip/releases)

### To build:

```
npm run build
```

### To build and start the dev server:

```
npm run start
```
