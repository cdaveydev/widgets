# Deployment Guide

## Publishing to GitHub

1. Initialize Git repository (already done):
   ```bash
   git init
   ```

2. Add all files to Git (already done):
   ```bash
   git add .
   ```

3. Commit changes (already done):
   ```bash
   git commit -m "Initial commit: Dashboard widgets with simulated data"
   ```

4. Create a new GitHub repository:
   - Go to https://github.com/new
   - Name your repository (e.g., "dashboard-widgets")
   - Choose visibility (public or private)
   - Click "Create repository"

5. Add remote repository (replace 'yourusername' with your GitHub username):
   ```bash
   git remote add origin https://github.com/yourusername/dashboard-widgets.git
   ```

6. Push to GitHub:
   ```bash
   git push -u origin main
   ```

## Deploying to Vercel

### Option 1: Using Vercel Dashboard

1. Sign up or log in to Vercel (https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel should automatically detect the project settings
5. Click "Deploy"
6. Your app will be available at `https://dashboard-widgets.vercel.app` (or similar)

### Option 2: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy from your project directory:
   ```bash
   vercel
   ```

3. Follow the prompts to connect to your account and configure your deployment
4. For subsequent deployments, you can use:
   ```bash
   vercel --prod
   ```

## Updating Your Deployment

Whenever you make changes to your project:

1. Commit the changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

2. Push to GitHub:
   ```bash
   git push
   ```

3. If you've set up GitHub integration on Vercel, your app will automatically redeploy
4. Otherwise, manually deploy again:
   ```bash
   vercel --prod
   ``` 