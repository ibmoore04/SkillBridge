// Simple server for centralized data collection
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data', 'users.json');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  } catch (error) {
    console.log('Data directory exists or created');
  }
}

// Read existing data
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {
      lastUpdated: new Date().toISOString(),
      totalUsers: 0,
      users: [],
      sessions: [],
      statistics: {
        totalRegistrations: 0,
        totalLogins: 0,
        activeUsers: 0,
        lastActivity: null
      }
    };
  }
}

// Write data
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Merge user data from different sources
function mergeUserData(existingData, newData) {
  const merged = { ...existingData };
  
  // Merge users (avoid duplicates by email)
  const existingEmails = new Set(merged.users.map(u => u.email));
  const newUsers = newData.users.filter(u => !existingEmails.has(u.email));
  
  merged.users = [...merged.users, ...newUsers];
  merged.totalUsers = merged.users.length;
  
  // Add session
  if (newData.currentSession || newData.isLoggedIn) {
    merged.sessions.push({
      ...newData.source,
      sessionData: newData.currentSession,
      timestamp: new Date().toISOString()
    });
  }
  
  // Update statistics
  merged.statistics.totalRegistrations = merged.users.length;
  merged.statistics.totalLogins = merged.sessions.length;
  merged.statistics.activeUsers = merged.sessions.filter(s => 
    new Date(s.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
  ).length;
  merged.statistics.lastActivity = new Date().toISOString();
  merged.lastUpdated = new Date().toISOString();
  
  return merged;
}

// API Routes

// Sync endpoint - receives data from any browser/device
app.post('/api/sync', async (req, res) => {
  try {
    const userData = req.body;
    
    // Add server-side info
    userData.source.ipAddress = req.ip || req.connection.remoteAddress;
    userData.source.serverTimestamp = new Date().toISOString();
    
    // Read existing data
    const existingData = await readData();
    
    // Merge new data
    const mergedData = mergeUserData(existingData, userData);
    
    // Save merged data
    await writeData(mergedData);
    
    console.log(`Data synced from ${userData.source.browser} - Total users: ${mergedData.totalUsers}`);
    
    res.json({
      success: true,
      totalUsers: mergedData.totalUsers,
      totalSessions: mergedData.sessions.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all user data
app.get('/api/users', async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const data = await readData();
    res.json({
      ...data.statistics,
      totalSessions: data.sessions.length,
      uniqueBrowsers: [...new Set(data.sessions.map(s => s.source.browser))].length,
      uniqueIPs: [...new Set(data.sessions.map(s => s.source.ipAddress))].length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export data
app.get('/api/export', async (req, res) => {
  try {
    const data = await readData();
    const filename = `user-data-export-${new Date().toISOString().split('T')[0]}.json`;
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start server
async function startServer() {
  await ensureDataDir();
  
  app.listen(PORT, () => {
    console.log(`\n=== EduTech Data Collection Server ===`);
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Data file: ${DATA_FILE}`);
    console.log(`Endpoints:`);
    console.log(`  POST /api/sync     - Sync user data`);
    console.log(`  GET  /api/users    - Get all users`);
    console.log(`  GET  /api/stats    - Get statistics`);
    console.log(`  GET  /api/export   - Export data`);
    console.log(`  GET  /api/health   - Health check`);
    console.log(`=====================================\n`);
  });
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  process.exit(0);
});

startServer().catch(console.error);
