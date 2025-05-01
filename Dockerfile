# Stage 1: Build the application using Bun
# Use an official Bun image which includes Node.js and Bun
FROM docker.io/oven/bun:1 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb (if exists)
# Using '*' for bun.lock ensures it works even if bun.lockb is the actual lockfile name
COPY package.json bun.lock* ./

# Install dependencies using the lockfile for reproducibility
# Use --frozen-lockfile to ensure bun.lock is not modified
RUN bun install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Run the build command defined in package.json
# This will generate the static site in the /app/dist directory
RUN bun run build

# Stage 2: Serve the static assets using Nginx
# Use a lightweight Nginx image
FROM docker.io/nginx:stable-alpine AS runner

# Set the working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove the default Nginx welcome page
RUN rm -rf ./*

# Copy the built static files from the 'builder' stage's dist directory
COPY --from=builder /app/dist .

# Expose port 80 to allow incoming traffic
EXPOSE 80

# Define the command to start Nginx in the foreground
# This keeps the container running
CMD ["nginx", "-g", "daemon off;"]
