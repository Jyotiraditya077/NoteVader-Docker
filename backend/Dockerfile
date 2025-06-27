# Step 1: Use official Node.js image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy rest of the backend code
COPY . .

# Step 5: Expose the backend port
EXPOSE 5000

# Step 6: Start server inside src folder
CMD ["node", "src/server.js"]
