document.addEventListener("DOMContentLoaded", () => {
  const toggleTitle = document.getElementById("title");
  const toggleIcon = document.getElementById("icon");
  const responseElement = document.getElementById("response");
  const copyButton = document.getElementById("copy");
  const modeToggle = document.getElementById("mode-toggle");
  const toggleText = document.getElementById("toggle-text");
  const body = document.body;

  // Default mode: Rejecting
  let currentMode = "rejecting";

  let responses = {}; // Placeholder for the loaded JSON data

  // Function to generate random responses
  function generateResponse(responsesList) {
    const randomIndex = Math.floor(Math.random() * responsesList.length);
    responseElement.textContent = responsesList[randomIndex];
    copyButton.style.display = "inline-block";
  }

  // Toggle between rejecting and accepting modes
  modeToggle.addEventListener("change", () => {
    if (modeToggle.checked) {
      currentMode = "accepting";
      responseElement.textContent = "";
      toggleIcon.innerHTML = "<i class='fa-solid fa-check'></i>";
      toggleTitle.textContent = "Accepting Mode";
      toggleText.textContent = "Accepting";
      body.style.setProperty("--response-bg", "#0b9d28");
      body.style.setProperty("--button-bg", "#4caf50");
    } else {
      currentMode = "rejecting";
      responseElement.textContent = "";
      toggleIcon.innerHTML = "<i class='fa-regular fa-circle-xmark'></i>";
      toggleTitle.textContent = "Rejecting Mode";
      toggleText.textContent = "Rejecting";
      body.style.setProperty("--response-bg", "#9d0b28");
      body.style.setProperty("--button-bg", "#ff004d");
    }
  });

  // Load the responses from the JSON file
  fetch("responses.json")
    .then((response) => response.json())
    .then((data) => {
      responses = data;

      // Add event listeners for response generation buttons
      ["professional", "humorous", "empathetic", "blunt"].forEach(
        (category) => {
          document.getElementById(category).addEventListener("click", () => {
            generateResponse(responses[currentMode][category]);
          });
        }
      );
    })
    .catch((err) => console.error("Failed to load JSON file: ", err));

  // Copy to clipboard functionality
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(responseElement.textContent).then(() => {
      alert("Copied to clipboard!");
    });
  });
});
