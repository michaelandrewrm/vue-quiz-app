# vue-quiz-pp

This project use Docker to containerize the app, after clone the repository please install the necessary dependencies to run the application on Docker.

## Docker commands to test the app locally:

## Build a container:

```sh
docker build -t vue-quiz-app .
```

## Run the docker image:

```sh
docker run -dp 127.0.0.1:5173:5173 vue-quiz-app
```

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Compile for Development

```sh
pnpm preview
```
