import React, { useRef, useEffect } from 'react';
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

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initAutocomplete();
        return;
      }

      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initAutocomplete;
        document.head.appendChild(script);
      }
    };

    const initAutocomplete = () => {
      if (!inputRef.current || !window.google) return;

      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          ...GOOGLE_MAPS_RESTRICTIONS,
          fields: ['place_id', 'formatted_address', 'geometry', 'name'],
        }
      );

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        
        if (place.geometry && place.geometry.location) {
          const location: Location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            place_id: place.place_id,
            place_name: place.formatted_address,
            name: place.name || place.formatted_address,
          };

          onPlaceSelected?.(location);
        }
      });
    };

    loadGoogleMaps();

    return () => {
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onPlaceSelected]);

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
