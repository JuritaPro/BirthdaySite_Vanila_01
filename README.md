# BirthdaySite_Vanila_01
Birthday Celebration Web Page

ðŸŽ‰ Birthday Photo Gallery
A celebratory, mobile-friendly website to honor a birthday with a personal photo gallery and guest wishes boardâ€”built for family, friends, and guests to enjoy on any device.

ðŸ“¸ Features
Responsive Gallery: Displays 400 family + 200 work photos with thumbnails and gentle transitions.

Slideshow Mode: Automatic display for TVs during the partyâ€”photos advance every 5 seconds.

Mobile-first: Works perfectly on phones, tablets, laptops.

Full-Screen Viewer: Tap any image to view large and swipe through photos.

Manual Swipe Navigation: Intuitive for touch screens.

Image Descriptions: Every photo has a caption for context.

Fast Loading: Lazy loading, compressed images for smooth experience.

Biography & Timeline: Includes intro section and milestone highlights.

Guest Book: Visitors leave birthday wishesâ€”saved locally.

Download Option: Guests can save favorite photos.

Background Music: Optional ambient music toggle.

QR Code Section: Guests can easily access the page by scanning.

Warm Design: Sepia/gold tones, large fonts for easy reading.

ðŸ—ï¸ Installation & Setup
1. Prepare Your Photos
Optimize the images (200-400 KB) and rename photos as family-1.jpg, family-2.jpg, ..., work-1.jpg, work-2.jpg, etc.

2. File Structure
text
birthday/
â”œâ”€â”€ index.html
â”œâ”€â”€ css/
â”‚   â””â”€â”€ style.css
â”œâ”€â”€ js/
â”‚   â””â”€â”€ script.js
â”œâ”€â”€ images/
â”‚   â”œâ”€â”€ family/
â”‚   â””â”€â”€ work/
â””â”€â”€ audio/
    â””â”€â”€ background.mp3 (optional)
3. Add Your Content
Place optimized family photos in images/family/

Place work life photos in images/work/

Update the biography, timeline, and photo descriptions in index.html and js/script.js as desired.

ðŸš€ Deployment (Free Hosting)
GitHub Pages:

Sign up at GitHub

Create a public repository

Upload all files and folders (drag-and-drop via web interface is fine)

Go to repository Settings > Pages and set the source to main branch.

Wait 2-5 minutesâ€”your site will be live at https://YOUR-USERNAME.github.io/birthday/

Alternative Hosting: Netlify, Vercelâ€”see deployment-guide for details.

ðŸ“± Usage
View on Mobile: Open site URL or scan QR code.

TV Slideshow: Connect laptop via HDMI or use Chromecast. Click "Start Slideshow" for auto-play.

Guest Messages: Fill out the formâ€”messages are saved locally, perfect for party display.

Background Music: Tap the music icon to toggle on or off.

Share via QR: Print QR from sites like qrcode-monkey.com and place on tables.

ðŸ’¡ Optimization
Batch Compress: Scripts and instructions in image-optimization.md

Recommended settings: 1920x1080 resolution, 85% JPEG quality

Lazy Loading: Built-in for gallery imagesâ€”improves load times drastically

ðŸ› ï¸ Customization
Change colors, fonts, or design in css/style.css

Add more photosâ€”simply upload to the correct folder and update the photo list in js/script.js

Update descriptions: Edit the photoData array in script.js

ðŸ§© Troubleshooting
Images not loading? Check for correct file names and folder structure.

Page slow? Compress images further and reduce number displayed per page.

Messages not saving? Browser must allow localStorage; avoid Incognito mode.

Music silence? Must interact with page first (tap music toggle button).

ðŸ† Credits & Inspiration
Built by family for Juris' birthday â¤ï¸
Inspired by simple web solutions, GitHub Pages, and timeless family gatherings.

ðŸ“„ License
MIT License â€“ Free for personal and non-commercial celebratory use.

For complete instructions, customization tips, troubleshooting, and batch scripts, see:

deployment-guide.md

image-optimization.md

Happy birthday Juris! ðŸŽ‚ðŸŽ‰
