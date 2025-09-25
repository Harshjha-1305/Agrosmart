// API Configuration and Gemini API calls
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=';
const API_KEY = 'AIzaSyBpXFr0L1cStGeYtUOalz8NLa4ca0A1UAY'; // Replace with your actual API key

export const callGeminiAPI = async (prompt, imageBase64 = null, setAppIsOffline) => {
  if (!API_KEY) {
    console.warn('API key is missing. Using mock data.');
    setAppIsOffline(true);
    const { getMockData } = require('./mockData');
    return getMockData(prompt);
  }

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt },
        ]
      }
    ],
  };

  if (imageBase64) {
    payload.contents[0].parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64
      }
    });
  }

  try {
    const response = await fetch(`${API_URL}${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('API Error Response:', errorBody);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
      setAppIsOffline(false);
      return candidate.content.parts[0].text;
    } else {
      console.warn('No content in API response, falling back to mock data.');
      setAppIsOffline(true);
      const { getMockData } = require('./mockData');
      return getMockData(prompt);
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    setAppIsOffline(true);
    const { getMockData } = require('./mockData');
    return `An error occurred: ${error.message}. Displaying mock data instead.\n\n${getMockData(prompt)}`;
  }
};