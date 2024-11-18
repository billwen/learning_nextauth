#!/bin/sh
# ENVIRONMENT from docker-compose.yaml doesn't get through to subprocesses
# Need to explicit pass DATABASE_URL here, otherwise migration doesn't work
# Run migrations
echo "Connecting to $DATABASE_URL"
npx prisma migrate deploy
# start app
node server.js