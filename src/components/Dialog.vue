<script setup>
import { onMounted,onUnmounted,ref,nextTick } from 'vue';
import Icon from './Icon.vue';
defineProps({title:String,wide:Boolean});const emit=defineEmits(['close']);const box=ref(null);let previous;
function key(e){if(e.key==='Escape')emit('close');if(e.key==='Tab'){const nodes=[...box.value.querySelectorAll('button,input,select,textarea,a[href]')].filter(n=>!n.disabled);const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}}
onMounted(async()=>{previous=document.activeElement;document.body.style.overflow='hidden';document.addEventListener('keydown',key);await nextTick();box.value.querySelector('input,button')?.focus();});
onUnmounted(()=>{document.body.style.overflow='';document.removeEventListener('keydown',key);previous?.focus();});
</script>
<template><Teleport to="body"><div class="dialog-backdrop" @click.self="emit('close')"><section ref="box" class="dialog" :class="{wide}" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><div class="dialog-head"><div><span class="overline">DISPATCH WORKSPACE</span><h2 id="dialog-title">{{title}}</h2></div><button class="icon-button" @click="emit('close')" aria-label="Close dialog"><Icon name="X"/></button></div><slot/></section></div></Teleport></template>
