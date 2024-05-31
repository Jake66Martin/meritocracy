// Importing the necessary functions and plugins
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Exporting the Vite configuration
// https://vitejs.dev/config/
export default defineConfig({
// Including the React plugin to enable React support in Vite
  plugins: [react()],
  // Configuring the development server
  server: {
// Setting the port for the dev server to 3000   
    port: 3000,
// Automatically open the browser when the server starts
    open: true,
// Setting up a proxy to redirect API calls
    proxy: {
// Proxy configuration for GraphQL API calls
      "/graphql": {
// The target server for the GraphQL API        
        target: "http://localhost:3001",
// Disabling SSL verification (useful for self-signed certificates)        
        secure: false,
// Enabling cross-origin requests        
        changeOrigin: true
      }
    }
  }
})
