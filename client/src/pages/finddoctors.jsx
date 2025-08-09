import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FindDoctors() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for mental health professionals near:", location);

    if (!location) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latLng = { lat: position.coords.latitude, lng: position.coords.longitude };
            searchMentalHealthProfessionals(latLng);
          },
          () => {
            const defaultLatLng = { lat: 12.9716, lng: 77.5946 }; // Default to Bangalore
            searchMentalHealthProfessionals(defaultLatLng);
          }
        );
      } else {
        const defaultLatLng = { lat: 12.9716, lng: 77.5946 }; // Default to Bangalore
        searchMentalHealthProfessionals(defaultLatLng);
      }
    } else {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const latLng = results[0].geometry.location.toJSON();
          searchMentalHealthProfessionals(latLng);
        } else {
          console.error('Geocode failed:', status);
          setError('Could not find the location. Please try again.');
        }
      });
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBc9EZl50BzSVlP_XxeWuawuUps_KP4Fmw&libraries=places`;
    script.async = true;
    script.onload = initMap;
    script.onerror = () => setError('Failed to load Google Maps API. Check your API key and internet connection.');
    document.body.appendChild(script);

    function initMap() {
      if (window.google) {
        const defaultMap = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: 12.9716, lng: 77.5946 },
          zoom: 12,
        });
        setMap(defaultMap);
      } else {
        setError('Google Maps API failed to initialize.');
      }
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const searchMentalHealthProfessionals = (latLng) => {
    if (map) {
      map.setCenter(latLng);

      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: latLng,
          radius: 20000, // Increased to 20km for broader coverage
          type: ['doctor', 'hospital', 'health'], // Expanded types to include health-related places
          keyword: 'mental health psychiatrist therapist counselor psychologist', // Comprehensive mental health keywords
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            map.data.forEach((feature) => map.data.remove(feature)); // Clear existing markers
            const bounds = new window.google.maps.LatLngBounds();
            results.forEach((place) => {
              const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map,
                title: place.name,
                icon: {
                  url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png', // Purple for mental health
                  scaledSize: new window.google.maps.Size(32, 32),
                },
              });
              bounds.extend(place.geometry.location); // Extend bounds to fit all markers
            });
            map.fitBounds(bounds); // Automatically adjust zoom to fit all markers
          } else {
            console.error('Places search failed:', status);
            setError('No mental health professionals or related facilities found nearby.');
          }
        }
      );
    }
  };

  return (
    <div className="relative w-screen h-screen min-h-screen min-w-full flex flex-col items-center justify-center overflow-hidden font-inter">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-emerald-200 via-pink-100 to-green-200 animate-gradient-green-pink-shift bg-[length:300%_300%]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-emerald-300 opacity-30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] bg-pink-200 opacity-30 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-[30%] right-[-8%] w-[30vw] h-[30vw] bg-green-200 opacity-20 rounded-full blur-2xl animate-pulse" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-emerald-800 mb-4 text-center leading-tight drop-shadow-lg">
          📍 Find Doctors Nearby
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-6 text-center max-w-2xl leading-relaxed drop-shadow">
          Locate mental health professionals in your vicinity. Enter your location to find a specialist who can help.
        </p>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mb-8">
          <input
            type="text"
            placeholder="Enter your location (e.g., city, postcode)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-grow p-3 md:p-4 border border-emerald-300 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base transition-colors duration-200 shadow-md"
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded-full text-sm md:text-base font-semibold shadow-lg hover:bg-emerald-700 transition duration-300 hover:scale-105"
          >
            Search Doctors
          </button>
        </form>
        <div
          id="map"
          style={{ width: '80%', height: '400px', borderRadius: '24px' }}
          className="bg-white/90 backdrop-blur-sm p-4 md:p-6 w-full max-w-3xl min-h-[220px] flex items-center justify-center text-gray-500 border border-gray-200 shadow-2xl"
        >
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}