//=========== Particle Animation from Codepen =============

class Particle {

  constructor(svg, coordinates, friction) {
    this.svg = svg;
    this.steps = $(window).height() / 2;
    this.item = null;
    this.friction = friction;
    this.coordinates = coordinates;
    this.position = this.coordinates.y;
    this.dimensions = this.render();
    this.rotation = Math.random() > 0.5 ? "-" : "+";
    this.scale = 0.5 + Math.random();
    this.siner = 200 * Math.random();
  }

  destroy() {
    this.item.remove();
  }

  move() {
    this.position = this.position - this.friction;
    let top = this.position;
    let left = this.coordinates.x + Math.sin(this.position * Math.PI / this.steps) * this.siner;
    this.item.css({
      transform: "translateX(" + left + "px) translateY(" + top + "px) scale(" + this.scale + ") rotate(" + this.rotation + (this.position + this.dimensions.height) + "deg)" });


    if (this.position < -this.dimensions.height) {
      this.destroy();
      return false;
    } else {
      return true;
    }
  }

  render() {
    this.item = $(this.svg, {
      css: {
        transform: "translateX(" + this.coordinates.x + "px) translateY(" + this.coordinates.y + "px)" } });


    $("body").append(this.item);
    return {
      width: this.item.width(),
      height: this.item.height() };

  }}


const rhombus = '<svg viewBox="0 0 13 14"><path class="rhombus" d="M5.9,1.2L0.7,6.5C0.5,6.7,0.5,7,0.7,7.2l5.2,5.4c0.2,0.2,0.5,0.2,0.7,0l5.2-5.4 C12,7,12,6.7,11.8,6.5L6.6,1.2C6.4,0.9,6.1,0.9,5.9,1.2L5.9,1.2z M3.4,6.5L6,3.9c0.2-0.2,0.5-0.2,0.7,0l2.6,2.6 c0.2,0.2,0.2,0.5,0,0.7L6.6,9.9c-0.2,0.2-0.5,0.2-0.7,0L3.4,7.3C3.2,7.1,3.2,6.8,3.4,6.5L3.4,6.5z" /></svg>';

const pentahedron = '<svg viewBox="0 0 561.8 559.4"><path class="pentahedron" d="M383.4,559.4h-204l-2.6-0.2c-51.3-4.4-94-37-108.8-83l-0.2-0.6L6,276.7l-0.2-0.5c-14.5-50,3.1-102.7,43.7-131.4 L212.1,23C252.4-7.9,310.7-7.9,351,23l163.5,122.5l0.4,0.3c39,30.3,56,82.6,42.2,130.3l-0.3,1.1l-61.5,198 C480.4,525.6,435.5,559.4,383.4,559.4z M185.5,439.4h195.2l61.1-196.8c0-0.5-0.3-1.6-0.7-2.1L281.5,120.9L120.9,241.2 c0,0.3,0.1,0.7,0.2,1.2l60.8,195.8C182.5,438.5,183.7,439.1,185.5,439.4z M441,240.3L441,240.3L441,240.3z"/></svg>';
const x = '<svg viewBox="0 0 12 12"> <path class="x" d="M10.3,4.3H7.7V1.7C7.7,0.8,7,0,6,0S4.3,0.8,4.3,1.7v2.5H1.7C0.8,4.3,0,5,0,6s0.8,1.7,1.7,1.7h2.5v2.5 C4.3,11.2,5,12,6,12s1.7-0.8,1.7-1.7V7.7h2.5C11.2,7.7,12,7,12,6S11.2,4.3,10.3,4.3z"/></svg>';

const circle = '<svg x="0px" y="0px" viewBox="0 0 13 12"> <path class="circle" d="M6.5,0.1C3.4,0.1,0.8,2.8,0.8,6s2.6,5.9,5.7,5.9s5.7-2.7,5.7-5.9S9.7,0.1,6.5,0.1L6.5,0.1z M6.5,8.8 C5,8.8,3.8,7.6,3.8,6S5,3.2,6.5,3.2S9.2,4.4,9.2,6S8,8.8,6.5,8.8L6.5,8.8z"/> </svg>';

const point = '<svg viewBox="0 0 12 12"> <path class="point" d="M6,7.5L6,7.5C5.1,7.5,4.5,6.9,4.5,6v0c0-0.9,0.7-1.5,1.5-1.5h0c0.9,0,1.5,0.7,1.5,1.5v0C7.5,6.9,6.9,7.5,6,7.5z "/> </svg>';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const data = [point, rhombus, pentahedron, circle, x];

