# Stage  1: Build the NestJS application
FROM node:20 AS builder
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage  2: Run the application
FROM node:20
WORKDIR /usr/src/app

# Copy necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
# copy env
COPY --from=builder /usr/src/app/.env ./

# Expose the port the app runs on
EXPOSE  3000

# Start the application
CMD ["npm", "run", "start:prod"]
