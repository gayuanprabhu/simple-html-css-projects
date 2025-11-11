async function analyzePlant(imageFile) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Analyzing... Please wait.";

  try {
    const base64Image = await readFileAsBase64(imageFile);

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: "Analyze this plant image. Is it healthy or unhealthy? If unhealthy, detect the disease and suggest pest control solutions." },
            { inline_data: { mime_type: "image/jpeg", data: base64Image } },
          ],
        },
      ],
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Full API response:", JSON.stringify(data, null, 2));

    if (data.error) {
      resultElement.textContent = `API Error: ${data.error.message || JSON.stringify(data.error)}`;
      return;
    }

    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        resultElement.textContent = candidate.content.parts[0].text;
      } else {
        resultElement.textContent = "No text content found in API response.";
      }
    } else {
      resultElement.textContent = "No candidates found in API response.";
    }
  } catch (error) {
    console.error("Error:", error);
    resultElement.textContent = "Failed to analyze image.";
  }
}
