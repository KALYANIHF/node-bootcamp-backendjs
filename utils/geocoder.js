async function getGeoCoding(address) {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=${process.env.GEOCODER_API_KEY}`
  );
  const data = await response.json();
  return data;
}

module.exports = getGeoCoding;
