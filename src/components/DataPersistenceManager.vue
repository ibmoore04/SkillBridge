<template>
  <div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-6">Data Persistence Manager</h2>
    
    <!-- Status Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="text-sm font-semibold text-blue-800">Auto-Save</h3>
        <p class="text-lg font-bold text-blue-600">
          {{ persistenceStatus.autoSaveEnabled ? 'Enabled' : 'Disabled' }}
        </p>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <h3 class="text-sm font-semibold text-green-800">Backups</h3>
        <p class="text-lg font-bold text-green-600">{{ persistenceStatus.totalBackups }}</p>
      </div>
      
      <div class="bg-purple-50 p-4 rounded-lg">
        <h3 class="text-sm font-semibold text-purple-800">Data Exists</h3>
        <p class="text-lg font-bold text-purple-600">
          {{ persistenceStatus.dataExists ? 'Yes' : 'No' }}
        </p>
      </div>
      
      <div class="bg-orange-50 p-4 rounded-lg">
        <h3 class="text-sm font-semibold text-orange-800">Last Backup</h3>
        <p class="text-sm font-bold text-orange-600">
          {{ lastBackupTime || 'Never' }}
        </p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-4 mb-6">
      <button @click="saveNow" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save Data Now
      </button>
      <button @click="createBackup" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Create Backup
      </button>
      <button @click="exportData" class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
        Export to File
      </button>
      <button @click="refreshStatus" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Refresh Status
      </button>
    </div>

    <!-- Stored Data Preview -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-3">Stored Data Preview</h3>
      <div class="space-y-4">
        <div class="border rounded-lg p-4">
          <h4 class="font-semibold mb-2">Users ({{ userData.users?.length || 0 }})</h4>
          <div class="max-h-40 overflow-y-auto">
            <pre class="text-sm bg-gray-50 p-2 rounded">{{ JSON.stringify(userData.users, null, 2) }}</pre>
          </div>
        </div>
        
        <div class="border rounded-lg p-4">
          <h4 class="font-semibold mb-2">Current Session</h4>
          <pre class="text-sm bg-gray-50 p-2 rounded">{{ JSON.stringify(userData.currentSession, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <!-- Auto-Save Configuration -->
    <div class="border rounded-lg p-4">
      <h3 class="text-lg font-semibold mb-3">Auto-Save Configuration</h3>
      <div class="space-y-2 text-sm">
        <p><strong>Save Interval:</strong> Every 5 minutes</p>
        <p><strong>Backup Interval:</strong> Every 24 hours</p>
        <p><strong>Max Backups:</strong> 7</p>
        <p><strong>Storage:</strong> Browser localStorage (persisted_*)</p>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="message" :class="['mt-4 p-3 rounded', messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { 
  getPersistenceStatus, 
  saveDataNow, 
  createBackup as createBackupData, 
  exportDataToFile,
  getAllUserData 
} from '../utils/dataPersistence.js';

const persistenceStatus = ref({});
const userData = ref({});
const message = ref('');
const messageType = ref('success');
const lastBackupTime = ref('');

const showMessage = (text, type = 'success') => {
  message.value = text;
  messageType.value = type;
  setTimeout(() => message.value = '', 3000);
};

const loadStatus = () => {
  persistenceStatus.value = getPersistenceStatus();
  userData.value = getAllUserData();
  
  // Get last backup time
  const lastBackup = localStorage.getItem('lastBackupTime');
  if (lastBackup) {
    lastBackupTime.value = new Date(lastBackup).toLocaleString();
  } else {
    lastBackupTime.value = 'Never';
  }
};

const refreshStatus = () => {
  loadStatus();
  showMessage('Status refreshed successfully');
};

const saveNow = async () => {
  try {
    const success = await saveDataNow();
    if (success) {
      showMessage('Data saved successfully');
      loadStatus();
    } else {
      showMessage('Failed to save data', 'error');
    }
  } catch (error) {
    showMessage('Error saving data: ' + error.message, 'error');
  }
};

const createBackup = async () => {
  try {
    const backupKey = await createBackupData();
    if (backupKey) {
      localStorage.setItem('lastBackupTime', new Date().toISOString());
      showMessage('Backup created successfully');
      loadStatus();
    } else {
      showMessage('Failed to create backup', 'error');
    }
  } catch (error) {
    showMessage('Error creating backup: ' + error.message, 'error');
  }
};

const exportData = async () => {
  try {
    const success = await exportDataToFile();
    if (success) {
      showMessage('Data exported successfully');
    } else {
      showMessage('Failed to export data', 'error');
    }
  } catch (error) {
    showMessage('Error exporting data: ' + error.message, 'error');
  }
};

onMounted(() => {
  loadStatus();
});
</script>
