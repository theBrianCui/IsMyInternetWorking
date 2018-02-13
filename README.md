## First Time Setup

Create a `.env` file in the base directory with the following:

```
NODE_ENV=production|staging|dev
```

The `dev` setting is recommended for development purposes and listens on port `8000`. The `production` setting enables additional minification, increases compilation time, enables SSL, and listens on ports 80 and 443. `staging` is like `production` except without SSL and listens on ports `8000` and `8001`.

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
