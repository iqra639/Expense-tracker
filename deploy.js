const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Generate a unique project name based on timestamp
const timestamp = new Date().getTime().toString().slice(-6);
const frontendProjectName = `iqra-expense-tracker-${timestamp}`;
const backendProjectName = `iqra-expense-tracker-api-${timestamp}`;

console.log(`\n=== Deploying Expense Tracker Application ===\n`);

// Update frontend vercel.json with the new project name
console.log(`Updating frontend project name to: ${frontendProjectName}`);
const frontendVercelPath = path.join(__dirname, 'vercel.json');
const frontendVercelConfig = JSON.parse(fs.readFileSync(frontendVercelPath, 'utf8'));
frontendVercelConfig.name = frontendProjectName;
fs.writeFileSync(frontendVercelPath, JSON.stringify(frontendVercelConfig, null, 2));

// Update backend vercel.json with the new project name
console.log(`Updating backend project name to: ${backendProjectName}`);
const backendVercelPath = path.join(__dirname, 'backend', 'vercel.json');
const backendVercelConfig = JSON.parse(fs.readFileSync(backendVercelPath, 'utf8'));
backendVercelConfig.name = backendProjectName;
fs.writeFileSync(backendVercelPath, JSON.stringify(backendVercelConfig, null, 2));

// Deploy backend first
console.log(`\n=== Deploying Backend API ===\n`);
try {
  console.log('Building and deploying backend...');
  execSync('cd backend && vercel --prod --confirm', { stdio: 'inherit' });
  console.log('\n✅ Backend deployment successful!');
} catch (error) {
  console.error('\n❌ Backend deployment failed:', error.message);
  process.exit(1);
}

// Get the backend URL
console.log('\nGetting backend deployment URL...');
const backendUrl = `https://${backendProjectName}.vercel.app/api`;
console.log(`Backend API URL: ${backendUrl}`);

// Update frontend environment variable
console.log('\nUpdating frontend environment variable...');
fs.writeFileSync(path.join(__dirname, '.env'), `VITE_API_URL=${backendUrl}`);

// Build the frontend
console.log('\nBuilding frontend...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Frontend build successful!');
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}

// Deploy frontend
console.log(`\n=== Deploying Frontend ===\n`);
try {
  console.log('Deploying frontend...');
  execSync('vercel --prod --confirm', { stdio: 'inherit' });
  console.log('\n✅ Frontend deployment successful!');
} catch (error) {
  console.error('\n❌ Frontend deployment failed:', error.message);
  process.exit(1);
}

console.log(`\n=== Deployment Complete ===\n`);
console.log(`Backend API: ${backendUrl}`);
console.log(`Frontend: https://${frontendProjectName}.vercel.app`);
console.log('\nThank you for using the Expense Tracker deployment script!');
