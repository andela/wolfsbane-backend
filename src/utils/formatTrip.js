export default (tripDetails) => {
  const {
    origin,
    destination,
    returnDate,
    departureDate,
    travelReasons,
    roomId,
    typeOfTrip,
    requestId,
    accommodationId
  } = tripDetails;

  let trip = {
    requestId,
    origin,
    destination,
    departureDate,
    travelReasons,
    typeOfTrip,
    roomId,
    accommodationId
  };
  if (typeOfTrip === 'Return') {
    trip = { ...trip, returnDate };
  }
  return trip;
};
