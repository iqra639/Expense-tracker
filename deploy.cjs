const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if Vercel CLI is installed
console.log('Checking if Vercel CLI is installed...');
try {
  const vercelCheck = spawnSync('vercel', ['--version'], { stdio: 'pipe' });
  if (vercelCheck.status === 0) {
    console.log(`✅ Vercel CLI is installed: ${vercelCheck.stdout.toString().trim()}`);
  } else {
    console.log('⚠️ Vercel CLI not found. Installing...');
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully');
  }
} catch (error) {
  console.log('⚠️ Vercel CLI not found. Installing...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully');
  } catch (installError) {
    console.error('❌ Failed to install Vercel CLI:', installError.message);
    console.error('Please install Vercel CLI manually: npm install -g vercel');
    process.exit(1);
  }
}

// Check if user is logged in to Vercel
console.log('Checking if you are logged in to Vercel...');
try {
  const loginCheck = spawnSync('vercel', ['whoami'], { stdio: 'pipe' });
  if (loginCheck.status === 0) {
    console.log(`✅ Logged in to Vercel as: ${loginCheck.stdout.toString().trim()}`);
  } else {
    console.log('⚠️ Not logged in to Vercel. Please log in...');
    execSync('vercel login', { stdio: 'inherit' });
    console.log('✅ Successfully logged in to Vercel');
  }
} catch (error) {
  console.log('⚠️ Not logged in to Vercel. Please log in...');
  try {
    execSync('vercel login', { stdio: 'inherit' });
    console.log('✅ Successfully logged in to Vercel');
  } catch (loginError) {
    console.error('❌ Failed to log in to Vercel:', loginError.message);
    console.error('Please log in manually: vercel login');
    process.exit(1);
  }
}

// Generate a unique project name based on timestamp and random string
const timestamp = new Date().getTime().toString().slice(-6);
const randomString = Math.random().toString(36).substring(2, 7);
const frontendProjectName = `iqra-expense-tracker-${timestamp}-${randomString}`;
const backendProjectName = `iqra-expense-tracker-api-${timestamp}-${randomString}`;

console.log(`\n=== Deploying Expense Tracker Application ===\n`);

// Update frontend vercel.json with the new project name
console.log(`Updating frontend project name to: ${frontendProjectName}`);
try {
  const frontendVercelPath = path.join(__dirname, 'vercel.json');
  const frontendVercelConfig = JSON.parse(fs.readFileSync(frontendVercelPath, 'utf8'));
  frontendVercelConfig.name = frontendProjectName;
  
  // Update the API URL to point to the new backend
  if (frontendVercelConfig.env && frontendVercelConfig.env.VITE_API_URL) {
    const newApiUrl = `https://${backendProjectName}.vercel.app/api`;
    console.log(`Updating API URL to: ${newApiUrl}`);
    frontendVercelConfig.env.VITE_API_URL = newApiUrl;
  }
  
  fs.writeFileSync(frontendVercelPath, JSON.stringify(frontendVercelConfig, null, 2));
  console.log('✅ Frontend vercel.json updated successfully');
} catch (error) {
  console.error('❌ Error updating frontend vercel.json:', error.message);
  process.exit(1);
}

// Update backend vercel.json with the new project name
console.log(`Updating backend project name to: ${backendProjectName}`);
try {
  const backendVercelPath = path.join(__dirname, 'backend', 'vercel.json');
  const backendVercelConfig = JSON.parse(fs.readFileSync(backendVercelPath, 'utf8'));
  backendVercelConfig.name = backendProjectName;
  
  // Update CORS settings to allow the new frontend
  if (backendVercelConfig.env && backendVercelConfig.env.ALLOW_ORIGIN) {
    const newAllowOrigin = `https://${frontendProjectName}.vercel.app`;
    console.log(`Updating CORS ALLOW_ORIGIN to: ${newAllowOrigin}`);
    backendVercelConfig.env.ALLOW_ORIGIN = newAllowOrigin;
  }
  
  fs.writeFileSync(backendVercelPath, JSON.stringify(backendVercelConfig, null, 2));
  console.log('✅ Backend vercel.json updated successfully');
} catch (error) {
  console.error('❌ Error updating backend vercel.json:', error.message);
  process.exit(1);
}

// Deploy backend first
console.log(`\n=== Deploying Backend API ===\n`);
try {
  console.log('Building and deploying backend...');
  execSync(`cd backend && vercel --name ${backendProjectName} --prod --confirm`, { stdio: 'inherit' });
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
  execSync(`vercel --name ${frontendProjectName} --prod --confirm`, { stdio: 'inherit' });
  console.log('\n✅ Frontend deployment successful!');
} catch (error) {
  console.error('\n❌ Frontend deployment failed:', error.message);
  process.exit(1);
}

console.log(`\n=== Deployment Complete ===\n`);
console.log(`Backend API: ${backendUrl}`);
console.log(`Frontend: https://${frontendProjectName}.vercel.app`);

console.log('\n=== Important Information ===');
console.log('1. Each deployment creates new projects with unique names to avoid the 10 project limit');
console.log('2. The frontend is automatically configured to connect to the new backend');
console.log('3. You can access your projects in the Vercel dashboard');
console.log('\nProject Names:');
console.log(`- Frontend: ${frontendProjectName}`);
console.log(`- Backend: ${backendProjectName}`);

console.log('\nThank you for using the Expense Tracker deployment script!');
