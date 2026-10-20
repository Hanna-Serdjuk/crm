import test from 'node:test';
import assert from 'node:assert/strict';
import {createPinia,setActivePinia} from 'pinia';
import {nextTick} from 'vue';
import {useWorkspace} from '../src/stores/workspace.js';
const storage=new Map();globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
function fresh(){setActivePinia(createPinia());return useWorkspace();}
test('store supports create, persisted reload, status timeline and delete',async()=>{
 storage.clear();const store=fresh();await store.load();assert.equal(store.shipments.length,32);
 const draft={...store.shipments[0],customer:'New customer',status:'Booked',weight:100,value:200};
 assert(store.save(draft).ok);assert.equal(store.shipments.length,33);const created=store.shipments[0];assert.notEqual(created.id,draft.id);assert.equal(created.history.length,1);
 assert(store.save({...created,status:'In transit'},created.id).ok);assert.equal(created.history.length,2);assert.equal(created.history[1].status,'In transit');
 await nextTick();const reloaded=fresh();await reloaded.load();assert.equal(reloaded.shipments.length,33);assert.equal(reloaded.shipments[0].status,'In transit');
 reloaded.remove(created.id);assert.equal(reloaded.shipments.length,32);assert(!reloaded.shipments.some(s=>s.id===created.id));
 store.toast='';reloaded.toast='';
});
test('invalid writes are rejected without changing store data',async()=>{storage.clear();const store=fresh();await store.load();const before=JSON.stringify(store.shipments);assert(store.save({...store.shipments[0],weight:-1}).errors.weight);assert(store.save({...store.shipments[0],value:''}).errors.value);assert.equal(JSON.stringify(store.shipments),before);});
test('service error has a recoverable retry state',async()=>{const store=fresh();await store.load(true);assert.match(store.error,/unavailable/);assert.equal(store.loading,false);await store.load();assert.equal(store.error,'');assert.equal(store.loading,false);});
test('corrupted browser storage restores demo data',async()=>{storage.set('dispatch-workspace-v1','{not json');const store=fresh();await store.load();assert.equal(store.shipments.length,32);assert.match(store.storageWarning,/could not be read/);});
