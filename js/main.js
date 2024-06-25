document.addEventListener("DOMContentLoaded", () => {
  var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChangeTransitionEnd: function () {
        if (swiper.activeIndex === 0) {
          focusFirstImage();
        }
      },
    },
  });

  const images = document.querySelectorAll(".image-list-container .list-image");
  const cutoutCharacters = document.querySelectorAll(".cutout-character");

  hideAllCharacters();

  if (swiper.activeIndex === 0) {
    focusFirstImage();
  }

  function focusFirstImage() {
    const firstImage = document.querySelector(
      ".swiper-slide-active .image-list-container .list-image"
    );
    if (firstImage) {
      firstImage.setAttribute("tabindex", "0");
      firstImage.focus();
      showCorrespondingCharacter(firstImage);
    }
  }

  function showCorrespondingCharacter(image) {
    const index = Array.from(images).indexOf(image);
    cutoutCharacters.forEach((character, idx) => {
      character.style.display = idx === index ? "block" : "none";
    });
  }

  function hideAllCharacters() {
    cutoutCharacters.forEach((character) => {
      character.style.display = "none";
    });
  }

  images.forEach((image) => {
    image.setAttribute("tabindex", "0");
    image.addEventListener("click", () => {
      images.forEach((otherImage) => {
        if (otherImage !== image && otherImage === document.activeElement) {
          otherImage.blur();
        }
      });

      image.focus();
      autoFocused = false;
      showCorrespondingCharacter(image);
    });

    image.addEventListener("mouseenter", () => {
      images.forEach((otherImage) => {
        if (otherImage !== image && otherImage === document.activeElement) {
          otherImage.blur();
        }
      });

      image.focus();
      autoFocused = false;
      showCorrespondingCharacter(image);
    });

    image.addEventListener("mouseleave", () => {});
  });
});

const timelineSlide1 = gsap.timeline();

timelineSlide1.fromTo(
  ".cutout-character",
  { x: -20, y: -20 },
  { x: 20, y: 20, ease: "power1.out", duration: 4, repeat: -1, yoyo: true }
);
