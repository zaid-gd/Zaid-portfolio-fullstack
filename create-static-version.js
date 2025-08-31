#!/usr/bin/env node

/**
 * Creates a clean static version for GitHub Pages
 * This extracts only the frontend and prepares it for static hosting
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Creating Static Version for GitHub Pages...\n');

// Create static version directory
const staticDir = path.join(__dirname, 'portfolio-static');
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir);
}

// Copy frontend files
const copyFrontendFiles = () => {
  const frontendSrc = path.join(__dirname, 'frontend');
  const staticSrc = path.join(staticDir, 'src');
  
  // Create src directory structure
  if (!fs.existsSync(staticSrc)) {
    fs.mkdirSync(staticSrc, { recursive: true });
  }
  
  // Copy essential files
  const filesToCopy = [
    'package.json',
    'public',
    'src',
    'craco.config.js',
    'tailwind.config.js'
  ];
  
  filesToCopy.forEach(file => {
    const srcPath = path.join(frontendSrc, file);
    const destPath = path.join(staticDir, file);
    
    if (fs.existsSync(srcPath)) {
      copyRecursive(srcPath, destPath);
      console.log(`✅ Copied ${file}`);
    }
  });
};

// Recursive copy function
const copyRecursive = (src, dest) => {
  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    fs.readdirSync(src).forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

// Update package.json for GitHub Pages
const updatePackageJson = () => {
  const packageJsonPath = path.join(staticDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Update for GitHub Pages
  packageJson.name = 'zaid-portfolio-static';
  packageJson.homepage = 'https://USERNAME.github.io/REPOSITORY_NAME'; // User needs to update
  packageJson.scripts = {
    ...packageJson.scripts,
    predeploy: 'npm run build',
    deploy: 'gh-pages -d build'
  };
  
  // Add gh-pages dependency
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    'gh-pages': '^6.1.0'
  };
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Updated package.json for GitHub Pages');
};

// Replace Contact component with static version
const updateContactComponent = () => {
  const portfolioPath = path.join(staticDir, 'src', 'components', 'Portfolio.jsx');
  
  if (fs.existsSync(portfolioPath)) {
    let content = fs.readFileSync(portfolioPath, 'utf8');
    
    // Replace Contact import and usage
    content = content.replace(
      "import Contact from './sections/Contact';",
      "import ContactStatic from './sections/ContactStatic';"
    );
    
    content = content.replace(
      '<Contact />',
      '<ContactStatic />'
    );
    
    fs.writeFileSync(portfolioPath, content);
    console.log('✅ Updated Portfolio.jsx to use static contact form');
  }
};

// Create README for static version
const createReadme = () => {
  const readmeContent = `# Zaid Ali Ansari - Portfolio

## 🚀 Live Demo
[View Portfolio](https://USERNAME.github.io/REPOSITORY_NAME)

## 📱 Features
- Retro-futuristic dark design
- Interactive project showcases
- Responsive mobile design
- Typing animation effects
- Contact form integration
- Social media links

## 🛠️ Built With
- React 19
- Tailwind CSS
- Shadcn/ui Components
- Lucide React Icons

## 📞 Contact
- **Email:** zaid.ansari5127@gmail.com
- **Phone:** +91 9867251592
- **Location:** Mumbai, Maharashtra, India

## 🔗 Social Links
- [LinkedIn](https://www.linkedin.com/in/zaid-ali-ansari-47885b381/)
- [GitHub](https://github.com/zaid-gd)
- [YouTube](https://www.youtube.com/@GachaScreen)
- [Instagram](https://www.instagram.com/screen_5127/)

## 🚀 Deployment
This is the static version optimized for GitHub Pages.

### Local Development
\`\`\`bash
npm install
npm start
\`\`\`

### Deploy to GitHub Pages
\`\`\`bash
npm run deploy
\`\`\`

## 📝 Note
This is the static version of my portfolio. For the full-stack version with backend API, check out the [complete repository](https://github.com/YOUR_USERNAME/portfolio-fullstack).
`;

  fs.writeFileSync(path.join(staticDir, 'README.md'), readmeContent);
  console.log('✅ Created README.md');
};

// Create deployment instructions
const createDeployInstructions = () => {
  const instructions = `# GitHub Pages Deployment Instructions

## Quick Setup

1. **Update package.json homepage:**
   Replace \`USERNAME\` and \`REPOSITORY_NAME\` with your GitHub username and repository name:
   \`\`\`json
   "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME"
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Deploy:**
   \`\`\`bash
   npm run deploy
   \`\`\`

## Manual Deployment Alternative
1. Run \`npm run build\`
2. Copy \`build/\` folder contents to your GitHub repository
3. Enable GitHub Pages in repository settings

## Your portfolio will be live at:
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME

## 🔄 Updating Your Portfolio
1. Make changes to your code
2. Run \`npm run deploy\`
3. Changes will be live in 2-3 minutes
`;

  fs.writeFileSync(path.join(staticDir, 'DEPLOY_INSTRUCTIONS.md'), instructions);
  console.log('✅ Created deployment instructions');
};

// Run all steps
try {
  copyFrontendFiles();
  updatePackageJson();
  updateContactComponent();
  createReadme();
  createDeployInstructions();
  
  console.log('\n🎉 Static version created successfully!');
  console.log('\n📁 Files created in: ./portfolio-static/');
  console.log('\n📋 Next steps:');
  console.log('1. Create GitHub repository for static version');
  console.log('2. Copy portfolio-static/ contents to the repository');
  console.log('3. Update homepage URL in package.json');
  console.log('4. Run: npm install && npm run deploy');
  console.log('\n🌟 You\'ll have both versions:');
  console.log('   • Full-stack: Complete development showcase');  
  console.log('   • Static: Free GitHub Pages hosting');
  
} catch (error) {
  console.error('❌ Error creating static version:', error.message);
}