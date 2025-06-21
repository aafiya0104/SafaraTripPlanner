import { useEffect, useRef } from 'react';

const AutocompleteInput = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.google?.maps?.places) {
      const autocomplete = new google.maps.places.PlaceAutocompleteElement();
      autocomplete.id = "autocomplete";
      autocomplete.placeholder = "🌍 Where would you like to explore?";
      
      const inputStyles = `
        width: 100%;
        padding: 16px 20px;
        border: 2px solid #fbbf24;
        border-radius: 16px;
        font-size: 16px;
        font-weight: 500;
        color: #92400e;
        background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(254,243,199,0.3) 100%);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        outline: none;
        box-shadow: 0 4px 20px rgba(251, 191, 36, 0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      `;
      
      autocomplete.style.cssText = inputStyles;
      
      const hoverFocusStyles = `
        ${inputStyles}
        border-color: #f59e0b;
        box-shadow: 0 8px 30px rgba(251, 191, 36, 0.25), 0 0 0 4px rgba(251, 191, 36, 0.1);
        transform: translateY(-2px);
        background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,243,199,0.4) 100%);
      `;

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'relative group';
        wrapper.style.cssText = `
          position: relative;
          margin-top: 16px;
        `;
        
        const iconContainer = document.createElement('div');
        iconContainer.innerHTML = '🎯';
        iconContainer.style.cssText = `
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          z-index: 10;
          pointer-events: none;
          opacity: 0.6;
          transition: all 0.3s ease;
        `;
        
        wrapper.appendChild(autocomplete);
        wrapper.appendChild(iconContainer);
        containerRef.current.appendChild(wrapper);

        autocomplete.addEventListener('focus', () => {
          autocomplete.style.cssText = hoverFocusStyles;
          iconContainer.style.opacity = '1';
          iconContainer.style.transform = 'translateY(-50%) scale(1.1)';
        });

        autocomplete.addEventListener('blur', () => {
          autocomplete.style.cssText = inputStyles;
          iconContainer.style.opacity = '0.6';
          iconContainer.style.transform = 'translateY(-50%) scale(1)';
        });

        autocomplete.addEventListener('mouseenter', () => {
          if (document.activeElement !== autocomplete) {
            autocomplete.style.cssText = hoverFocusStyles;
            iconContainer.style.opacity = '0.8';
          }
        });

        autocomplete.addEventListener('mouseleave', () => {
          if (document.activeElement !== autocomplete) {
            autocomplete.style.cssText = inputStyles;
            iconContainer.style.opacity = '0.6';
          }
        });

        autocomplete.addEventListener("place_changed", () => {
          const place = autocomplete.getPlace();
          console.log("Selected place:", place);
          
          autocomplete.style.cssText = `
            ${inputStyles}
            border-color: #10b981;
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2);
          `;
          iconContainer.innerHTML = '✅';
          iconContainer.style.opacity = '1';
          
          setTimeout(() => {
            iconContainer.innerHTML = '🎯';
            autocomplete.style.cssText = inputStyles;
          }, 2000);
        });
      }
    }
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        <label className="block text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2">
          <span className="text-base">🗺️</span>
          Destination
        </label>
        <div 
          ref={containerRef}
          className="relative"
        />
        <p className="text-xs text-amber-600/70 mt-2 flex items-center gap-1">
          <span>💡</span>
          Start typing to see suggestions from around the world
        </p>
      </div>
    </div>
  );
};

export default AutocompleteInput;