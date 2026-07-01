import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { updateAddress } from "../../services/addressService";
import { checkDeliveryArea } from "../../services/locationService";
import { Navigation, Search, X } from "lucide-react";
import getMacOptions from "../../utils/macUtils";

const DEFAULT_CENTER = { lat: 17.4875, lng: 78.3953 };

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
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const mapRef = useRef(null);
  const searchDebounceRef = useRef(null);

  const mac = getMacOptions();
  const googleMapskey = mac.GOOGLE_MAPS_API_KEY;
  
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
    setSearchResults([]);
    setSearchInput("");
    if (mapRef.current) mapRef.current.panTo({ lat, lng });
  }, [reverseGeocode, checkZone]);

  const searchSeqRef = useRef(0);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    clearTimeout(searchDebounceRef.current);

    if (!query.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    if (!window.google?.maps) return;

    setSearching(true);
    const seq = ++searchSeqRef.current;
    searchDebounceRef.current = setTimeout(() => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: query + ", Hyderabad" }, (results, status) => {
        if (seq !== searchSeqRef.current) return; // stale response — discard
        if (status === "OK" && results) {
          setSearchResults(
            results.slice(0, 5).map((r) => ({
              label: r.formatted_address,
              lat: r.geometry.location.lat(),
              lng: r.geometry.location.lng(),
            }))
          );
        } else {
          setSearchResults([]);
        }
        setSearching(false);
      });
    }, 450);
  };

  useEffect(() => () => clearTimeout(searchDebounceRef.current), []);

  // Select a search result
  const selectSearchResult = (result) => {
    handleLocationSelect(result.lat, result.lng);
  };

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

      {/* Search input */}
      <div className="relative px-6 pt-4 sm:px-10">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search address..."
            className="w-full rounded-xl bg-sage/20 py-3.5 pl-10 pr-10 text-sm text-forest outline-none transition-colors focus:ring-1 focus:ring-emerald"
          />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput("");
                setSearchResults([]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-forest"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search results dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute left-6 right-6 top-full z-50 mt-1 rounded-xl border border-sage bg-white shadow-lg sm:left-10 sm:right-10">
            {searchResults.map((result, idx) => (
              <button
                key={idx}
                onClick={() => selectSearchResult(result)}
                className="w-full border-b border-sage/30 px-4 py-3 text-left text-sm text-forest hover:bg-sage/20 last:border-b-0"
              >
                {result.label}
              </button>
            ))}
          </div>
        )}

        {searching && <p className="mt-2 text-xs text-text-muted">Searching...</p>}
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
