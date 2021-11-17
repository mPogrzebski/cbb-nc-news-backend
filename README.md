
<p align="center">
  <a href="https://github.com/mPogrzebski/cbb-nc-news">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Northcoders News API </h3>

  <p align="center">
    <a href="https://cbb-news.herokuapp.com/api">View Demo</a>
</p>


  



## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [PSQL Install instructions](#psql-install-instructions)
  - [Mac](#mac)
  - [Ubuntu](#ubuntu)
  - [Storing a Postgres password on Ubuntu](#storing-a-postgres-password-on-ubuntu)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
  - [Creating A Pull Request](#creating-a-pull-request)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

## About The Project

An API to access application data programmatically. The intention here is to mimic the building of a real-world backend service (such as Reddit) which should provide this information to the front end architecture.

## Built With

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org)
- [Express](https://expressjs.com/)

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm v16.6+
- psql v13.4+

https://nodejs.org/en/download/current/

```sh
npm install npm@latest -g
```

## PSQL Install instructions

### Mac

- Install Postgres App https://postgresapp.com/
  - Open the app (little blue elephant) and select initialize/start
- type `psql` into your terminal. You should then see something similar to:

```psql
psql (9.6.5, server 9.6.6)
Type "help" for help.

username=#
```

- if the above does not show/you get an error, run the following commands in your terminal:
  - `brew update`
  - `brew doctor`
  - `brew install postgresql`

### Ubuntu

- Run this command in your terminal:
  `sudo apt-get update`

  `sudo apt-get install postgresql postgresql-contrib`

- Next run the following commands to create a database user for Postgres.

  `sudo -u postgres createuser --superuser $USER`

  `sudo -u postgres createdb $USER`

If you see the following error: _`role "username-here" already exists`,_ it means that you already have a Postgres user so can move on to the next step.

If you see the following error: _`Cannot connect to database/server` or similar,_ run `sudo service postgresql start` to ensure that the postgresql server is running before trying the above again.

- Then run this command to enter the terminal application for PostgreSQL:

  `psql`

- Now type:

  `ALTER USER username WITH PASSWORD 'mysecretword123';`

  **BUT** Instead of `username` type your Ubuntu username and instead of `'mysecretword123'` choose your own password and be sure to wrap it in quotation marks. Use a simple password like 'password'. **DONT USE YOUR LOGIN PASSWORD** !

- You can then exit out of psql by typing `\q`

### Storing a Postgres password on Ubuntu

To set a default password to use when running the psql cli you can create a file called `.pgpass` in your home directory. (If you're using macOS this feature comes out of the box so no need to follow these steps)

**tip:** You can navigate to your home directory from any terminal by running cd with no arguments

```bash
cd
```

Create a file called `.pgpass` and open it with a text editor.

```bash
touch .pgpass
```

```bash
code .pgpass
```

The file will be empty when first created, and you should then add a single line with the following format:

```
hostname:port:database:username:password
```

Each field can be a literal value or a wildcard: `*`. We just want to set a password so should add the following to your file (replacing 'mypassword' with your actual password that you created when you ran the `ALTER USER` command):

```
*:*:*:*:mypassword
```

The permissions on `.pgpass` must disallow any access to world or group; You can do this with the following command

```bash
chmod 0600 ~/.pgpass
```

When you run psql it should now use this password as a default so you don't have to provide one on every command.

### Installation

2. Clone the repo

```sh
git clone https://github.com/mPogrzebski/cbb-nc-news.git
```

3. Install NPM packages

```sh
npm install
```

4. Create _two_ `.env` files for your project:
   `.env.test` with `PGDATABASE=nc_news_test`
   and `.env.development` with `PGDATABASE=nc_news`.  
   Double-check that these `.env` files are .gitignored.

5. Create new database

```sh
npm run setup-dbs
```

5. Populate database

```sh
npm run seed
```

## Usage

TODO

## Contributing

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Authors

- **Mateusz Pogrzebski** - _Coding chef_ - [Mateusz Pogrzebski](https://github.com/mPogrzebski) - \*\*

## Acknowledgements

