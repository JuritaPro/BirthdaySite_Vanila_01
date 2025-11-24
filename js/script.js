// ============================================
// BIRTHDAY SITE - COMPLETE JAVASCRIPT
// All functionality with detailed comments
// ============================================

// ===== PHOTO DATA STRUCTURE =====
// You'll populate this with your actual photos
// Each photo should be in images/family/ or images/work/
const photoData = [
    // FAMILY PHOTOS (100 photos)
    { id: 1, src: 'images/family/family-1.jpg', category: 'family', description: 'Family gathering 2020' },
    { id: 2, src: 'images/family/family-2.jpg', category: 'family', description: 'Summer vacation' },
    { id: 3, src: 'images/family/family-3.jpg', category: 'family', description: 'Christmas celebration' },
    // ... Add all 100 family photos here
    
    // WORK PHOTOS (100 photos)
    { id: 101, src: 'images/work/work-1.jpg', category: 'work', description: 'Office team 1985' },
    { id: 102, src: 'images/work/work-2.jpg', category: 'work', description: 'Conference presentation' },
    { id: 103, src: 'images/work/work-3.jpg', category: 'work', description: 'Retirement party' },
    // ... Add all 100 work photos here
];

// ===== GLOBAL VARIABLES =====
let currentPhotoIndex = 0;
let filteredPhotos = [...photoData];
let photosPerPage = 12;
let currentPage = 1;
let slideshowInterval = null;

// ===== DOM ELEMENTS =====
const galleryGrid = document.getElementById('galleryGrid');
const fullscreenViewer = document.getElementById('fullscreenViewer');
const fullscreenImage = document.getElementById('fullscreenImage');
const photoDescription = document.getElementById('photoDescription');
const showAllBtn = document.getElementById('showAll');
const showFamilyBtn = document.getElementById('showFamily');
const showWorkBtn = document.getElementById('showWork');
const startSlideshowBtn = document.getElementById('startSlideshow');
const loadMoreBtn = document.getElementById('loadMore');
const closeViewerBtn = document.getElementById('closeViewer');
const prevPhotoBtn = document.getElementById('prevPhoto');
const nextPhotoBtn = document.getElementById('nextPhoto');
const downloadPhotoBtn = document.getElementById('downloadPhoto');
const messageForm = document.getElementById('messageForm');
const messagesDisplay = document.getElementById('messagesDisplay');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Birthday page loaded!');
    
    // Load initial photos
    renderGallery();
    
    // Load saved messages
    loadMessages();
    
    // Set up event listeners
    setupEventListeners();
    
    // Display page URL for QR code
    document.getElementById('pageUrl').textContent = window.location.href;
    
    // Add smooth scroll for navigation
    setupSmoothScroll();
});

// ===== SETUP EVENT LISTENERS =====
function setupEventListeners() {
    // Gallery filters
    showAllBtn.addEventListener('click', () => filterGallery('all'));
    showFamilyBtn.addEventListener('click', () => filterGallery('family'));
    showWorkBtn.addEventListener('click', () => filterGallery('work'));
    
    // Slideshow
    startSlideshowBtn.addEventListener('click', startSlideshow);
    
    // Load more
    loadMoreBtn.addEventListener('click', loadMorePhotos);
    
    // Fullscreen viewer
    closeViewerBtn.addEventListener('click', closeFullscreen);
    prevPhotoBtn.addEventListener('click', showPreviousPhoto);
    nextPhotoBtn.addEventListener('click', showNextPhoto);
    downloadPhotoBtn.addEventListener('click', downloadCurrentPhoto);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    // Message form
    messageForm.addEventListener('submit', handleMessageSubmit);
    
    // Music toggle
    musicToggle.addEventListener('click', toggleMusic);
}

// ===== GALLERY FUNCTIONS =====
function renderGallery() {
    const photosToShow = filteredPhotos.slice(0, currentPage * photosPerPage);
    galleryGrid.innerHTML = '';
    
    photosToShow.forEach((photo, index) => {
        const galleryItem = createGalleryItem(photo, index);
        galleryGrid.appendChild(galleryItem);
    });
    
    // Show/hide load more button
    if (photosToShow.length >= filteredPhotos.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
    
    // Add lazy loading to images
    lazyLoadImages();
}

function createGalleryItem(photo, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-index', index);
    
    item.innerHTML = `
        <img 
            data-src="${photo.src}" 
            alt="${photo.description}"
            class="lazy"
        >
        <div class="gallery-item-overlay">
            <div class="gallery-item-title">${photo.description}</div>
        </div>
    `;
    
    item.addEventListener('click', () => openFullscreen(index));
    
    return item;
}

function filterGallery(category) {
    // Update button states
    document.querySelectorAll('.control-buttons .btn').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
    });
    
    if (category === 'all') {
        filteredPhotos = [...photoData];
        showAllBtn.classList.add('btn-primary');
        showAllBtn.classList.remove('btn-secondary');
    } else if (category === 'family') {
        filteredPhotos = photoData.filter(p => p.category === 'family');
        showFamilyBtn.classList.add('btn-primary');
        showFamilyBtn.classList.remove('btn-secondary');
    } else if (category === 'work') {
        filteredPhotos = photoData.filter(p => p.category === 'work');
        showWorkBtn.classList.add('btn-primary');
        showWorkBtn.classList.remove('btn-secondary');
    }
    
    // Reset to page 1
    currentPage = 1;
    renderGallery();
}

