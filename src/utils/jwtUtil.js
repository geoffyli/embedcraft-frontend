import jwt_decode from 'jwt-decode';

function isTokenExpired(token) {
  const decoded = jwt_decode(token);
  const exp = decoded.exp;
  if (exp < new Date().getTime() / 1000)
    return true;
  else
    return false;
}

export { isTokenExpired };