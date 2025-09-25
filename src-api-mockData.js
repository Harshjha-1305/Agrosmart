// Mock data for offline development or when API key is not available
export const getMockData = (prompt) => {
  if (prompt.includes("soil health analysis")) {
    return "Mock Data: This soil appears to be slightly deficient in Nitrogen. Recommend adding a nitrogen-rich organic compost. The Potassium and Phosphorus levels are adequate for most leafy vegetables. Consider rotating crops with legumes to naturally improve soil health.";
  }
  if (prompt.includes("Analyze this image of a plant leaf")) {
    return "Mock Data: Diagnosis: Early-stage Powdery Mildew detected with 85% confidence. \n\nOrganic Recommendation: Spray a solution of neem oil and water every 7-10 days. \n\nChemical Recommendation: Use a fungicide containing Myclobutanil as per the product instructions. Ensure to wear protective gear.";
  }
  if (prompt.includes("Recommend 3 suitable crops")) {
    return "Mock Data: Based on your location and soil, here are three recommendations:\n1. **Spinach (Palak):** Thrives in cooler weather and your soil's nutrient profile is ideal. \n2. **Radish (Mooli):** A fast-growing crop that can be harvested quickly. \n3. **Coriander (Dhania):** High local demand and suitable for your current climate.";
  }
  if (prompt.includes("market price trend analysis") || prompt.includes("critical market alert")) {
    return "Mock Data: Market prices for Tomatoes in Thane, Maharashtra have been stable over the past week, averaging ₹25-30/kg. A slight increase is forecasted next week due to increased demand before the festival season. Selling early in the week is advisable.";
  }
  if (prompt.includes("relevant government schemes")) {
    return "Mock Data:\n1. **Pradhan Mantri Fasal Bima Yojana (PMFBY):** Provides insurance coverage against crop failure.\n   - *How to Apply:* Visit your nearest bank or CSC center with your land records and Aadhar card.\n2. **Kisan Credit Card (KCC):** Offers credit to farmers at a lower interest rate.\n   - *How to Apply:* Approach your bank with identity and land documents to get a KCC limit sanctioned.";
  }
  if (prompt.includes("Generate a detailed crop timeline")) {
    return "Mock Data: **Crop Timeline for Wheat**\n\n* **Week 1-2 (Sowing):** Prepare the field by ploughing. Sow certified seeds at a depth of 5-6 cm.\n* **Week 3 (Germination):** Ensure light irrigation for proper germination.\n* **Week 4-6 (Tillering):** Apply the first dose of Nitrogen fertilizer. Watch for early weeds.\n* **Week 10-12 (Flowering):** This is a critical watering stage. Ensure the soil has adequate moisture.\n* **Week 15-18 (Harvesting):** The grains will be hard and golden. Harvest the crop and let it dry.";
  }
  if (prompt.includes("Generate a short, descriptive weather forecast") || prompt.includes("critical weather alert")) {
    const forecasts = [
      "Expect clear skies and a sunny day with a gentle breeze. Perfect for field work. Temperature around 31°C.",
      "Partly cloudy skies today with a chance of light afternoon showers. It would be wise to complete spraying activities in the morning. Temperature around 29°C.",
      "Overcast conditions with high humidity. Possibility of scattered thunderstorms towards the evening. Secure any loose equipment. Temperature around 28°C."
    ];
    return forecasts[Math.floor(Math.random() * forecasts.length)];
  }
  if (prompt.includes("critical crop alert")) {
    return "High humidity raises the risk of Powdery Mildew for your Wheat crop. Proactively inspect leaves and ensure good air circulation.";
  }
  return "Mock Data: Could not determine the correct mock data for the provided prompt.";
};