<script setup>
import { LayoutDashboard, Package, ChartNoAxesCombined, Settings, ChevronDown, ChevronRight, ChevronLeft, ArrowUpRight, ArrowRight, ArrowLeft, Plus, Search, Bell, X, Download, Ship, Truck, Plane, Clock, CircleCheck, CircleAlert, MapPin, MoreHorizontal, SlidersHorizontal, ArrowDown, ArrowUp, RefreshCw, Trash2, Pencil, Check, Menu, HelpCircle, ExternalLink, Activity, Box, MoveRight, CalendarDays, Circle, Copy } from 'lucide-vue-next';
defineProps({name:String,size:{type:Number,default:18}});
const icons={LayoutDashboard,Package,ChartNoAxesCombined,Settings,ChevronDown,ChevronRight,ChevronLeft,ArrowUpRight,ArrowRight,ArrowLeft,Plus,Search,Bell,X,Download,Ship,Truck,Plane,Clock,CircleCheck,CircleAlert,MapPin,MoreHorizontal,SlidersHorizontal,ArrowDown,ArrowUp,RefreshCw,Trash2,Pencil,Check,Menu,HelpCircle,ExternalLink,Activity,Box,MoveRight,CalendarDays,Circle,Copy};
</script>
<template><component :is="icons[name]||icons.Package" :size="size" :stroke-width="1.7" aria-hidden="true" /></template>