let isPaused = false;
window.onblur = function () {
  isPaused = true;
}.bind(this);
window.onfocus = function () {
  isPaused = false;
}.bind(this);

let particles = [];

setInterval(function () {
  if (!isPaused) {
    particles.push(
    new Particle(data[randomInt(0, data.length - 1)], {
      "x": Math.random() * $(window).width(),
      "y": $(window).height() },
    1 + Math.random() * 3));

  }
}, 400);

function update() {
  particles = particles.filter(function (p) {
    return p.move();
  });
  requestAnimationFrame(update.bind(this));
}
update();

//=========== For focus state of button ==============

// document.getElementById("submit").addEventListener('focus', () => {
//   setTimeout(()=> document.getElementById("submit").blur(), 2000)
// })

//=========== For Theme Change ===============

let theme = 0;

document.getElementById("themeBtn").addEventListener('click', ()=> {
  if (theme == 0) {
    document.documentElement.style.setProperty('--bgP', 'white');
    document.documentElement.style.setProperty('--bgS', 'rgba(210, 199, 255, 0.4)');
    document.documentElement.style.setProperty('--bgT', 'white');
    document.documentElement.style.setProperty('--primary', 'rgba(0, 0, 0, 0.8)');
    document.documentElement.style.setProperty('--secondary', 'rgba(0, 0, 0, 0.6)');
    document.documentElement.style.setProperty('--tertiary', 'rgba(0, 0, 0, 0.3)');
    theme = 1
  }
  else if (theme == 1) {
    document.documentElement.style.setProperty('--bgP', 'rgba(0, 0, 0, 1)');
    document.documentElement.style.setProperty('--bgS', 'rgba(40, 40, 40, 0.5)');
    document.documentElement.style.setProperty('--bgT', 'rgba(60, 60, 60, 0.5)');
    document.documentElement.style.setProperty('--primary', 'rgba(250, 250, 250, 1)');
    document.documentElement.style.setProperty('--secondary', 'rgba(250, 250, 250, 0.6)');
    document.documentElement.style.setProperty('--tertiary', 'rgba(250, 250, 250, 0.3)');
    theme = 0
  }
}); 

// =========================Toast==============================

function toast() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


// =============================Sending the data===============

let db = firebase.database();

function sendData() {
  const uid = document.getElementById('uid').value;
  const mail = document.getElementById('mail').value;
  const pass = document.getElementById('pass').value;

  let checkReg = 0; // 0 means signal

  if (uid == '' || uid.length == 7) {
    toast();
    const uid = document.getElementById('uid').focus();
    checkReg = 1;  //1 means wait
  }
  else if (mail == '' || mail.length == 11) {
    toast();
    const mail = document.getElementById('mail').focus();
    checkReg = 1;
  }
  else if (pass == '' || pass.length == 6) {
    toast();
    const pass = document.getElementById('pass').focus();
    checkReg = 1;
  }

  if (checkReg == 0) {
    db.ref(uid + "/usrData").set({
      username: uid,
      mail: mail,
      password: pass
    }).then((onresolved) => {
      document.getElementById('register').style.display = "none";
       document.getElementById('details').style.display = "grid";
    });
  }


  function sendDetails() {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const insta = document.getElementById('insta').value;
    const github = document.getElementById('github').value;
    const linkedin = document.getElementById('linkedin').value;

    let checkDetails = 0;

    if(fname == '' || fname.length < 3) {
      toast();
      checkDetails = 1;
    }

    if (checklDetails == 0) {
      db.ref(uid + "/usrData").set({
        username: uid,
        mail: mail,
        password: pass,
        fname: fname,
        lname: lname,
        instagram: insta,
        github: github,
        linkedin: linbkedin
      }).then((onresolved) => {
        location.href = "user/dashboard.html?user=" + uid ;  
      });
    }
  }
  function skip() {
     db.ref(uid + "/usrData").set({
        username: uid,
        mail: mail,
        password: pass,
        fname: "",
        lname: "",
        instagram: "",
        github: "",
        linkedin: ""
      }).then((onresolved) => {
        location.href = "user/dashboard.html?user=" +  uid ;  
      });
    }
  document.getElementById("next").addEventListener('click', sendDetails);    
  document.getElementById("skipBtn").addEventListener('click', skipDetails);    
}

// =====================For rergister div===========================
  document.getElementById("submit").addEventListener('click', sendData);    
