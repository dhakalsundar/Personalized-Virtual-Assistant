async function search() {
  const searchQuery = document.getElementById('searchInput').value;

  if (!searchQuery) {
    alert('Please enter a search query!');
    return;
  }

  // Show loading state
  document.getElementById('searchResults').innerHTML = "Searching...";

  let apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDkfklQhGVFwatmEl998p8FSQblU0PFwXA';
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: searchQuery
          }
        ]
      }
    ]
  };

  try {
    // Send search query to your backend API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    console.log(data)
      // Extract and display the response content
      const responseText = data.candidates[0].content.parts[0].text;
      console.log(responseText)

      document.getElementById('searchResults').innerHTML = `
        <h3>Search Result:</h3>
        <p>${responseText}</p>`
  } catch (error) {
    // Handle errors
    document.getElementById('searchResults').innerHTML = `Error: ${error.message}`;
  }
}

// Function to search on Google separately
function searchOnGoogle() {
  let query = document.getElementById('searchInput').value.trim();
  if (query.length > 0) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
  }
}

// Handle "Enter" key press
function handleSearch(event) {
  if (event.key === "Enter") {
    search();
  }
}
