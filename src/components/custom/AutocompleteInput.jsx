import { useEffect, useRef } from 'react';

const AutocompleteInput = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.google?.maps?.places) {
      const autocomplete = new google.maps.places.PlaceAutocompleteElement();
      autocomplete.id = "autocomplete";
      autocomplete.placeholder = "Enter a place";
      autocomplete.className = "border rounded-md p-2 mt-4";

      if (containerRef.current) {
        containerRef.current.innerHTML = ''; // Clear previous
        containerRef.current.appendChild(autocomplete);

        autocomplete.addEventListener("place_changed", () => {
          const place = autocomplete.getPlace();
          console.log("Selected place:", place);
        });
      }
    }
  }, []);

  return <div ref={containerRef}></div>;
};

export default AutocompleteInput;
