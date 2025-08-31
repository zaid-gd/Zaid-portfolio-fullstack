#!/usr/bin/env node

/**
 * Script to prepare portfolio for GitHub Pages deployment
 * This converts the full-stack version to a static-only version
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Portfolio for GitHub Pages Deployment...\n');

// Step 1: Update package.json for GitHub Pages
const updatePackageJson = () => {
  const packageJsonPath = path.join(__dirname, 'frontend', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Add homepage and deploy scripts
  packageJson.homepage = "https://yourusername.github.io/your-repo-name"; // User needs to update this
  packageJson.scripts = {
    ...packageJson.scripts,
    predeploy: "npm run build",
    deploy: "gh-pages -d build"
  };
  
  // Add gh-pages as dev dependency
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    "gh-pages": "^6.1.0"
  };
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Updated package.json with GitHub Pages configuration');
};

// Step 2: Create static version of Portfolio component
const createStaticPortfolio = () => {
  const staticPortfolioContent = `import React, { useState, useEffect } from 'react';
import { mockData } from '../mock';
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import ContactStatic from './sections/ContactStatic'; // Using static contact form
import Footer from './sections/Footer';
import ProjectModal from './modals/ProjectModal';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-cyan-400 text-lg font-mono">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Header />
      <Hero data={mockData.personal} />
      <About data={mockData.about} />
      <Skills data={mockData.skills} />
      <Experience data={mockData.experience} />
      <Projects 
        data={mockData.projects} 
        onProjectClick={setSelectedProject}
      />
      <ContactStatic />
      <Footer data={mockData.personal} />
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;`;

  const portfolioPath = path.join(__dirname, 'frontend', 'src', 'components', 'PortfolioStatic.jsx');
  fs.writeFileSync(portfolioPath, staticPortfolioContent);
  console.log('✅ Created static version of Portfolio component');
};

// Step 3: Create deployment instructions
const createDeploymentInstructions = () => {
  const instructions = `# GitHub Pages Deployment Instructions

## Prerequisites
1. Create a new GitHub repository for your portfolio
2. Make sure the repository is public (required for free GitHub Pages)

## Setup Steps

### 1. Update Configuration
Edit \`package.json\` and update the homepage URL:
\`\`\`json
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME"
\`\`\`

### 2. Install Dependencies
\`\`\`bash
cd frontend
npm install gh-pages --save-dev
\`\`\`

### 3. Build for Production
\`\`\`bash
npm run build
\`\`\`

### 4. Deploy to GitHub Pages
\`\`\`bash
npm run deploy
\`\`\`

## Alternative: Manual Deployment
1. Run \`npm run build\`
2. Copy contents of \`build/\` folder to your GitHub repository
3. Enable GitHub Pages in repository settings
4. Select source as main branch (root or docs folder)

## Important Notes
- GitHub Pages only hosts static files
- Contact form will open user's email client instead of sending via backend
- All other functionality (modals, navigation, animations) will work perfectly
- Your portfolio will be accessible at: https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME

## Updating Your Portfolio
1. Make changes to your code
2. Run \`npm run build\`
3. Run \`npm run deploy\`
4. Changes will be live in a few minutes

## Custom Domain (Optional)
1. Add a \`CNAME\` file to your repository with your domain name
2. Configure your domain's DNS to point to GitHub Pages
3. Enable HTTPS in repository settings

## Troubleshooting
- If build fails, check console for errors
- Make sure all imports are correct
- Verify all images are accessible
- Test locally with \`npm run build && serve -s build\`
`;

  fs.writeFileSync(path.join(__dirname, 'GITHUB_PAGES_DEPLOY.md'), instructions);
  console.log('✅ Created deployment instructions');
};

// Step 4: Create CNAME file template
const createCNAMETemplate = () => {
  const cnameContent = `# Uncomment and replace with your domain name for custom domain
# yourdomain.com`;
  
  fs.writeFileSync(path.join(__dirname, 'frontend', 'public', 'CNAME.template'), cnameContent);
  console.log('✅ Created CNAME template for custom domain');
};

// Run all steps
try {
  updatePackageJson();
  createStaticPortfolio();
  createDeploymentInstructions();
  createCNAMETemplate();
  
  console.log('\n🎉 Portfolio is ready for GitHub Pages deployment!');
  console.log('\nNext steps:');
  console.log('1. Update the homepage URL in package.json');
  console.log('2. Create a GitHub repository');
  console.log('3. Follow instructions in GITHUB_PAGES_DEPLOY.md');
  console.log('4. Run: cd frontend && npm run deploy');
  
} catch (error) {
  console.error('❌ Error preparing portfolio:', error.message);
  process.exit(1);
}`;