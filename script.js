gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray('img');
const loader = document.querySelector('.loader--text');

// Function to update the loading progress
const updateProgress = (instance) => {
  loader.textContent = `${Math.round(instance.progressedCount * 100 / images.length)}%`;
};

// Function to hide the loader and start the animations
const showDemo = () => {
  document.body.style.overflow = 'auto';
  document.scrollingElement.scrollTo(0, 0);
  gsap.to(document.querySelector('.loader'), { autoAlpha: 0 });

  gsap.utils.toArray('section').forEach((section, index) => {
    const w = section.querySelector('.wrapper');
    const [x, xEnd] = index % 2 ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
    gsap.fromTo(w, { x }, {
      x: xEnd,
      scrollTrigger: {
        trigger: section,
        scrub: 0.5
      }
    });
  });
};

// Initialize imagesLoaded and bind the events
imagesLoaded(images, { background: true }, function() {
  // All images are loaded; now you can start your animations
  showDemo();
}).on('progress', updateProgress);
