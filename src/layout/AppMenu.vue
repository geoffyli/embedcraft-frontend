<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', to: '/main/dashboard' }]
    },
    {
        label: 'Management',
        items: [
            // {
            //     label: 'Device Management', icon: 'pi pi-fw pi-car',
            //     items: [
            //         {
            //             label: 'Device List',
            //             icon: 'pi pi-fw pi-list',
            //             to: '/main/deviceList'
            //         },
            //         // {
            //         //     label: 'Device Detail',
            //         //     icon: 'pi pi-fw pi-bars',
            //         //     to: '/main/deviceDetail'
            //         // }
            //     ]
            // },
            { label: 'Word Embedding Training', icon: 'pi pi-fw pi-caret-right', to: '/main/trainingSettings' },
            { label: 'Stored Word Embeddings', icon: 'pi pi-fw pi-database', to: '/main/storedModels' }
            // {
            //     label: 'Alarm Management',
            //     icon: 'pi pi-fw pi-shield',
            //     items: [
            //         {
            //             label: 'Alarm Log',
            //             icon: 'pi pi-fw pi-list',
            //             to: '/main/alarmLog'
            //         },
            //         {
            //             label: 'Alarm Management',
            //             icon: 'pi pi-fw pi-bars',
            //             to: '/main/alarmManagement'
            //         }
            //     ]
            // },
        ]
    },
    {
        label: 'Settings & Instructions',
        items: [
            // { label: 'Profile', icon: 'pi pi-fw pi-user', to: '/utilities/icons' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/main/settings' },
            { label: 'Documentation', icon: 'pi pi-fw pi-book', to: '/main/documentation', badge: 'NEW' },
        ]
    },
    // {
    //     label: 'Instructions & About',
    //     items: [
    //         { label: 'About', icon: 'pi pi-fw pi-at', url: 'https://github.com/geoffyli', target: '_blank' }
    //     ]
    // },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <!-- <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li> -->
    </ul>
</template>

<style lang="scss" scoped></style>
