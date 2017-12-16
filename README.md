# Backend

## API Documentation (Swagger)

In order to view the documentation, open documentation/swagger/dist/index.html in a browser of your choice.

## Continuous Integration (CI)

Currently not set up. Setup with Travis is forthcoming. For now, tests are run locally pre-commit and pre-pull to prevent pushing faulty work - as long as test coverage is maintained.

## Developer Installation

Pre-requisites:
- Docker
- Docker-compose
- pgAdmin 4 (Or anything else that allows you to use psql via the CLI)

Docker does not work on windows without HyperV, which requires Win10 Pro or better. An alternative here is to run an alternate OS in a virtual machine. For example, Ubuntu 16.04 LTS via VirtualBox. If you need help setting this up, ask a nearby friendly dev.

Once you have docker and docker-compose installed, running the backend setup locally requires only that you cd to the project folder and run the following commands the first time you start the backend:

```
npm install
docker-compose up -d
docker ps
docker exec -it backend_db_1 psql -U postgres
CREATE DATABASE local_dev
\q
```

On following startups, you should only need this command:

```
docker-compose up
```

This will tail the compose logs, and thus free you from having to continually retype docker-compose logs to access them. Terminate the process via Ctrl-c. If you need to run docker and maintain control of the terminal, add the -d flag in (Ex: docker-compose up -d), as this will run docker in the background.
