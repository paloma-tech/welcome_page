// This script is meant to be run in the browser console to test token storage

// Function to check token storage
function checkTokenStorage() {
  const palomaToken = localStorage.getItem('paloma_auth_token');
  const legacyToken = localStorage.getItem('token');
  
  console.log('Token Storage Check:');
  console.log(`- paloma_auth_token: ${palomaToken ? 'Present' : 'Not found'}`);
  console.log(`- token: ${legacyToken ? 'Present' : 'Not found'}`);
  
  if (palomaToken) {
    console.log(`- paloma_auth_token value: ${palomaToken.substring(0, 10)}...`);
  }
  
  if (legacyToken) {
    console.log(`- token value: ${legacyToken.substring(0, 10)}...`);
  }
  
  if (palomaToken && legacyToken) {
    console.log(`- Tokens match: ${palomaToken === legacyToken ? 'Yes' : 'No'}`);
  }
  
  return {
    palomaToken,
    legacyToken,
    match: palomaToken && legacyToken ? palomaToken === legacyToken : null
  };
}

// Function to fix token storage
function fixTokenStorage() {
  const palomaToken = localStorage.getItem('paloma_auth_token');
  const legacyToken = localStorage.getItem('token');
  
  if (palomaToken && !legacyToken) {
    console.log('Copying paloma_auth_token to token');
    localStorage.setItem('token', palomaToken);
    return true;
  }
  
  if (!palomaToken && legacyToken) {
    console.log('Copying token to paloma_auth_token');
    localStorage.setItem('paloma_auth_token', legacyToken);
    return true;
  }
  
  if (palomaToken && legacyToken && palomaToken !== legacyToken) {
    console.log('Tokens do not match. Using paloma_auth_token as the source of truth');
    localStorage.setItem('token', palomaToken);
    return true;
  }
  
  console.log('No fixes needed');
  return false;
}

// Check token storage
const initialCheck = checkTokenStorage();

// Fix token storage if needed
const fixed = fixTokenStorage();

// Check token storage again if fixed
if (fixed) {
  console.log('\nAfter fixing:');
  checkTokenStorage();
}

// Instructions for use
console.log('\nTo use this script:');
console.log('1. Open your browser console on the dashboard page');
console.log('2. Copy and paste this entire script');
console.log('3. Press Enter to run it');
console.log('4. Refresh the page to see if the dashboard loads correctly');
