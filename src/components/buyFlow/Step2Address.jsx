import { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { updateAddress } from "../../services/addressService";
import { checkDeliveryArea } from "../../services/locationService";
import { Navigation } from "lucide-react";
import getMacOptions from "../../utils/macUtils";

const DEFAULT_CENTER = { lat: 17.4875, lng: 78.3953 }; // just for initial map view

export default function Step2Address({ onContinue }) {
  const [position, setPosition] = useState(DEFAULT_CENTER);
  const [address, setAddress] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [building, setBuilding] = useState("");
  const [deliveryCheck, setDeliveryCheck] = useState(null);
  const [checking, setChecking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [located, setLocated] = useState(false);
  const mapRef = useRef(null);

  const mac = getMacOptions()
const googleMapskey = mac.GOOGLE_MAPS_API_KEY
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapskey,
  });

  const reverseGeocode = useCallback((lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  }, []);

  // Just call YOUR backend — it knows the kitchen location + radius
  const checkZone = useCallback(async (lat, lng) => {
    setChecking(true);
    setDeliveryCheck(null);
    const result = await checkDeliveryArea(lat, lng);
    setDeliveryCheck(result.data);
    setChecking(false);
  }, []);

  const handleLocationSelect = useCallback((lat, lng) => {
    setPosition({ lat, lng });
    reverseGeocode(lat, lng);
    checkZone(lat, lng);
    setLocated(true);
    if (mapRef.current) mapRef.current.panTo({ lat, lng });
  }, [reverseGeocode, checkZone]);

  const locateMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => handleLocationSelect(pos.coords.latitude, pos.coords.longitude),
      () => setError("Please allow location access"),
    );
  };

  const handleSave = async () => {
    if (!located) {
      setError("Please select your location");
      return;
    }
    if (!deliveryCheck?.serviceable) {
      setError("Sorry, we don't deliver to this area yet");
      return;
    }
    if (!flatNumber.trim()) {
      setError("Please enter your house/flat number");
      return;
    }

    setSaving(true);
    setError(null);

    const fullAddress = [flatNumber, building, address].filter(Boolean).join(", ");

    try {
      await updateAddress({
        address: fullAddress,
        latitude: position.lat,
        longitude: position.lng,
      });
      onContinue();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded) return <p className="py-20 text-center text-text-muted">Loading map...</p>;

  return (
    <div className="-m-6 sm:-m-10">

      {/* Title */}
      <div className="px-6 pt-6 sm:px-10 sm:pt-10">
        <h2 className="font-heading text-xl font-bold text-forest">Add address details</h2>
      </div>

      {/* Map */}
      <div className="relative mt-4">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "300px" }}
          center={position}
          zoom={located ? 16 : 13}
          onClick={(e) => handleLocationSelect(e.latLng.lat(), e.latLng.lng())}
          onLoad={(map) => { mapRef.current = map; }}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
          }}
        >
          {located && (
            <MarkerF
              position={position}
              draggable={true}
              onDragEnd={(e) => handleLocationSelect(e.latLng.lat(), e.latLng.lng())}
            />
          )}
        </GoogleMap>

        {/* Locate Me — floating on map */}
        <button
          onClick={locateMe}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-emerald bg-white px-5 py-2.5 text-sm font-semibold text-emerald shadow-md hover:bg-sage/30"
        >
          <Navigation size={16} /> LOCATE ME
        </button>
      </div>

      {/* Bottom section */}
      <div className="px-6 pb-6 sm:px-10 sm:pb-10">

        {/* Delivery check status */}
        {checking && (
          <p className="mt-4 text-center text-sm text-text-muted">Checking delivery area...</p>
        )}

        {!checking && deliveryCheck && !deliveryCheck.serviceable && (
          <div className="mt-4 rounded-xl bg-red-50 p-3 text-center">
            <p className="text-sm font-semibold text-red-600">
              We don't deliver here yet {deliveryCheck.distance ? `(${deliveryCheck.distance.toFixed(1)} km away)` : ""}
            </p>
          </div>
        )}

        {/* Detected address + Change */}
        {address && located && (
          <div className="mt-4 flex items-start justify-between border-b border-sage pb-4">
            <div>
              <p className="font-heading text-base font-bold text-forest">
                {address.split(",")[0]}
              </p>
              <p className="mt-0.5 text-sm text-text-muted">{address}</p>
            </div>
            <button
              onClick={locateMe}
              className="shrink-0 text-sm font-semibold text-emerald hover:underline"
            >
              Change
            </button>
          </div>
        )}

        {/* Address fields */}
        {located && deliveryCheck?.serviceable && (
          <>
            <p className="mt-5 font-heading text-base font-bold text-forest">Add Address</p>

            <input
              type="text"
              value={flatNumber}
              onChange={(e) => setFlatNumber(e.target.value)}
              placeholder="House No / Flat / Floor"
              className="mt-3 w-full rounded-xl bg-sage/20 px-4 py-3.5 text-sm text-forest outline-none transition-colors focus:ring-1 focus:ring-emerald"
            />

            <input
              type="text"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              placeholder="Building & Block No. (Optional)"
              className="mt-3 w-full rounded-xl bg-sage/20 px-4 py-3.5 text-sm text-forest outline-none transition-colors focus:ring-1 focus:ring-emerald"
            />
          </>
        )}

        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">{error}</p>}

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!located || !deliveryCheck?.serviceable || saving || checking}
          className="mt-6 w-full rounded-full bg-emerald py-4 font-heading text-base font-bold text-white transition-colors hover:bg-emerald-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? "Saving..." : "Save Address"}
        </button>
      </div>
    </div>
  );
}