function loadMorePhotos() {
    currentPage++;
    renderGallery();
}

// ===== LAZY LOADING =====
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== FULLSCREEN VIEWER =====
function openFullscreen(index) {
    currentPhotoIndex = index;
    const photo = filteredPhotos[currentPhotoIndex];
    
    fullscreenImage.src = photo.src;
    fullscreenImage.alt = photo.description;
    photoDescription.textContent = photo.description;
    
    fullscreenViewer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Stop slideshow if running
    if (slideshowInterval) {
        stopSlideshow();
    }
}

function closeFullscreen() {
    fullscreenViewer.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % filteredPhotos.length;
    updateFullscreenPhoto();
}

function showPreviousPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    updateFullscreenPhoto();
}

function updateFullscreenPhoto() {
    const photo = filteredPhotos[currentPhotoIndex];
    fullscreenImage.src = photo.src;
    fullscreenImage.alt = photo.description;
    photoDescription.textContent = photo.description;
}

function downloadCurrentPhoto() {
    const photo = filteredPhotos[currentPhotoIndex];
    const link = document.createElement('a');
    link.href = photo.src;
    link.download = `jurim-90-${photo.id}.jpg`;
    link.click();
}

function handleKeyPress(event) {
    if (!fullscreenViewer.classList.contains('active')) return;
    
    switch(event.key) {
        case 'Escape':
            closeFullscreen();
            break;
        case 'ArrowLeft':
            showPreviousPhoto();
            break;
        case 'ArrowRight':
            showNextPhoto();
            break;
    }
}

// ===== SLIDESHOW FUNCTIONS =====
function startSlideshow() {
    if (slideshowInterval) {
        stopSlideshow();
        startSlideshowBtn.innerHTML = '<i class="fas fa-play"></i> Start Slideshow';
        return;
    }
    
    // Start at first photo
    openFullscreen(0);
    
    // Auto-advance every 5 seconds
    slideshowInterval = setInterval(() => {
        showNextPhoto();
    }, 5000);
    
    startSlideshowBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Slideshow';
}

function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        startSlideshowBtn.innerHTML = '<i class="fas fa-play"></i> Start Slideshow';
    }
}

// ===== GUEST MESSAGES =====
function handleMessageSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('guestName').value.trim();
    const message = document.getElementById('guestMessage').value.trim();
    
    if (!name || !message) {
        alert('Lūdzu uzraksti gan savu vārdu, gan ziņu pirms nosūtīt!');
        return;
    }
    
    const messageData = {
        id: Date.now(),
        name: name,
        message: message,
        date: new Date().toLocaleDateString()
    };
    
    // Save to localStorage
    saveMessage(messageData);
    
    // Clear form
    messageForm.reset();
    
    // Reload messages
    loadMessages();
    
    // Show success
    alert(`Paldies, ${name}! Jūsu ziņa ir saglabāta! ❤️`);
}

function saveMessage(messageData) {
    let messages = JSON.parse(localStorage.getItem('birthdayMessages') || '[]');
    messages.unshift(messageData); // Add to beginning
    localStorage.setItem('birthdayMessages', JSON.stringify(messages));
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('birthdayMessages') || '[]');
    messagesDisplay.innerHTML = '';
    
    if (messages.length === 0) {
        messagesDisplay.innerHTML = '<p style="text-align: center; color: var(--sepia-medium);">Uzraksti ziņu pirmais! <i class="fas fa-heart"></i></p>';
        return;
    }
    
    messages.forEach(msg => {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.innerHTML = `
            <div class="message-author">${escapeHtml(msg.name)}</div>
            <div class="message-text">${escapeHtml(msg.message)}</div>
            <div class="message-date">${msg.date}</div>
        `;
        messagesDisplay.appendChild(messageCard);
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== MUSIC FUNCTIONS =====
function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.classList.add('playing');
    } else {
        backgroundMusic.pause();
        musicToggle.classList.remove('playing');
    }
}

// ===== SMOOTH SCROLL =====
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== HELPER FUNCTION: Generate photo data array =====
// Use this to quickly generate the photoData array
// Run this in browser console and copy the output
function generatePhotoArray() {
    let output = 'const photoData = [\n';
    
    // Generate family photos
    for (let i = 1; i <= 100; i++) {
        output += `    { id: ${i}, src: 'images/family/family-${i}.jpg', category: 'family', description: 'Family photo ${i}' },\n`;
    }
    
    // Generate work photos
    for (let i = 1; i <= 100; i++) {
        output += `    { id: ${100 + i}, src: 'images/work/work-${i}.jpg', category: 'work', description: 'Work photo ${i}' },\n`;
    }
    
    output += '];\n';
    console.log(output);
}

// Uncomment to generate the array
// generatePhotoArray();

console.log('✅ JavaScript loaded successfully!');
console.log('📸 Total photos:', photoData.length);
