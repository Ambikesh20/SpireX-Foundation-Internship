// 1. Array of image objects (URL + Caption)
const images = [
  {
    src: "https://picsum.photos/id/1018/800/500",
    caption: "Misty mountain peaks at sunrise"
  },
  {
    src: "https://picsum.photos/id/1015/800/500",
    caption: "Calm river flowing through a green valley"
  },
  {
    src: "https://picsum.photos/id/1039/800/500",
    caption: "Lush green forest waterfall"
  },
  {
    src: "https://picsum.photos/id/1043/800/500",
    caption: "Golden autumn trees along a quiet lake"
  }
];

// 2. State variables
let currentIndex = 0;
let slideInterval = null;
let isPlaying = false;

// 3. DOM Elements
const galleryImage = document.getElementById("gallery-image");
const imageCounter = document.getElementById("image-counter");
const imageCaption = document.getElementById("image-caption");
const dotsContainer = document.getElementById("dots-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const playPauseBtn = document.getElementById("play-pause-btn");

// 4. Create Navigation Dots dynamically
function createDots() {
  images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateGallery();
    });

    dotsContainer.appendChild(dot);
  });
}

// 5. Update Image, Counter, Caption, and Active Dot
function updateGallery() {
  const currentItem = images[currentIndex];
  
  galleryImage.src = currentItem.src;
  galleryImage.alt = currentItem.caption;
  imageCaption.textContent = currentItem.caption;
  imageCounter.textContent = `Image ${currentIndex + 1} of ${images.length}`;

  // Update active state on dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// 6. Next and Previous Functions (with looping)
function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateGallery();
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateGallery();
}

// 7. Play / Pause Slideshow Toggle
function toggleSlideshow() {
  if (isPlaying) {
    clearInterval(slideInterval);
    playPauseBtn.textContent = "Play Slideshow";
    isPlaying = false;
  } else {
    slideInterval = setInterval(showNextImage, 3000); // Changes every 3 seconds
    playPauseBtn.textContent = "Pause Slideshow";
    isPlaying = true;
  }
}

// 8. Event Listeners
nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPrevImage);
playPauseBtn.addEventListener("click", toggleSlideshow);

// 9. Initialize Gallery on Page Load
createDots();
updateGallery();