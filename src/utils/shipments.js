import { statuses, modes } from '../data/seed.js';
export function filterShipments(items, { search='', status='All', mode='All', sort='created', direction='desc', month='all' } = {}) {
 const q = search.trim().toLowerCase();
 return items.filter(s => (!q || [s.id,s.customer,s.origin,s.destination,s.reference].some(v=>String(v).toLowerCase().includes(q))) && (status==='All'||s.status===status) && (mode==='All'||s.mode===mode) && (month==='all'||s.created.startsWith(month)))
 .sort((a,b)=>{const av=a[sort],bv=b[sort];const n=typeof av==='number'?av-bv:String(av).localeCompare(String(bv));return direction==='asc'?n:-n;});
}
export function metrics(items) {
 const total = items.length;
 const delivered = items.filter(s=>s.status==='Delivered').length;
 return { total, active:items.filter(s=>!['Delivered'].includes(s.status)).length, delivered, delayed:items.filter(s=>s.status==='Delayed').length, rate:total?Math.round(delivered/total*100):0, value:items.reduce((sum,s)=>sum+s.value,0), weight:items.reduce((sum,s)=>sum+s.weight,0) };
}
export function validateShipment(s) {
 const errors={};
 for(const key of ['customer','origin','destination','eta','description']) if(!String(s[key]??'').trim()) errors[key]='This field is required.';
 for(const key of ['customer','origin','destination','description','reference']) if(String(s[key]??'').length>200) errors[key]='Use 200 characters or fewer.';
 if(s.origin?.trim().toLowerCase()===s.destination?.trim().toLowerCase() && s.origin?.trim()) errors.destination='Choose a different destination.';
 if(!modes.includes(s.mode)) errors.mode='Select a transport mode.';
 if(!statuses.includes(s.status)) errors.status='Select a valid status.';
 if(!Number.isFinite(Number(s.weight))||Number(s.weight)<=0||Number(s.weight)>10000000) errors.weight='Enter a weight between 0 and 10,000,000 kg.';
 if(s.value === '' || s.value == null || !Number.isFinite(Number(s.value))||Number(s.value)<0||Number(s.value)>1000000000) errors.value='Enter a value from 0 to 1,000,000,000.';
 if(s.eta && (!/^\d{4}-\d{2}-\d{2}$/.test(s.eta)||Number.isNaN(Date.parse(s.eta))||(!Number.isNaN(Date.parse(s.eta))&&new Date(s.eta).toISOString().slice(0,10)!==s.eta))) errors.eta='Enter a valid date.';
 return errors;
}
export function isShipment(s) {return Boolean(s && typeof s.id==='string' && typeof s.created==='string' && Array.isArray(s.history) && Object.keys(validateShipment(s)).length===0 && typeof s.weight==='number' && typeof s.value==='number');}
export function toCSV(items) {
 const keys=['id','customer','origin','destination','mode','status','created','eta','weight','value','reference'];
 const escape=v=>'"'+String(v??'').replace(/^[=+@-]/,"'$&").replaceAll('"','""')+'"';
 return '\ufeff'+[keys.join(','),...items.map(s=>keys.map(k=>escape(s[k])).join(','))].join('\r\n');
}
export const money=v=>new Intl.NumberFormat('en-IE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(v);
export const dateLabel=v=>new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(v));
