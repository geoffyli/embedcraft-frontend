// CORS Domain
const corsDomain = 'http://localhost:5173'; 

// Define the base API URL.
const baseUrl = 'http://localhost:9093';

// Define individual API endpoints.
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;
const logoutUrl = `${baseUrl}/logout`;

const uploadUrl = `${baseUrl}/model/upload`
const trainUrl = `${baseUrl}/model/train`;
const statusUrl = `${baseUrl}/model/status`;



// Export the URLs.
export {
  baseUrl,
  loginUrl,
  signupUrl,
  logoutUrl,
  uploadUrl,
  trainUrl,
  statusUrl
};