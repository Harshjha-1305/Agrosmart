import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  try {
    // Request permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    // Get current position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const { latitude, longitude } = location.coords;

    // Try to get address from coordinates
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addresses && addresses.length > 0) {
        const address = addresses[0];
        return `${address.city || address.subregion || address.region}, ${address.region}`;
      }
    } catch (reverseGeocodeError) {
      console.warn('Reverse geocoding failed:', reverseGeocodeError);
    }

    // Fallback to coordinates if reverse geocoding fails
    return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;

  } catch (error) {
    console.error('Error getting location:', error);
    throw error;
  }
};