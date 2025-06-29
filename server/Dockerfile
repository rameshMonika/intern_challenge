# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all server files
COPY . .

# Expose API port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
