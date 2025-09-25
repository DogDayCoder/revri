import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "68d507f7da80b7ca5e5761c6", 
  requiresAuth: true // Ensure authentication is required for all operations
});
