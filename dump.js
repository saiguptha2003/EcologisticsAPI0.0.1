const { exec } = require('child_process');

// Replace these values with your actual MongoDB connection string and output directory
const connectionString = "mongodb://localhost:27017/Ecologistics";
const outputDirectory = "/Users/username/mongodb_backup";

// Construct the mongodump command
const command = `mongodump --uri="${connectionString}" --out="${outputDirectory}"`;

// Execute the command
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing mongodump: ${error}`);
        return;
    }
    console.log(`mongodump executed successfully`);
});
