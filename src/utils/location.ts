export async function getCurrentLocation(): Promise<{ latitude: number; longitude: number } | null> {
  if (!navigator.geolocation) {
    console.log('Geolocalización no disponible');
    return null;
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (error) {
    console.error('Error al obtener la ubicación:', error);
    return null;
  }
}
