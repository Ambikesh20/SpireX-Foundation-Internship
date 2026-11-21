// DOM concept: Changing HTML/CSS using JavaScript on click
function toggleProfileInfo(buttonElement) {
    const infoDiv = buttonElement.nextElementSibling;
    
    if (infoDiv.style.display === "block") {
        infoDiv.style.display = "none";
        buttonElement.textContent = "View Profile";
    } else {
        infoDiv.style.display = "block";
        buttonElement.textContent = "Hide Profile";
    }
}