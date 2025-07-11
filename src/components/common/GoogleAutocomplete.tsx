import React, { useRef, useEffect, useCallback } from 'react';
import { Input } from '../../components/ui';
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_RESTRICTIONS } from '../../utils/constants';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface Location {
  lat: number;
  lng: number;
  place_id: string;
  place_name: string;
  name?: string;
}

interface GoogleAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  onPlaceSelected?: (place: Location) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const GoogleAutocomplete: React.FC<GoogleAutocompleteProps> = ({
  value,
  onChange,
  onPlaceSelected,
  placeholder = "Enter location",
  label,
  error,
  disabled = false,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const onPlaceSelectedRef = useRef(onPlaceSelected);

  // Keep the callback ref updated without triggering useEffect
  useEffect(() => {
    onPlaceSelectedRef.current = onPlaceSelected;
  }, [onPlaceSelected]);

  const handlePlaceChanged = useCallback(() => {
    if (!autocompleteRef.current) return;
    
    const place = autocompleteRef.current.getPlace();
    console.log('Google place object:', place);
    
    if (place.geometry && place.geometry.location && onPlaceSelectedRef.current) {
      const location: Location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        place_id: place.place_id,
        place_name: place.formatted_address,
        name: place.name || place.formatted_address,
      };

      console.log('Calling onPlaceSelected with:', location);
      onPlaceSelectedRef.current(location);
    } else {
      console.log('Place selection failed:', { 
        hasGeometry: !!place.geometry, 
        hasLocation: !!place.geometry?.location,
        hasCallback: !!onPlaceSelectedRef.current 
      });
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        initAutocomplete();
        return;
      }

      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (mounted) {
            initAutocomplete();
          }
        };
        document.head.appendChild(script);
      } else {
        // Script already exists, wait for it to load
        const checkGoogleMaps = () => {
          if (window.google && window.google.maps && window.google.maps.places) {
            if (mounted) {
              initAutocomplete();
            }
          } else {
            setTimeout(checkGoogleMaps, 100);
          }
        };
        checkGoogleMaps();
      }
    };

    const initAutocomplete = () => {
      if (!inputRef.current || !window.google || !mounted) return;

      try {
        // Clear previous autocomplete if exists
        if (autocompleteRef.current) {
          window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }

        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            ...GOOGLE_MAPS_RESTRICTIONS,
            fields: ['place_id', 'formatted_address', 'geometry', 'name'],
          }
        );

        // Add the event listener
        autocompleteRef.current.addListener('place_changed', handlePlaceChanged);
        
        console.log('Autocomplete initialized successfully');
      } catch (error) {
        console.error('Error initializing autocomplete:', error);
      }
    };

    loadGoogleMaps();

    return () => {
      mounted = false;
      if (autocompleteRef.current && window.google) {
        try {
          window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        } catch (error) {
          console.error('Error cleaning up autocomplete:', error);
        }
      }
    };
  }, []); // Empty dependency array - only run once

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      label={label}
      error={error}
      disabled={disabled}
      className={className}
      autoComplete="off"
    />
  );
};