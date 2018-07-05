ALPHA Release

# Kairos ID Signature Proxy

Kairos ID Signature Proxy responsible for signing Kairos API responses when using the Kairos Protocol™ ([Human Identity Interface™])(https://github.com/kairosinc/id-wallet/tree/master/contracts/HumanIdentity/README.md). 

## Getting Started

### Prerequisites

* `node` / `npm`

* `yarn`

### Setup

```sh
$ git clone git@github.com:kairosinc/id-signature-proxy.git

# Cloning into 'id-signature-proxy'...
# remote: Counting objects: 3, done.
# remote: Compressing objects: 100% (2/2), done.
# remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
# Receiving objects: 100% (3/3), done.
```

```sh
$ yarn install

# yarn install v1.5.1
# [1/4] 🔍  Resolving packages...
# ... install all the things
# ✨  Done in 0.54s.
```

```sh
$ yarn setup

# yarn run v1.5.1
# $ cp .env.example .env
# ✨  Done in 0.11s.
```

Then open `.env-ci` and set to your heart's content

### Docker Setup

The proxy server repository includes a `Dockerfile` for easy integration
with an existing container infrastructure.

```sh
make build
make run
```

Migrate the Dockerfile instructions and the Docker Compose parameters to your existing
infrastructure to host the proxy server.

## Commands

To start a development environment:

```sh
$ yarn develop

# yarn run v1.5.1
# $ nodemon --exec babel-node src
# [nodemon] 1.17.1
# [nodemon] to restart at any time, enter `rs`
# [nodemon] watching: *.*
# [nodemon] starting `babel-node src`
# ID Signature Proxy server running on 8000.
```

To build a production application:

```sh
$ yarn build

# yarn run v1.5.1
# $ rimraf lib && babel src -d lib
# ... building files
# ✨  Done in 1.07s.
```

To run the production application:

```sh
$ yarn start

# yarn run v1.5.1
# $ node lib
# ID Signature Proxy server running on 8000.
```

To lint the `src/` directory:

```sh
$ yarn lint

# yarn run v1.5.1
# $ eslint src
# ✨  Done in 1.07s.
```

### Git Hooks

To execute `yarn lint`:

```sh
$ yarn precommit

# yarn run v1.5.1
# $ yarn lint
# $ eslint src
# ✨  Done in 1.36s.
```

To execute `yarn build && yarn lint`:

```sh
$ yarn prepush

# yarn run v1.5.1
# $ yarn build && yarn lint
# $ rimraf lib && babel src -d lib
# ... building files
# $ eslint src
# ✨  Done in 2.87s.
```

## Application Structure

The application contains a few components:

* `api/`
  * `config/`
  * `controllers/`
  * `proxy/`
  * `routes.js`
  * `server.js`

### api/

`api/` is the container surrounding the rest of the application.

### config/

`config/` is a folder for constants and api-internal configuration.

### controllers/

`controllers/` contains files which are intended to execute upon specific API route calls.

### proxy/

`proxy/` is where application-specific business logic lives.

### routes.js

`routes.js` define routes that execute controller methods.

### server.js

`server.js` creates our HTTP server.


## Feedback and Getting Help

We'd love to hear feedback from you and we're also here to help if you have any questions — feel free to [email our support team](mailto:support@kairos.com).

