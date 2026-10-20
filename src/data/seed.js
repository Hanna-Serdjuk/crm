export const statuses = ['Booked', 'In transit', 'Customs', 'Delivered', 'Delayed'];
export const modes = ['Ocean', 'Road', 'Air'];
export const customers = ['Nordhaus Studio', 'Olivé Market', 'Atelier Objects', 'Morrow Supply', 'Kinfolk Living', 'Forma Goods'];
export function createSeed() {
 const routes = [
  ['Shanghai','China','Rotterdam','Netherlands','Ocean'],
  ['Hamburg','Germany','Amsterdam','Netherlands','Road'],
  ['Shenzhen','China','Antwerp','Belgium','Ocean'],
  ['Milan','Italy','Berlin','Germany','Road'],
  ['Tokyo','Japan','Frankfurt','Germany','Air'],
  ['Barcelona','Spain','Paris','France','Road'],
  ['Ningbo','China','Hamburg','Germany','Ocean'],
  ['London','United Kingdom','Amsterdam','Netherlands','Air']
 ];
 return Array.from({length:32}, (_, i) => {
  const r = routes[i % routes.length];
  const status = ['In transit','Delivered','Customs','In transit','Delayed','Delivered','Booked','In transit'][i%8];
  const month = i < 14 ? 9 : i < 24 ? 8 : 7;
  const created = new Date(Date.UTC(2026,month,Math.min(20,2+(i*3)%19))).toISOString().slice(0,10);
  const eta = new Date(Date.UTC(2026,month,Math.min(28,10+(i*2)%19))).toISOString().slice(0,10);
  return { id:`DSP-${1048-i}`, customer:customers[i%6], origin:r[0], originCountry:r[1], destination:r[2], destinationCountry:r[3], mode:r[4], status, created, eta, weight:850+i*137, value:1240+i*173, description:['Homeware & accessories','Organic food products','Furniture components','Textiles & fabrics'][i%4], reference:`PO-2026-${240+i}`, history:[{status:'Booked',date:created,note:'Shipment created and booking confirmed.'},...(status==='Booked'?[]:[{status,date:created,note:status==='Delivered'?'Delivery confirmed by the recipient.':status==='Delayed'?'Carrier reported a schedule change.':'Shipment status updated by operations.'}])] };
 });
}
