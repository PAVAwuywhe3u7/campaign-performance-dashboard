@echo off
echo 📸 Adding Screenshots to GitHub Repository
echo.

echo Step 1: Adding screenshots to git...
git add screenshots/
git add SCREENSHOTS_GUIDE.md
git add README.md

echo.
echo Step 2: Committing changes...
git commit -m "Add project screenshots and documentation

- Added comprehensive screenshots guide
- Included dashboard overview and feature screenshots  
- Added mobile responsive design examples
- Updated documentation with visual examples
- Enhanced repository presentation"

echo.
echo Step 3: Pushing to GitHub...
git push origin main

echo.
echo ✅ Screenshots successfully added to GitHub!
echo 🌐 Check your repository: https://github.com/PAVAwuywhe3u7/campaign-performance-dashboard
echo.
pause
