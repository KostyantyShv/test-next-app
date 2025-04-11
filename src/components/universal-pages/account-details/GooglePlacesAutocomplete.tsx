import React, { useRef, useEffect } from "react";
import FormField from "./FormField";

interface GooglePlacesAutocompleteProps {
  id: string;
  name: string;
  placeholder: string;
  onSelect: (address: {
    addressLine1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }) => void;
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  id,
  name,
  placeholder,
  onSelect,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current || !window.google) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" },
      fields: ["address_components", "name"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      let street_number = "";
      let route = "";
      let locality = "";
      let admin_area_1 = "";
      let postal_code = "";
      let country = "";

      place.address_components.forEach((component) => {
        const types = component.types;
        if (types.includes("street_number"))
          street_number = component.long_name;
        else if (types.includes("route")) route = component.short_name;
        else if (types.includes("locality")) locality = component.long_name;
        else if (types.includes("administrative_area_level_1"))
          admin_area_1 = component.short_name;
        else if (types.includes("postal_code"))
          postal_code = component.long_name;
        else if (types.includes("country")) country = component.short_name;
      });

      onSelect({
        addressLine1: `${street_number} ${route}`.trim(),
        city: locality,
        state: admin_area_1,
        zip: postal_code,
        country: country,
      });
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const pacContainer = document.querySelector(".pac-container");
        if (
          !pacContainer ||
          getComputedStyle(pacContainer).display === "none"
        ) {
          e.preventDefault();
        }
      }
    };

    inputRef.current.addEventListener("keydown", handleKeyDown);
    return () => {
      inputRef.current?.removeEventListener("keydown", handleKeyDown);
      // Cleanup: Remove the autocomplete listener
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [onSelect]);

  return (
    <FormField
      label="Address"
      id={id}
      name={name}
      placeholder={placeholder}
      ref={inputRef}
    />
  );
};

export default GooglePlacesAutocomplete;
