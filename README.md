This is a [Next.js](https://nextjs.org/) project for tracking plants

## Getting Started

Start the docker container

```bash
docker-compose -f docker/docker-compose.yml up -d

docker exec plant_tracker_node /bin/bash -c "yarn install"
```

Run the development server:

```bash
docker exec -d plant_tracker_node /bin/bash -c "yarn dev"
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.