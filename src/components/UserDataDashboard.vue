<template>
  <div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-6">User Data Dashboard</h2>
    
    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-blue-800">Total Users</h3>
        <p class="text-3xl font-bold text-blue-600">{{ userData.totalUsers }}</p>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-green-800">Current Status</h3>
        <p class="text-lg font-bold text-green-600">
          {{ userData.isLoggedIn ? 'Logged In' : 'Not Logged In' }}
        </p>
      </div>
      
      <div class="bg-purple-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-purple-800">Current User</h3>
        <p class="text-sm font-medium text-purple-600">
          {{ userData.currentUserEmail || 'None' }}
        </p>
      </div>
    </div>

    <!-- All Users Table -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-3">All Registered Users</h3>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userData.allUsers" :key="user.email" class="hover:bg-gray-50">
              <td class="border border-gray-300 px-4 py-2">{{ user.name || 'N/A' }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ user.createdAt || 'Unknown' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Current Session Info -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-3">Current Session</h3>
      <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto">{{ JSON.stringify(userData.currentSession, null, 2) }}</pre>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-4">
      <button @click="exportData" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Export All Data
      </button>
      <button @click="refreshData" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Refresh Data
      </button>
      <button @click="clearData" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Clear All Data
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllUserData, exportUserData, clearAllUserData } from '../utils/userDataManager.js';

const userData = ref({});

const loadData = () => {
  userData.value = getAllUserData();
};

const refreshData = () => {
  loadData();
};

const exportData = () => {
  exportUserData();
};

const clearData = () => {
  if (confirm('Are you sure you want to clear all user data? This action cannot be undone.')) {
    clearAllUserData();
    loadData();
    alert('All user data has been cleared.');
  }
};

onMounted(() => {
  loadData();
});
</script>
