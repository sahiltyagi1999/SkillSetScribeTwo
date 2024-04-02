
    var type = new Typed(".auto", {
        strings: ['Full Stack Developer' , 'Coder' , 'Student'],
        loop: true,
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1000
    }) 

    // Menu Icon button for responsive

    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.nav-bar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
};


// Top button JS




// Progress Line Js redial style

let teamWorkRedial = document.querySelector(".teamwork-redial"),
teamWorkProgressValue = document.querySelector(".teamwork");

    let teamStartValue = 0,
        teamEndValue = 80,
        teamSpeed = 25;
    let teamProgress = setInterval(() => {
        
        teamStartValue++;

        teamWorkProgressValue.textContent = `${teamStartValue}%`

        teamWorkRedial.style.background = `conic-gradient(var(--main-color) ${teamStartValue * 3.6}deg,#ffffff4c 0deg)`

        if(teamStartValue == teamEndValue){
            clearInterval(teamProgress);
        }

} , teamSpeed);


let creativityRedial = document.querySelector(".creativity-redial"),
creativityProgressValue = document.querySelector(".creativity");

    let creativityStartValue = 0,
        creativityEndValue = 90,
        creativitySpeed = 25;
let creativityProgress = setInterval(() => {
        
        creativityStartValue++;

        creativityProgressValue.textContent = `${creativityStartValue}%`

        creativityRedial.style.background = `conic-gradient(var(--main-color) ${creativityStartValue * 3.6}deg,#ffffff4c 0deg)`

        if(creativityStartValue == creativityEndValue){
            clearInterval(creativityProgress);
        }

} , creativitySpeed);


let problemRedial = document.querySelector(".problem-redial"),
problemProgressValue = document.querySelector(".problem");

    let problemStartValue = 0,
        problemEndValue = 90,
        problemSpeed = 25;
let problemProgress = setInterval(() => {
        
        problemStartValue++;

        problemProgressValue.textContent = `${problemStartValue}%`

        problemRedial.style.background = `conic-gradient(var(--main-color) ${problemStartValue * 3.6}deg,#ffffff4c 0deg)`

        if(problemStartValue == problemEndValue){
            clearInterval(problemProgress);
        }

} , problemSpeed);

let communicationRedial = document.querySelector(".communication-redial"),
communicationProgressValue = document.querySelector(".communication");

    let communicationStartValue = 0,
        communicationEndValue = 80,
        communicationSpeed = 25;
let communicationProgress = setInterval(() => {
        
        communicationStartValue++;

        communicationProgressValue.textContent = `${communicationStartValue}%`

        communicationRedial.style.background = `conic-gradient(var(--main-color) ${communicationStartValue * 3.6}deg,#ffffff4c 0deg)`

        if(communicationStartValue == communicationEndValue){
            clearInterval(communicationProgress);
        }

} , communicationSpeed);


// Read More button JS
let noOfChar = 150;
let contents = document.querySelectorAll('.about-content p');

contents.forEach(cont => {
    if(cont.textContent.length < noOfChar){
        contents.nextElementSibling.style.display = "none";
    }
    else{
        let displayText = cont.textContent.slice(0,noOfChar);
        let moreText = cont.textContent.slice(noOfChar);
        cont.innerHTML = `${displayText}<span class ="dots" > ... </span><span class = "hide more" > ${moreText}</span>`
    }
});

function readMore(btn){
    let post = btn.parentElement;
    post.querySelector(".dots").classList.toggle("hide");
    post.querySelector(".more").classList.toggle("hide");
}

// NavBar Links 
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');


window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id +']').classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');
    let topBtn = document.getElementById('progress');
    header.classList.toggle('sticky', window.scrollY > 100);
    if(window.scrollY > 100){
        topBtn.style.display = 'grid';
    }
    else{
        topBtn.style.display = 'none';
    }
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Dark mode Button
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener('click' , () => {
    document.body.classList.toggle('day-theme');

    themeBtn.querySelector('span:first-child').classList.toggle('active');
    themeBtn.querySelector('span:last-child').classList.toggle('active');
})
// Scroll Reveal

ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin:'top'});
ScrollReveal().reveal('.home-image, .services-container, .portfolio-box , .contact form ', { origin:'bottom'});
ScrollReveal().reveal(' .home-content h1, .about-img, .skill-bar, .whatsaap', { origin:'left'});
ScrollReveal().reveal('.social-media, .home-content p, .about-content, .container, .mail, .progress', { origin:'right'});
