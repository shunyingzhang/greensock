document.addEventListener("DOMContentLoaded", () => {
  let autoFocused = true;

  // Initialize Swiper instance
  var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChangeTransitionEnd: function () {
        if (swiper.activeIndex === 1 && autoFocused) {
          const firstImage = document.querySelector(
            ".swiper-slide-active .image-list-container .list-image"
          );
          if (firstImage) {
            firstImage.setAttribute("tabindex", "0");
            firstImage.focus();
            autoFocused = true;
          }
        }
      },
    },
  });

  const images = document.querySelectorAll(".image-list-container .list-image");
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
    });

    image.addEventListener("mouseenter", () => {
      images.forEach((otherImage) => {
        if (otherImage !== image && otherImage === document.activeElement) {
          otherImage.blur();
        }
      });

      image.focus();
      autoFocused = false;
    });

    image.addEventListener("mouseleave", () => {});
  });
});

const timelineExample = gsap.timeline({ duration: 1, repeat: 3 });

timelineExample
  .from(".slide-1", {
    backgroundColor: "#fff",
    ease: "none",
  })
  .fromTo(
    [".slide-1 h1", ".intro"],
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, stagger: 0.2, ease: "power1.out" }
  )
  .from([".slide-1 img", ".slide-1 h2"], { opacity: 0, ease: "none" })
  .fromTo(
    "ul li",
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, stagger: 0.2, ease: "power1.out" }
  );

const timelineSlide1 = gsap.timeline();

timelineSlide1.fromTo(
  ".cutout-character",
  { x: -20, y: -20 },
  { x: 20, y: 20, ease: "power1.out", duration: 4, repeat: -1, yoyo: true }
);
