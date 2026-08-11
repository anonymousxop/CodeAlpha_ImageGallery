/* =========================================
   NEON GALLERY — CODEALPHA
   Image Gallery JavaScript
========================================= */


/* =========================================
   IMAGE DATA
========================================= */

const images = [

    {
        id: 1,
        title: "Mountain Escape",
        category: "nature",
        image: "images/nature/mountain.jpg"
    },

    {
        id: 2,
        title: "Ocean Horizon",
        category: "nature",
        image: "images/nature/ocean.jpg"
    },

    {
        id: 3,
        title: "Forest Dreams",
        category: "nature",
        image: "images/nature/forest.jpg"
    },


    {
        id: 4,
        title: "Modern Architecture",
        category: "architecture",
        image: "images/architecture/modern.jpg"
    },

    {
        id: 5,
        title: "Urban Geometry",
        category: "architecture",
        image: "images/architecture/geometry.jpg"
    },

    {
        id: 6,
        title: "City Lights",
        category: "architecture",
        image: "images/architecture/city.jpg"
    },


    {
        id: 7,
        title: "Future Technology",
        category: "technology",
        image: "images/technology/future.jpg"
    },

    {
        id: 8,
        title: "Digital Workspace",
        category: "technology",
        image: "images/technology/workspace.jpg"
    },

    {
        id: 9,
        title: "Cyber Interface",
        category: "technology",
        image: "images/technology/cyber.jpg"
    },


    {
        id: 10,
        title: "Tropical Journey",
        category: "travel",
        image: "images/travel/tropical.jpg"
    },

    {
        id: 11,
        title: "Wanderlust",
        category: "travel",
        image: "images/travel/wanderlust.jpg"
    },

    {
        id: 12,
        title: "Golden Destination",
        category: "travel",
        image: "images/travel/destination.jpg"
    }

];


/* =========================================
   DOM ELEMENTS
========================================= */

const gallery = document.getElementById("gallery");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const imageTitle =
    document.getElementById("imageTitle");

const imageCategory =
    document.getElementById("imageCategory");

const imageCounter =
    document.getElementById("imageCounter");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");


/* =========================================
   STATE
========================================= */

let currentImages = [...images];

let currentIndex = 0;


/* =========================================
   DISPLAY GALLERY
========================================= */

function displayGallery(imageList) {

    gallery.innerHTML = "";

    imageList.forEach((item, index) => {

        const galleryItem =
            document.createElement("div");

        galleryItem.classList.add(
            "gallery-item"
        );

        galleryItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.title}"
                loading="lazy"
            >

            <div class="gallery-overlay">

                <div class="view-icon">
                    ⤢
                </div>

                <h3>
                    ${item.title}
                </h3>

                <span>
                    ${item.category}
                </span>

            </div>

        `;


        /* Open lightbox */

        galleryItem.addEventListener(
            "click",
            () => {

                openLightbox(index);

            }
        );


        gallery.appendChild(galleryItem);

    });

}


/* =========================================
   OPEN LIGHTBOX
========================================= */

function openLightbox(index) {

    currentIndex = index;

    const item =
        currentImages[currentIndex];


    lightboxImage.src =
        item.image;

    lightboxImage.alt =
        item.title;

    imageTitle.textContent =
        item.title;

    imageCategory.textContent =
        item.category;

    imageCounter.textContent =
        `${currentIndex + 1} / ${currentImages.length}`;


    lightbox.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {

    lightbox.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


/* =========================================
   NEXT IMAGE
========================================= */

function showNextImage() {

    currentIndex++;

    if (
        currentIndex >=
        currentImages.length
    ) {

        currentIndex = 0;

    }

    updateLightbox();

}


/* =========================================
   PREVIOUS IMAGE
========================================= */

function showPreviousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            currentImages.length - 1;

    }

    updateLightbox();

}


/* =========================================
   UPDATE LIGHTBOX
========================================= */

function updateLightbox() {

    const item =
        currentImages[currentIndex];


    lightboxImage.src =
        item.image;

    lightboxImage.alt =
        item.title;

    imageTitle.textContent =
        item.title;

    imageCategory.textContent =
        item.category;

    imageCounter.textContent =
        `${currentIndex + 1} / ${currentImages.length}`;

}


/* =========================================
   FILTER GALLERY
========================================= */

function filterGallery(category) {

    if (category === "all") {

        currentImages =
            [...images];

    }

    else {

        currentImages =
            images.filter(
                item =>
                    item.category === category
            );

    }


    displayGallery(
        currentImages
    );

}


/* =========================================
   FILTER BUTTON EVENTS
========================================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            const category =
                button.dataset.category;


            filterGallery(
                category
            );

        }
    );

});


/* =========================================
   LIGHTBOX BUTTONS
========================================= */

closeBtn.addEventListener(
    "click",
    closeLightbox
);

nextBtn.addEventListener(
    "click",
    showNextImage
);

prevBtn.addEventListener(
    "click",
    showPreviousImage
);


/* =========================================
   CLOSE ON BACKGROUND CLICK
========================================= */

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            lightbox
        ) {

            closeLightbox();

        }

    }
);


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowRight") {

            showNextImage();

        }


        if (event.key === "ArrowLeft") {

            showPreviousImage();

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

displayGallery(images);