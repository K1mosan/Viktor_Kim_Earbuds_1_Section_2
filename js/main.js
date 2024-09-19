(() => {

                              //Ar model
  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const infoBoxes = [
    {
      title: 'Charging Sensor',
      text: 'Earbud charging sensors offer seamless and hassle-free power management. When placed in their charging case, these sensors automatically initiate recharging, ensuring your earbuds are ready to go when you are. It is a convenient and intelligent feature for uninterrupted listening pleasure.',
    },
    {
      title: 'Touch Button',
      text: 'Earbud touch buttons provide effortless control at your fingertips. With a simple tap, users can adjust volume, change tracks, answer calls, and activate voice assistants, all without reaching for their device. These intuitive controls enhance the user experience, making on-the-go audio management a breeze.',
    },
    {
      title: 'Microphone',
      text: 'Earbud microphones offer clear and convenient audio input for hands-free communication. Designed for optimal voice capture, these tiny but powerful mics ensure crisp calls and accurate voice commands, making them an essential feature for modern on-the-go audio devices.',
    },
    {
      title: 'Silicone Ear Plug',
      text: 'Silicone earplugs for earbuds provide superior comfort and noise isolation. Their soft, flexible design molds to your ear, offering a secure fit and enhanced sound quality. Perfect for extended listening sessions, they reduce external distractions for an immersive audio experience.',
    },
  ]

  //functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfo() {

    //Roughed in code not functional

      infoBoxes.forEach((infoBox, index) => {
      
      let selected = document.querySelector(`#hotspot-${index+1}`);

      const titleElement = document.createElement('h2');
      titleElement.textContent = infoBox.title;

      const textElement = document.createElement('p');
      textElement.textContent = infoBox.text;

      // const imgElement = document.createElement('img');
      // imgElement.src = infoBox.image;
      
      // selected.appendChild(imgElement);
      selected.appendChild(titleElement);
      selected.appendChild(textElement);
    });
  }
  loadInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });


                         //Jpg Sequence Animation
const canvas = document.querySelector("#explode-view");
const context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 390; //how many still frames do we have

const images = [] //array to hold all of our images

//lets create an object called bugs to hold the current frame
const buds = {
  frame: 0
};

//lets run a for loop to populate our images array
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  //Since the image number is an integer, we’ll need to turn it in to a string and use
  img.src = `images/earbuds_animation${(i+1).toString().padStart(3, '0')}.jpg`;
  images.push(img);
}

//console.table(images);

//images go from 0-449

//we are not actually animating a DOM element, but rather an object, which contains
//a frame count, as the user scrolls we increase the value by one
//we tell green sock there is a total number of 449 frames to cycle through so it knows when to stop
//The way that greenSock and scrolling works is through using decimals, so we have to use the built in snap feature
//and pass the frame property so that it snaps to a whole value, instead of 0.085 we get 1

gsap.to(buds, {
  frame: 389,
  snap: "frame",
  scrollTrigger: {
    trigger: "#explode-view",
    // scrub: true,
    pin: true,
    scrub: 1,
    start: "top top",
    // end: "+=100%",
    markers: false
  },
  onUpdate: render, //onUpdate part of GS
})
//console.log("frameCount:" + frameCount);

//when first image is loaded in array, call the render function, otherwise we have a blank canvas

images[0].addEventListener("onload", render);

function render() {
  // wipe the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  //draw a new frame, using canvas drawImage() method, position 0,0.
  console.log(buds.frame);
  console.log(images[buds.frame]);
  context.drawImage(images[buds.frame], 0, 0); 
}


                           //Xray Model Slider
let imageCon = document.querySelector('#imageCon'),
    drag = document.querySelector('.image-drag'),
    left = document.querySelector('.image-left'),
    dragging = false,
    min = 0,
    max = imageCon.offsetWidth;
  
  function onDown() {
    dragging = true; 
    console.log("on Down called");
  }

  function onUp() {
    dragging = false;
    console.log("on Up called");
  }

  function onMove(event) {
    if(dragging===true) {
      let x = event.clientX - imageCon.getBoundingClientRect().left;

        if(x < min) {
          x = min;
        } else if(x > max) {
          x = max-6;
        }

      drag.style.left = x + 'px';
      left.style.width = x + 'px';
    }
  }

  //event listeners
  drag.addEventListener('mousedown', onDown);
  document.body.addEventListener('mouseup', onUp);
  document.body.addEventListener('mousemove', onMove);


                          //Driven animations
gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    const navLinks = document.querySelectorAll("#main-header nav ul li a");

    function scrollLink(e) {    
            e.preventDefault(); 
            console.log(e.currentTarget.hash);
            let selectedLink = e.currentTarget.hash;
            gsap.to(window, {duration: 1, scrollTo:{y:`${selectedLink}`, offsetY:100 }});
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", scrollLink);
    });

    gsap.to("#box3", 3, 
		{scrollTrigger: {
			trigger: "#box3",
			toggleActions:"restart pause reverse none",
      markers: false,
      //start: "top center"
      start: "tob bottom",
      end: "center middle"
		}, 
		x:300, ease:Bounce.easeOut
		});

})();