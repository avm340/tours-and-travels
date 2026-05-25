export interface WhatsAppParams {
  car?: string;
  from?: string;
  to?: string;
  date?: string;
  passengers?: string;
  tripType?: string;
  package?: string;
  message?: string;
}

export function bookOnWhatsApp(params: WhatsAppParams) {
  let text = "";
  if (params.message) {
    text = params.message;
  } else if (params.package) {
    text = `Hi Manasvi Tours, I am interested in booking the "${params.package}" package.`;
  } else {
    text = `Hi Manasvi Tours, I want to book a car.`;
    if (params.car) text += `\nCar: ${params.car}`;
    if (params.tripType) text += `\nTrip Type: ${params.tripType}`;
    if (params.from && params.to) text += `\nRoute: ${params.from} to ${params.to}`;
    if (params.date) {
      const formatted = new Date(params.date).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: true,
      });
      text += `\nPickup Date: ${formatted} IST`;
    }
    if (params.passengers) text += `\nPassengers: ${params.passengers}`;
    text += `\nPlease share the quote.`;
  }
  
  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/919821790471?text=${encoded}`, '_blank');
}
