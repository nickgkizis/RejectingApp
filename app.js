document.addEventListener("DOMContentLoaded", () => {
  const responseElement = document.getElementById("response");
  const copyButton = document.getElementById("copy");

  // Function to generate random responses
  function generateResponse(responses) {
    const randomIndex = Math.floor(Math.random() * responses.length);
    const randomResponse = responses[randomIndex];
    responseElement.textContent = randomResponse;

    // Show the Copy button once a response is generated
    copyButton.style.display = "inline-block";
  }

  // Fetch the responses from the JSON file
  fetch("responses.json")
    .then((response) => response.json())
    .then((data) => {
      // Add event listeners for buttons after JSON data is loaded
      document.getElementById("professional").addEventListener("click", () => {
        generateResponse(data.professional);
      });

      document.getElementById("humorous").addEventListener("click", () => {
        generateResponse(data.humorous);
      });

      document.getElementById("empathetic").addEventListener("click", () => {
        generateResponse(data.empathetic);
      });

      document.getElementById("blunt").addEventListener("click", () => {
        generateResponse(data.blunt);
      });
    })
    .catch((err) => console.error("Failed to load JSON: ", err));

  // Copy to clipboard functionality
  copyButton.addEventListener("click", () => {
    const responseText = responseElement.textContent;

    // Copy the text to the clipboard
    navigator.clipboard
      .writeText(responseText)
      .then(() => {
        alert("Copied to clipboard! \n\n Please hire me already :'(");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  });
});
