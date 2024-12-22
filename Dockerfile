# Stage 1: Install dependencies and build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Create the production image
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the necessary files for runtime
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the application port
EXPOSE 3000

# Command to start the application
CMD ["node", "dist/main.js"]
