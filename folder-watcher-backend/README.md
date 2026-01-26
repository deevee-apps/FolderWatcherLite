### Step 1: Set Up Your Node.js Environment

1. **Install Node.js**: If you haven't already, download and install Node.js from [nodejs.org](https://nodejs.org/).

2. **Create a New Project**:
   ```bash
   mkdir folder-watcher-backend
   cd folder-watcher-backend
   npm init -y
   ```

### Step 2: Install Required Packages

3. **Install Required Packages**:
   You will need `express` for creating the server and `chokidar` for watching the directory.
   ```bash
   npm install express chokidar
   ```

### Step 3: Create the Server

4. **Create a Server File**:
   Create a file named `server.js` in your project directory.
   ```bash
   touch server.js
   ```

5. **Set Up the Express Server**:
   Open `server.js` and add the following code:
   ```javascript
   const express = require('express');
   const chokidar = require('chokidar');
   const cors = require('cors');

   const app = express();
   const PORT = process.env.PORT || 3000;

   app.use(cors());
   app.use(express.json());

   let events = [];

   // Watch a directory
   const watcher = chokidar.watch('path/to/your/folder', {
       persistent: true
   });

   watcher
       .on('add', path => {
           const event = { timestamp: new Date(), eventType: 'added', filename: path };
           events.push(event);
           console.log(event);
       })
       .on('change', path => {
           const event = { timestamp: new Date(), eventType: 'changed', filename: path };
           events.push(event);
           console.log(event);
       })
       .on('unlink', path => {
           const event = { timestamp: new Date(), eventType: 'removed', filename: path };
           events.push(event);
           console.log(event);
       });

   // Endpoint to get events
   app.get('/events', (req, res) => {
       res.json(events);
   });

   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
   ```

### Step 4: Run the Server

6. **Run Your Server**:
   In your terminal, run:
   ```bash
   node server.js
   ```

### Step 5: Test the Setup

7. **Test the Folder Watching**:
   - Create a folder at the path you specified in the `chokidar.watch` method.
   - Add, change, or delete files in that folder and observe the console logs for events.

8. **Access the Events**:
   - You can access the events by navigating to `http://localhost:3000/events` in your browser or using a tool like Postman.

### Step 6: Connect to Your Frontend

9. **Connect to Your Frontend**:
   - In your Angular frontend, you can make HTTP requests to the `/events` endpoint to fetch the events and display them in your UI.

### Additional Notes

- Make sure to replace `'path/to/your/folder'` with the actual path of the folder you want to watch.
- You may want to implement additional error handling and cleanup logic as needed.
- If you plan to deploy this application, consider using environment variables to manage configuration settings like the folder path and port number.