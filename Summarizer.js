async function summarizeText() {
    const text = document.getElementById('inputText').value;
    const summaryLength = document.getElementById('summaryLength').value;

    // If text is empty, don't make the API request
    if (!text.trim()) {
        document.getElementById('summary').innerText = "Please provide some text to summarize.";
        return;
    }

    const options = {
        method: 'POST',
        url: 'https://api.apyhub.com/ai/summarize-text',
        headers: {
            'apy-token': 'APY0NbbMISBaWr5Pc2IXHN2ssk1gkoKPCpdy2nl9ed6lro2zlkM3NHzSLqoXH95gFp9VUQmA',
            'Content-Type': 'application/json'
        },
        data: {
            text: text,
            length: summaryLength // Send 'short', 'medium', or 'long'
        }
    };

    try {
        // Making the API call
        const response = await axios.request(options);
        console.log(response)
        
        // Check if the response contains a summary
        if (response.data) {
            // Show the summary in the #summary element
            document.getElementById('summary').innerText = response.data.data.summary;
        } else {
            document.getElementById('summary').innerText = "summary will be returned .";
        }
    } catch (error) {
        console.error("Error fetching summary:", error);
        document.getElementById('summary').innerText = "Error fetching summary. Please try again.";
    }
}
