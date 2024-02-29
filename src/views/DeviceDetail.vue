<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '@/service/CustomerService';
import ProductService from '@/service/ProductService';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { deviceUrl } from '@/api/APIUrls';

let deviceDetails = {
    "data": [
        {
            "code": "f230fh0g3",
            "id": "1003",
            "description": "Product Description",
            "image": "bamboo-watch.jpg",
            "price": 65,
            "category": "Accessories",
            "quantity": 24,
            "inventoryStatus": "INSTOCK",
            "rating": 3,
            "online": true,
            "tag": "123123"
        },
        { "tag": "123123345234523452345234623456", "code": "nvklal433","id": "Black Watch", "description": "Product Description", "image": "black-watch.jpg", "price": 72, "category": "Accessories", "quantity": 61, "inventoryStatus": "INSTOCK", "rating": 4, "online": false},
        { "tag": "123", "code": "zz21cz3c1", "id": "Blue Band", "description": "Product Description", "image": "blue-band.jpg", "price": 79, "category": "Fitness", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 3, "online": true },
    ],
    'test':{
      "deviceId": "10019",
      "alarm": false,
      "alarmName": "Normal",
      "level": 0,
      "online": true,
      "tag": null,
      "status": true
    },
}

const picklistValue = ref([
    [
        { name: 'San Francisco', code: 'SF' },
        { name: 'London', code: 'LDN' },
        { name: 'Paris', code: 'PRS' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Berlin', code: 'BRL' },
        { name: 'Barcelona', code: 'BRC' },
        { name: 'Rome', code: 'RM' }
    ],
    []
]);

const orderlistValue = ref([
    { name: 'San Francisco', code: 'SF' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Berlin', code: 'BRL' },
    { name: 'Barcelona', code: 'BRC' },
    { name: 'Rome', code: 'RM' }
]);

const dataviewValue = ref(null);
const layout = ref('grid');
const sortKey = ref(null);
const sortOrder = ref(null);
const sortField = ref(null);
const sortOptions = ref([
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
]);

const productService = new ProductService();

onMounted(() => {
    dataviewValue.value = deviceDetails.data;
    console.log(deviceDetails.data)
    // productService.getProductsSmall().then((data) => (dataviewValue.value = data));
});

const onSortChange = (event) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    } else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>DataView</h5>
                <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder"
                    :sortField="sortField">
                    <template #header>
                        <div class="grid grid-nogutter">
                            <div class="col-6 text-left">
                                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label"
                                    placeholder="Sort By Price" @change="onSortChange($event)" />
                            </div>
                            <div class="col-6 text-right">
                                <DataViewLayoutOptions v-model="layout" />
                            </div>
                        </div>
                    </template>
                    <template #list="deviceDetails">
                        <div class="col-12">
                            <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
                                <!-- <img :src="'demo/images/product/' + deviceDetails.data.image" :alt="deviceDetails.data.id" -->
                                    <!-- class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" /> -->
                                <div class="flex-1 text-center md:text-left">
                                    <div class="font-bold text-2xl">{{ deviceDetails.data.id }}</div>
                                    <div class="mb-3">{{ deviceDetails.data.description }}</div>
                                    <Rating :modelValue="deviceDetails.data.rating" :readonly="true" :cancel="false"
                                        class="mb-2"></Rating>
                                    <div class="flex align-items-center">
                                        <i class="pi pi-tag mr-2"></i>
                                        <span class="font-semibold">{{ deviceDetails.data.category }}</span>
                                    </div>
                                </div>
                                <div
                                    class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                                    <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">${{
                                        deviceDetails.data.price }}</span>
                                    <Button icon="pi pi-shopping-cart" label="Add to Cart"
                                        :disabled="deviceDetails.data.inventoryStatus === 'OUTOFSTOCK'"
                                        class="mb-2"></Button>
                                    <span
                                        :class="'product-badge status-' + deviceDetails.data.inventoryStatus.toLowerCase()">{{
                                            deviceDetails.data.inventoryStatus }}</span>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template #grid="deviceDetails">
                        <div class="col-12 md:col-4">
                            <div class="card m-3 border-1 surface-border">
                                <div class="flex align-items-center justify-content-between">
                                    <div class="flex align-items-center">
                                        <i class="pi pi-tag mr-2"></i>
                                        <span class="font-semibold">
                                            {{ deviceDetails.data.tag.length > 10? deviceDetails.data.tag.substring(0, 10) + '...' : deviceDetails.data.tag }}
                                        </span>
                                    </div>
                                    <span class="yellow-100">
                                        {{ deviceDetails.data.online === true ? 'ONLINE' : 'OFFLINE'}}
                                        </span>
                                </div>
                                <div class="text-center">
                                    <!-- <img :src="'demo/images/product/' + deviceDetails.data.image" -->
                                        <!-- :alt="deviceDetails.data.id" class="w-9 shadow-2 my-3 mx-0" /> -->
                                    <div class="text-2xl font-bold">{{ deviceDetails.data.id }}</div>
                                    <div class="mb-3">{{ deviceDetails.data.description }}</div>
                                    <!-- <Rating :modelValue="deviceDetails.data.rating" :readonly="true" :cancel="false">
                                    </Rating> -->
                                </div>
                                <div class="flex align-items-center justify-content-between">
                                    <span class="text-2xl font-semibold">${{ deviceDetails.data.price }}</span>
                                    <Button icon="pi pi-shopping-cart"></Button>
                                </div>
                            </div>
                        </div>
                    </template>
                </DataView>
            </div>
        </div>
</div></template>