# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS deps

# Create and set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# Copy necessary files for building the app
COPY . .

# Build the app (for Next.js v14, this supports new /app router structure)
RUN npm run build

# Production image for running the built app
FROM node:18-alpine AS runner

WORKDIR /app

# Copy the built files from the previous stage
COPY --from=deps /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/public ./public
COPY --from=deps /app/package.json ./package.json

# Expose Next.js default port
EXPOSE 3000

# Set environment variable to production
ENV NODE_ENV production

# Run Next.js app
CMD ["npm", "start"]
