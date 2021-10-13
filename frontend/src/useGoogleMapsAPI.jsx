import { useEffect, useState } from 'react';

const useGoogleMapsAPI = ({ onLoad }) => {
  const [removeListener, setRemoveListener] = useState(true);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const callback = () => {
      console.log('loaded');
      setIsReady(true);
      onLoad();
    };

    const id = 'googleMapsScript';
    let googleMapScript = document.getElementById(id);

    if (googleMapScript) {
      if (window.google) {
        setRemoveListener(false);
        callback();
      } else {
        googleMapScript.addEventListener('load', callback);
      }
    } else {
      googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GCP_KEY}&libraries=places`;
      googleMapScript.async = true;
      googleMapScript.id = id;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener('load', callback);
    }

    return () => {
      if (removeListener) {
        googleMapScript.removeEventListener('load', callback);
      }
    };
  }, []);
  return [isReady];
};

export default useGoogleMapsAPI;
