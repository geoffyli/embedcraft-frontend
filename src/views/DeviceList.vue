<script setup>
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { ref, onBeforeMount } from 'vue';
import { deviceUrl, setDeviceTagsUrl } from '@/api/APIUrls';

const toast = useToast();

const id = ref(null);
const tag = ref(null);
const deviceTable = ref(null);
const loading = ref(false);
const visible = ref(false);

const modifyingId = ref(null);
const modifyingtags = ref(null);

const getTableData = (sn, tag) => {
    let token = localStorage.getItem('token')
    axios({
        method: 'get',
        url: deviceUrl,
        headers: {
            Authorization: `${token}`
        },
        params: {
            'page': 1,
            'pageSize': 1000,
            'sn': sn,
            'tag': tag,
        }
    })
        .then(response => {
            // Output the received response content
            deviceTable.value = response.data['items'];
        })
        .catch(error => {
            console.log('Error:', error);
        });
};

const searchTableData = () => {
    loading.value = true;
    getTableData(id.value, tag.value);

    loading.value = false;
};

onBeforeMount(() => {
    getTableData(null, null);
});

const modify = (data) => {
    visible.value = true;
    modifyingId.value = data.deviceId;
    modifyingtags.value = data.tag;
}

const modifyRow = () => {
    visible.value = false;
    // Send request to modify the row.
    let token = localStorage.getItem('token')
    axios({
        method: 'put',
        url: setDeviceTagsUrl,
        headers: {
            Authorization: `${token}`
        },
        data: {
            'sn': modifyingId.value,
            'tags': modifyingtags.value,
        }
    })
        .then((responses) => {
            for (let i = 0; i < deviceTable.value.length; i++) {
                if (deviceTable.value[i].deviceId == modifyingId.value) {
                    deviceTable.value[i].tag = modifyingtags.value;
                }
            }
            toast.add({ severity: 'success', summary: 'Success Message', detail: 'Modify successfully!', life: 3000 });
        }).catch((error) => {
            // Handle the error
            console.log('Error:', error);
        });
}

</script>

<template>
    <Toast />
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Search</h5>
                <div class="grid p-fluid mt-3">
                    <div class="field col-12 md:col-6">
                        <span class="p-float-label">
                            <InputText type="text" id="inputtext" v-model="id" />
                            <label for="inputtext">Device ID</label>
                        </span>
                    </div>
                    <div class="field col-12 md:col-6">
                        <span class="p-float-label">
                            <InputText type="text" id="inputtext" v-model="tag" />
                            <label for="inputtext">Tag</label>
                        </span>
                    </div>
                    <div class="field col-12 md:col-6">
                        <Button type="button" class="" label="Search" icon="pi pi-search" iconPos="right" :loading="loading"
                            @click="searchTableData" />
                    </div>
                </div>

                <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }">
                    <div class="card p-fluid">
                        <div class="field">
                            <label for="status">Device Tags</label>
                            <InputText id="status" type="select" v-model="modifyingtags" />
                        </div>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="visible = false" text />
                        <Button label="Yes" icon="pi pi-check" @click="modifyRow" autofocus />
                    </template>
                </Dialog>

                <h5>Device List</h5>
                <DataTable :value="deviceTable" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" responsiveLayout="scroll" stripedRows>

                    <template #empty> No records found. </template>
                    <template #loading> Loading devices data... Please wait. </template>
                    <Column header="Edit" style="min-width: 1rem">
                        <template #body="{ data }">
                            <Button label="Modify" class="p-button-outlined p-button-info w-full" @click="modify(data)" />
                        </template>
                    </Column>
                    <Column header="ID" style="min-width: 6rem">
                        <template #body="{ data }">
                            {{ data.deviceId }}
                        </template>
                    </Column>
                    <Column header="Alarm" style="min-width: 6rem">
                        <template #body="{ data }">
                            {{ data.alarm ? 'Yes' : 'No' }}
                        </template>
                    </Column>
                    <Column header="Online" style="min-width: 6rem">
                        <template #body="{ data }">
                            {{ data.online ? "Online" : "Offline" }}
                        </template>
                    </Column>
                    <Column header="Status" style="min-width: 8rem">
                        <template #body="{ data }">
                            {{ data.status ? "In Use" : "Off Use" }}
                        </template>
                    </Column>
                    <Column header="Tags" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.tag }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>