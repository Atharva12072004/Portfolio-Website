# Welcome to Portfolio Website project

## Project info

**URL**: https://atharvaharane.netlify.app

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

🚀 Deployment Instructions
✅ Deploying to Netlify
Build the project:

bash
Copy
Edit
npm install
npm run build
Login to Netlify:

Go to https://netlify.com and log in/sign up.

Deploy manually:

Click "Add new site" → "Deploy manually".

Upload the contents of the dist/ folder (after running npm run build).

(Optional) Connect GitHub Repo:

In Netlify, choose "Import from Git", connect your GitHub repo, and set:

Build command: npm run build

Publish directory: dist

Simply open https://atharvaharane.netlify.app


