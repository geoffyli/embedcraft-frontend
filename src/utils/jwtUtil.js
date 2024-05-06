import jwt_decode from 'jwt-decode';

/**
 * Check if a JWT token is expired.
 * 
 * @param {string} token - The JWT token to be checked.
 * @returns {boolean} - True if the token is expired, false otherwise.
 */
function isTokenExpired(token) {
  // Decode the token to extract its expiration time (exp)
  const decoded = jwt_decode(token);
  const exp = decoded.exp;

  // Compare expiration time with the current time in seconds
  return exp < new Date().getTime() / 1000;
}

export { isTokenExpired };
