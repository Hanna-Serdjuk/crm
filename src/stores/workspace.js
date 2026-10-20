import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { createSeed } from '../data/seed.js';
import { isShipment, metrics, validateShipment } from '../utils/shipments.js';
const KEY='dispatch-workspace-v1';
export const useWorkspace=defineStore('workspace',()=>{
 const shipments=ref([]), loading=ref(true), error=ref(''), storageWarning=ref(''), toast=ref('');
 const settings=ref({name:'Alex Morgan',company:'Nordhaus Logistics',email:'alex@example.com',compact:false});
 let initialized=false,toastTimer;
 function notify(text){toast.value=text;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.value='',4500);}
 async function load(fail=false){
  loading.value=true;error.value='';
  await new Promise(resolve=>setTimeout(resolve,350));
  try {
   if(fail) throw new Error('The demo service is unavailable. Retry to load your workspace.');
   if(!initialized){
    let saved;try{saved=JSON.parse(localStorage.getItem(KEY)||'null');}catch{storageWarning.value='Saved data could not be read. Demo data has been restored.';}
    shipments.value=saved&&Array.isArray(saved.shipments)&&saved.shipments.every(isShipment)?saved.shipments:createSeed();
    if(saved&&settingsValid(saved.settings)) settings.value={...settings.value,...saved.settings};
    initialized=true;
   }
  }catch(e){error.value=e.message;}finally{loading.value=false;}
 }
 function settingsValid(s){return s&&typeof s.name==='string'&&typeof s.company==='string'&&typeof s.email==='string'&&typeof s.compact==='boolean';}
 watch([shipments,settings],()=>{
  if(!initialized)return;
  try{localStorage.setItem(KEY,JSON.stringify({shipments:shipments.value,settings:settings.value}));}catch{storageWarning.value='Browser storage is unavailable. Changes will last for this session only.';}
 },{deep:true});
 function save(data,id=null){
  const clean={...data,customer:data.customer.trim(),origin:data.origin.trim(),destination:data.destination.trim(),description:data.description.trim(),reference:(data.reference||'').trim(),weight:Number(data.weight),value:Number(data.value)};
  const errors=validateShipment({...clean,value:data.value});if(Object.keys(errors).length) return {errors};
  const now=new Date().toISOString().slice(0,10);
  if(id){const existing=shipments.value.find(s=>s.id===id);if(!existing)return{errors:{form:'Shipment no longer exists.'}};
   const history=[...existing.history];if(existing.status!==clean.status)history.push({status:clean.status,date:now,note:'Status updated in the workspace.'});
   Object.assign(existing,clean,{id:existing.id,created:existing.created,history});
  }else{const number=Math.max(1048,...shipments.value.map(s=>Number(s.id.replace('DSP-',''))||0))+1;shipments.value.unshift({...clean,id:`DSP-${number}`,created:now,history:[{status:clean.status,date:now,note:'Shipment created in the workspace.'}]});}
  notify(id?'Shipment updated successfully.':'New shipment created.');return {ok:true};
 }
 function remove(id){shipments.value=shipments.value.filter(s=>s.id!==id);notify('Shipment deleted.');}
 function reset(){shipments.value=createSeed();notify('Demo shipments restored.');}
 return{shipments,settings,loading,error,storageWarning,toast,totals:computed(()=>metrics(shipments.value)),load,save,remove,reset,notify};
});
