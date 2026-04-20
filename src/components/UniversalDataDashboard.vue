<template>
  <div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-6">Universal User Data Dashboard</h2>
    
    <!-- Server Status -->
    <div class="mb-6 p-4 rounded-lg" :class="serverStatus.online ? 'bg-green-50' : 'bg-red-50'">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold" :class="serverStatus.online ? 'text-green-800' : 'text-red-800'">
            Server Status
          </h3>
          <p class="text-sm" :class="serverStatus.online ? 'text-green-600' : 'text-red-600'">
            {{ serverStatus.online ? 'Connected' : 'Disconnected' }}
          </p>
        </div>
        <button @click="checkServerStatus" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Check Status
        </button>
      </div>
    </div>

    <!-- Global Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="text-sm font-semibold text-blue-800">Total Users</h3>
        <p class="text-2xl font-bold text-blue-600">{{ globalStats.totalUsers }}</p>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <h3 class="text-sm font-semibold text-green-800">Total Sessions</h3>
        <p class="text-2xl font-bold text-green-600">{{ globalStats.totalSessions }}</p>
      </div>
      
      <div class="bg-purple-50 p-4 rounded-lg">
        <h3 class="text-sm font-semibold text-purple-800">Unique Browsers</h3>
        <p class="text-2xl font-bold text-purple-600">{{ globalStats.uniqueBrowsers }}</p>
      </div>
      
      <div class="bg-orange-50 p-4 rounded-lg">
        <h3 class="text-sm font-semibold text-orange-800">Unique IPs</h3>
        <p class="text-2xl font-bold text-orange-600">{{ globalStats.uniqueIPs }}</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-4 mb-6">
      <button @click="refreshData" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Refresh Data
      </button>
      <button @click="forceSync" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Force Sync
      </button>
      <button @click="exportAllData" class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
        Export All Data
      </button>
      <button @click="showRawData" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Show Raw Data
      </button>
    </div>

    <!-- Users from All Sources -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-3">All Users ({{ allUsers.length }})</h3>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Created</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Last Login</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Source</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in allUsers" :key="user.email" class="hover:bg-gray-50">
              <td class="border border-gray-300 px-4 py-2">{{ user.name || 'N/A' }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ formatDate(user.createdAt) }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ formatDate(user.lastLogin) }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {{ getSourceInfo(user) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Recent Sessions -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-3">Recent Sessions</h3>
      <div class="space-y-2">
        <div v-for="session in recentSessions" :key="session.timestamp" class="border rounded-lg p-3">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-medium">{{ session.sessionData?.name || 'Unknown User' }}</p>
              <p class="text-sm text-gray-600">{{ session.sessionData?.email }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(session.timestamp) }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {{ getBrowserName(session.source.browser) }}
              </p>
              <p class="text-xs text-gray-500 mt-1">{{ session.source.ipAddress }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Sources -->
    <div class="border rounded-lg p-4">
      <h3 class="text-lg font-semibold mb-3">Data Sources</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 class="font-medium mb-2">Browsers</h4>
          <div class="space-y-1">
            <div v-for="browser in uniqueBrowsers" :key="browser" class="text-sm">
              {{ getBrowserName(browser) }}
            </div>
          </div>
        </div>
        <div>
          <h4 class="font-medium mb-2">IP Addresses</h4>
          <div class="space-y-1">
            <div v-for="ip in uniqueIPs" :key="ip" class="text-sm">
              {{ ip }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div v-if="message" :class="['mt-4 p-3 rounded', messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
      {{ message }}
    </div>

    <!-- Raw Data Modal -->
    <div v-if="showRawModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-auto">
        <h3 class="text-xl font-semibold mb-4">Raw Data</h3>
        <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto">{{ JSON.stringify(rawData, null, 2) }}</pre>
        <button @click="showRawModal = false" class="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import centralCollector from '../utils/centralDataCollector.js';

const serverStatus = ref({ online: false, lastCheck: null });
const globalStats = ref({
  totalUsers: 0,
  totalSessions: 0,
  uniqueBrowsers: 0,
  uniqueIPs: 0
});
const allUsers = ref([]);
const recentSessions = ref([]);
const uniqueBrowsers = ref([]);
const uniqueIPs = ref([]);
const message = ref('');
const messageType = ref('success');
const showRawModal = ref(false);
const rawData = ref({});

const showMessage = (text, type = 'success') => {
  message.value = text;
  messageType.value = type;
  setTimeout(() => message.value = '', 3000);
};

const formatDate = (dateString) => {
  if (!dateString) return 'Never';
  return new Date(dateString).toLocaleString();
};

const getBrowserName = (userAgent) => {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Other';
};

const getSourceInfo = (user) => {
  // This would need to be enhanced to track source info per user
  return 'Multiple Sources';
};

const checkServerStatus = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/health');
    if (response.ok) {
      serverStatus.value = { online: true, lastCheck: new Date() };
      showMessage('Server is online');
    } else {
      serverStatus.value = { online: false, lastCheck: new Date() };
      showMessage('Server is offline', 'error');
    }
  } catch (error) {
    serverStatus.value = { online: false, lastCheck: new Date() };
    showMessage('Cannot reach server', 'error');
  }
};

const loadData = async () => {
  try {
    const data = await centralCollector.getAllCollectedData();
    allUsers.value = data.users || [];
    recentSessions.value = (data.sessions || []).slice(-10).reverse();
    uniqueBrowsers.value = [...new Set((data.sessions || []).map(s => s.source.browser))];
    uniqueIPs.value = [...new Set((data.sessions || []).map(s => s.source.ipAddress).filter(Boolean))];
    
    globalStats.value = {
      totalUsers: allUsers.value.length,
      totalSessions: data.sessions?.length || 0,
      uniqueBrowsers: uniqueBrowsers.value.length,
      uniqueIPs: uniqueIPs.value.length
    };
  } catch (error) {
    showMessage('Failed to load data: ' + error.message, 'error');
  }
};

const refreshData = async () => {
  await loadData();
  showMessage('Data refreshed successfully');
};

const forceSync = async () => {
  try {
    const success = await centralCollector.forceSync();
    if (success) {
      showMessage('Data synced successfully');
      await loadData();
    } else {
      showMessage('Sync failed - check server connection', 'error');
    }
  } catch (error) {
    showMessage('Sync error: ' + error.message, 'error');
  }
};

const exportAllData = async () => {
  try {
    const success = await centralCollector.exportAllData();
    if (success) {
      showMessage('Data exported successfully');
    } else {
      showMessage('Export failed', 'error');
    }
  } catch (error) {
    showMessage('Export error: ' + error.message, 'error');
  }
};

const showRawData = async () => {
  rawData.value = await centralCollector.getAllCollectedData();
  showRawModal.value = true;
};

onMounted(() => {
  checkServerStatus();
  loadData();
});
</script>
