// Test WebSocket connection
import webSocketService from './websocket';

export const testWebSocketConnection = () => {
  const token = localStorage.getItem('chatAppToken');
  
  if (!token) {
    console.log('No auth token found. Please login first.');
    return;
  }

  console.log('Testing WebSocket connection...');
  
  webSocketService.connect(
    token,
    (frame) => {
      console.log('✅ WebSocket connected successfully!', frame);
      
      // Test subscription
      const testSubscription = webSocketService.subscribe('/topic/test', (message) => {
        console.log('📬 Received test message:', message);
      });
      
      if (testSubscription) {
        console.log('✅ Subscribed to test topic');
      }
      
      // Test sending a message
      setTimeout(() => {
        const success = webSocketService.sendMessage('/app/test', { 
          content: 'Test message from client' 
        });
        console.log('📤 Test message send result:', success ? 'SUCCESS' : 'FAILED');
      }, 2000);
      
    },
    (error) => {
      console.error('❌ WebSocket connection failed:', error);
    }
  );
};

// Export for use in console or components
window.testWebSocket = testWebSocketConnection;