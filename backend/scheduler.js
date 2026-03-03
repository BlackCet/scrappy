const cron = require('node-cron');
const { exec } = require('child_process');
const path = require('path');

const runPythonScript = (scriptName) => {
    const pythonPath = path.resolve(__dirname, '..', 'scrapers', '.venv', 'Scripts', 'python.exe');
    const scriptPath = path.resolve(__dirname, '..', 'scrapers', scriptName);

    console.log(`--- [${new Date().toLocaleTimeString()}] Triggering: ${scriptName} ---`);
    
    // We add 'set PYTHONIOENCODING=utf8 &&' before the command
    const command = `set PYTHONIOENCODING=utf8 && "${pythonPath}" "${scriptPath}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`[${scriptName}] Exec Error: ${error.message}`);
            return;
        }
        if (stderr) {
            // If it's just a warning, it might still show up here
            console.error(`[${scriptName}] Python Stderr: ${stderr}`);
        }
        console.log(`[${scriptName}] Output:\n${stdout}`);
    });
};
/**
 * TASK SCHEDULES
 */

// 1. CEO Tracker & Social Media (Task 1)
// Runs every 30 minutes to catch "Big Shot" communications quickly.
cron.schedule('*/30 * * * *', () => {
    runPythonScript('ceo_tracker.py');
});

// 2. Stock Signals & Market News (Task 2)
// Runs every 15 minutes during market hours for stock-affecting news.
cron.schedule('*/15 * * * *', () => {
    runPythonScript('stock_signal.py');
    runPythonScript('stock_radar.py');
});

// 3. Tech Intelligence & Big Tech R&D (Tasks 3, 4, 5)
// Runs every hour as blog updates and HN trends move slightly slower.
cron.schedule('0 * * * *', () => {
    runPythonScript('tech_radar.py');
});

/**
 * INITIAL BOOTSTRAP
 * Runs everything once when the server starts so your dashboard isn't empty.
 */
console.log("🚀 Initializing Intelligence Engine Scrapers...");
runPythonScript('ceo_tracker.py');
runPythonScript('tech_radar.py');
runPythonScript('stock_signal.py');
runPythonScript('stock_radar.py');

module.exports = runPythonScript;