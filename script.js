
$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');
        console.log("OK");
    } else {
        $('.nav').removeClass('affix');
    }
});

$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});


// carousel

let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
const totalSlides = slides.length;

// Function to show slide
function showSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    // Move the slides
    document.querySelector(".carousel-inner").style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}

// Next slide function
function nextSlide() {
    showSlide(currentIndex + 1);
}

// Previous slide function
function prevSlide() {
    showSlide(currentIndex - 1);
}

// Go to specific slide
function currentSlide(index) {
    showSlide(index);
}

// Auto slide every 3 seconds
setInterval(() => {
    nextSlide();
}, 3000);



// card-carousel


// let index = 0;
// const cardsPerPage = 4;
// const carousel = document.getElementById("carousel");

// function nextCards() {
//   const totalPages = Math.ceil(carousel.children.length / cardsPerPage);
//   if (index < totalPages - 1) {
//     index++;
//     updateCarousel();
//   }
// }

// function prevCards() {
//   if (index > 0) {
//     index--;
//     updateCarousel();
//   }
// }

// function updateCarousel() {
//   // Get one card's effective width (width + left/right margins)
//   const card = document.querySelector('.card');
//   const cardStyle = window.getComputedStyle(card);
//   const effectiveCardWidth = card.offsetWidth +
//     parseInt(cardStyle.marginLeft) +
//     parseInt(cardStyle.marginRight);
  
//   // Move the carousel by the width of (cardsPerPage) cards per page
//   carousel.style.transform = `translateX(-${index * cardsPerPage * effectiveCardWidth}px)`;

//   // Show/hide navigation buttons
//   const totalPages = Math.ceil(carousel.children.length / cardsPerPage);
//   document.getElementById("prevButton").style.display = index > 0 ? "inline-block" : "none";
//   document.getElementById("nextButton").style.display = index < totalPages - 1 ? "inline-block" : "none";
// }

// let currentIndexs = 0;
// const cardWidth = document.querySelector(".product-card").offsetWidth + 10; // Width + margin
// const totalCards = document.querySelectorAll(".product-card").length;
// const container = document.querySelector(".product-container");

// function moveSlider(direction) {
//     const maxIndex = totalCards - 4;
//     if (direction === 1 && currentIndexs < maxIndex) {
//         currentIndexs++;
//     } else if (direction === -1 && currentIndexs > 0) {
//         currentIndexs--;
//     }
//     container.style.transform = `translateX(-${currentIndexs * cardWidth}px)`;
// }

let index = 0;
const container = document.querySelector('.product-container');

function moveSlider(direction) {
    const cardWidth = document.querySelector('.product-card').offsetWidth + 15;
    index += direction;

    // Prevent overflow
    if (index < 0) index = 0;
    if (index > container.children.length - 1) index = container.children.length - 1;

    container.style.transform = `translateX(-${index * cardWidth}px)`;
}


// VIdeo Section

document.addEventListener("DOMContentLoaded", function () {
    // Get all videos
    const videos = document.querySelectorAll('.gift-video');
    
    // Set up event listeners for each video
    videos.forEach(video => {
        // Get the parent container
        const container = video.closest('.media-container');
        
        // Add hover events to container
        container.addEventListener("mouseenter", function() {
            video.play();
        });
        
        container.addEventListener("mouseleave", function() {
            video.pause();
            video.currentTime = 0; // Reset video
        });
        
        // For mobile: make videos work on touch
        video.addEventListener("touchstart", function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    });

    // For mobile devices, start videos when they're visible
    if (window.matchMedia("(max-width: 768px)").matches) {
        videos.forEach(video => {
            video.play();
        });
    }
});


// Image Section

let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item-image-section')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
// document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)


// Hompeage
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiParticles = [];

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.speedY = Math.random() * 3 + 2;
        this.angle = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5;
    }

    update() {
        this.y += this.speedY;
        this.angle += this.rotationSpeed;
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initConfetti() {
    for (let i = 0; i < 30; i++) {
        confettiParticles.push(new Confetti());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateConfetti);
}

initConfetti();
animateConfetti();


// Scroll JS Code Section

document.addEventListener('DOMContentLoaded', function () {
    // Get all scroll arrows
    const scrollArrows = document.querySelectorAll('.scroll-arrow');

    // Add click event to each arrow
    scrollArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', function () {
            // Get the next section
            const nextSection = document.getElementById(`item-list-container`);

            // If next section exists, scroll to it with animation
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });

                // Add animation effect
                nextSection.style.opacity = 0;
                nextSection.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    nextSection.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    nextSection.style.opacity = 1;
                    nextSection.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    });
});



document.querySelectorAll('.image-container img').forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = img.getAttribute('data-hover');

    if (hoverSrc) {
        img.addEventListener('mouseenter', () => {
            img.src = hoverSrc;
        });
        img.addEventListener('mouseleave', () => {
            img.src = originalSrc;
        });
    }
});

