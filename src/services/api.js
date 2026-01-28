// Centralized API service for the chat application

const API_BASE_URL = 'https://chatapp-production-f3ef.up.railway.app/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth token
  getAuthToken() {
    return localStorage.getItem('chatAppToken');
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      headers,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response statuses
      if (!response.ok) {
        const errorData = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          // Try to parse error response as JSON
          const parsedError = JSON.parse(errorData);
          errorMessage = parsedError.message || errorMessage;
        } catch {
          // If not JSON, use the raw text
          errorMessage = errorData || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      // Handle different content types
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Authentication methods
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User methods
  async getUsers() {
    return this.request('/users');
  }

  async getUserProfile() {
    return this.request('/users/profile');
  }

  async getUserById(userId) {
    return this.request(`/users/${userId}`);
  }

  // Chat methods
  async getChats() {
    return this.request('/chats');
  }

  async getChatById(chatId) {
    return this.request(`/chats/${chatId}`);
  }

  // Message methods
  async getMessages(chatId) {
    return this.request(`/messages/${chatId}`);
  }

  async getChatMessages(chatId, page = 0, size = 50) {
    const params = new URLSearchParams({ page, size });
    return this.request(`/messages/chat/${chatId}?${params}`);
  }

  async getAllChatMessages(chatId) {
    return this.request(`/messages/chat/${chatId}/all`);
  }

  async sendMessage(messageData) {
    return this.request('/messages/send', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  async updateMessageStatus(messageId, status) {
    return this.request(`/messages/${messageId}/status?status=${status}`, {
      method: 'PUT',
    });
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService;