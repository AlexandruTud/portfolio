//functie pentru a arata navbar-ul pe telefon si care elimina | si link-urile de la social media
const navMenu = document.getElementById("navmenu");
const navToggle = document.querySelector(".navbar-toggler");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

navToggle.addEventListener("click", function() {
  navMenu.classList.toggle("show");
});
navLinks.forEach(link => {
  link.addEventListener("click", function() {
    navMenu.classList.toggle("show");
  });
});





// folosim localStorage sa stocam aprecierile utilizatorului la proiecte
const modal = document.getElementById("custom-modal");
const span = document.getElementsByClassName("close")[0];
const modalMessage = document.getElementById("modal-message");

function addProjectToLocalStorage(projectID, event) {
  const favoriteProjects = JSON.parse(localStorage.getItem('favoriteProjects')) || [];
  const projectIndex = favoriteProjects.indexOf(projectID);
  
  if (projectIndex === -1) {
    favoriteProjects.push(projectID);
    localStorage.setItem('favoriteProjects', JSON.stringify(favoriteProjects));
    modalMessage.innerHTML = "Project added to favorites!";
  } else {
    modalMessage.innerHTML = "This project is already in your favorites!";
  }
  
  const clicks = parseInt(localStorage.getItem(`${projectID}-clicks`)) || 1;
  modalMessage.innerHTML += `<br>You gave this project ${clicks} hearts.`;
  localStorage.setItem(`${projectID}-clicks`, clicks + 1);

  const count = parseInt(getCookie("clickCount")) || 0;
  modalMessage.innerHTML += `<br>Button 'View all projects' clicked ${count} times.`;
  
  
  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  event.preventDefault();
}

function updateClickCountDisplay() {
  const count = parseInt(getCookie("clickCount")) || 0;
  const countDisplay = document.getElementById("click-count-value");
  if (countDisplay) {
    countDisplay.textContent = count.toString();
  }
}

updateClickCountDisplay();


document.addEventListener('DOMContentLoaded', function() {
    const favoriteProjects = JSON.parse(localStorage.getItem('favoriteProjects')) || [];
    
    const projectCards = document.querySelectorAll('.card');
    projectCards.forEach(function(card) {
      if (favoriteProjects.indexOf(card.id) !== -1) {
        card.classList.add('favorite');
      }
    });
  });


// dam display la elementele din json
fetch('portfolio.json')
  .then(response => response.json())
  .then(data => {
    const skillsList = document.createElement('ul');
    data.skills.forEach(skill => {
      const skillItem = document.createElement('li');
      skillItem.textContent = skill;
      skillsList.appendChild(skillItem);
    });
    document.getElementById('skills').appendChild(skillsList);

    const educationList = document.createElement('ul');
    data.education.forEach(edu => {
      const eduItem = document.createElement('li');
      eduItem.textContent = `${edu.years} - ${edu.degree} , ${edu.school}`;
      educationList.appendChild(eduItem);
    });
    document.getElementById('education').appendChild(educationList);

    const awardsList = document.createElement('ul');
    data.awards_and_certifications.forEach(award => {
      const awardItem = document.createElement('li');
      awardItem.textContent = `${award.title} - ${award.organization}, ${award.year}`;
      awardsList.appendChild(awardItem);
    });
    document.getElementById('awards').appendChild(awardsList);
  });

// folosim sessionStorage ca sa pastram ce scrie user-ul la contact
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

nameInput.addEventListener('input', () => {
    sessionStorage.setItem('name', nameInput.value);
});

emailInput.addEventListener('input', () => {
    sessionStorage.setItem('email', emailInput.value);
});

subjectInput.addEventListener('input', () => {
    sessionStorage.setItem('subject', subjectInput.value);
});

messageInput.addEventListener('input', () => {
    sessionStorage.setItem('message', messageInput.value);
});

window.addEventListener('load', () => {
    nameInput.value = sessionStorage.getItem('name') || '';
    emailInput.value = sessionStorage.getItem('email') || '';
    subjectInput.value = sessionStorage.getItem('subject') || '';
    messageInput.value = sessionStorage.getItem('message') || '';
});


// dam display la XML
function loadMeetings() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var xmlDoc = this.responseXML;
			var meetings = xmlDoc.getElementsByTagName("meeting");
			var ul = document.createElement("ul");
			for (var i = 0; i < meetings.length; i++) {
				var meeting = meetings[i];
				var name = meeting.getElementsByTagName("name")[0].textContent;
				var date = meeting.getElementsByTagName("date")[0].textContent;
				var li = document.createElement("li");
				li.innerText = name + " - " + date;
				ul.appendChild(li);
			}
			document.getElementById("meetingList").appendChild(ul);
		}
	};
	xhttp.open("GET", "portfolio.xml", true);
	xhttp.send();
}

window.addEventListener("load", loadMeetings);


// setam cookies sa vedem de cate ori a fost apasat butonul "View all projects" 
var acceptedCookies = getCookie("accepted-cookies");
function handleClick() {
  if (acceptedCookies == "true") {
    var count = parseInt(getCookie("clickCount")) || 0;
    count++;
    setCookie("clickCount", count, 365);
    updateClickCountDisplay();
  }
  window.location.href = "https://github.com/AlexandruTud";
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


// implementam HTTP cookies
if (acceptedCookies == "true") {
} else {
  $("#cookie-banner").show();
}

$("#accept-cookies").click(function() {
  setCookie("accepted-cookies", "true", 365);
  $("#cookie-banner").hide();
});

$("#reject-cookies").click(function() {
  setCookie("accepted-cookies", "false", 365);
  $("#cookie-banner").hide();
});

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}