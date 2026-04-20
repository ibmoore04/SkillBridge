# EduTech Universal Data Collection System

## Overview
This system captures user data from ANY browser/device and stores it centrally in your project.

## How It Works

### 1. Central Data Collection
- **Automatic Sync**: Every user action (register, login, logout) syncs to central server
- **Cross-Device**: Works across all browsers and devices
- **Real-Time**: Data collected in real-time from anywhere

### 2. Server Architecture
- **Node.js Server**: Runs on localhost:3001
- **Central Storage**: All data saved to `data/users.json`
- **REST API**: Endpoints for data sync and retrieval

### 3. Data Sources
- **Browser Detection**: Tracks which browser users are using
- **IP Tracking**: Records user IP addresses
- **Session Management**: Tracks all login sessions
- **Timestamps**: Records creation and login times

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the System
```bash
# Start both server and frontend together
npm run dev:full

# Or start separately:
# Terminal 1 - Start server
npm run server

# Terminal 2 - Start frontend
npm run dev
```

### Step 3: Test the System
1. Open browser and go to `http://localhost:5173`
2. Register/login users
3. Check data collection at `http://localhost:5173/#/universal-dashboard`

## Access Points

### Frontend Dashboards
- **User Data**: `http://localhost:5173/#/user-data`
- **Data Manager**: `http://localhost:5173/#/data-manager`
- **Universal Dashboard**: `http://localhost:5173/#/universal-dashboard`

### Server Endpoints
- **Sync**: `POST http://localhost:3001/api/sync`
- **Get Users**: `GET http://localhost:3001/api/users`
- **Get Stats**: `GET http://localhost:3001/api/stats`
- **Export Data**: `GET http://localhost:3001/api/export`
- **Health Check**: `GET http://localhost:3001/api/health`

## Data Storage

### Primary Storage
- **File**: `data/users.json`
- **Format**: JSON with users, sessions, and statistics
- **Backup**: Automatic daily backups

### Data Structure
```json
{
  "lastUpdated": "2025-04-20T00:00:00.000Z",
  "totalUsers": 5,
  "users": [
    {
      "email": "user@example.com",
      "name": "User Name",
      "createdAt": "2025-04-20T00:00:00.000Z",
      "lastLogin": "2025-04-20T00:00:00.000Z"
    }
  ],
  "sessions": [
    {
      "source": {
        "browser": "Chrome",
        "ipAddress": "127.0.0.1",
        "timestamp": "2025-04-20T00:00:00.000Z"
      },
      "sessionData": {
        "email": "user@example.com",
        "name": "User Name"
      }
    }
  ],
  "statistics": {
    "totalRegistrations": 5,
    "totalLogins": 10,
    "activeUsers": 3,
    "lastActivity": "2025-04-20T00:00:00.000Z"
  }
}
```

## Features

### Automatic Data Collection
- **User Registration**: Captured immediately
- **User Login**: Tracked with timestamps
- **Session Data**: Preserved across sessions
- **Browser Info**: Automatically detected
- **IP Address**: Recorded for each session

### Cross-Device Synchronization
- **Multiple Browsers**: Chrome, Firefox, Safari, Edge
- **Multiple Devices**: Desktop, mobile, tablet
- **Real-Time Sync**: 30-second intervals
- **Offline Support**: Queues data when offline

### Data Management
- **Export Functions**: Download data as JSON
- **Statistics Dashboard**: View user metrics
- **Session Tracking**: Monitor user activity
- **Source Analysis**: See where users come from

## Testing Multi-Source Collection

To test data collection from multiple sources:

1. **Different Browsers**: Open your app in Chrome, Firefox, Safari
2. **Different Devices**: Access from mobile and desktop
3. **Incognito Mode**: Test private browsing
4. **Different Networks**: Test from different IP addresses

Each source will be tracked separately in the universal dashboard.

## Security Notes

- **Local Development**: Server runs on localhost only
- **Data Privacy**: All data stored locally in your project
- **No External Services**: No third-party data collection
- **IP Tracking**: Only for source identification

## Troubleshooting

### Server Not Starting
```bash
# Check if port 3001 is available
netstat -an | grep 3001

# Kill existing process
lsof -ti:3001 | xargs kill -9
```

### Data Not Syncing
- Check server status at `http://localhost:3001/api/health`
- Verify browser console for errors
- Ensure both server and frontend are running

### Missing Data
- Check `data/users.json` file exists
- Verify server has write permissions
- Check browser localStorage for cached data

## Next Steps

This system now gives you access to ALL user data from ANYWHERE users log in. The data is automatically collected, synchronized, and stored in your project files for easy access and analysis.
