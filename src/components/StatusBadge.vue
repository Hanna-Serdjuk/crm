<script setup>defineProps({status:String});</script>
<template><span class="status" :class="status?.toLowerCase().replaceAll(' ','-')"><i></i>{{status}}</span></template>
