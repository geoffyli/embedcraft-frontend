<script setup>
import axios from 'axios';
import { ref, onBeforeMount } from 'vue';
import { alarmLogUrl } from '@/api/APIUrls';

const name = ref(null);
const id = ref(null);
const startDate = ref(null);
const endDate = ref(null);
const alarmLog = ref(null);
const loading1 = ref(null);

const loading = ref(false);

const getTableData = (name, id, start, end) => {
    let token = localStorage.getItem('token')
    axios({
        method: 'get',
        url: alarmLogUrl,
        headers: {
            Authorization: `${token}`
        },
        params: {
            'page': 1,
            'pageSize': 1000,
            'alarmName': name,
            'deviceId': id,
            'start': start,
            'end': end,
        }
    })
        .then(response => {
            // Output the received response content
            alarmLog.value = response.data['items'];
        })
        .catch(error => {
            console.log('Error:', error);
        });
};

const convertDate = (date) => {
    if (date == null || date == '') return null;
    let newDate = new Date(date);

    let year = newDate.getFullYear();
    let month = ('0' + (newDate.getMonth() + 1)).slice(-2); // Months are 0 based in JS so add 1 and pad with leading zero if needed
    let day = ('0' + newDate.getDate()).slice(-2); // pad with leading zero if needed
    let hours = ('0' + newDate.getHours()).slice(-2); // pad with leading zero if needed
    let minutes = ('0' + newDate.getMinutes()).slice(-2); // pad with leading zero if needed
    let seconds = ('0' + newDate.getSeconds()).slice(-2); // pad with leading zero if needed

    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

const searchTableData = () => {
    loading.value = true;
    startDate.value = convertDate(startDate.value);
    endDate.value = convertDate(endDate.value);
    getTableData(name.value, id.value, startDate.value, endDate.value);

    loading.value = false;
};

onBeforeMount(() => {
    getTableData(null, null, null, null);
});

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Search</h5>
                <div class="grid p-fluid mt-3">
                    <div class="field col-12 md:col-6">
                        <span class="p-float-label">
                            <InputText type="text" id="inputtext" v-model="name" />
                            <label for="inputtext">Alarm Name</label>
                        </span>
                    </div>
                    <div class="field col-12 md:col-6">
                        <span class="p-float-label">
                            <InputText type="text" id="inputtext" v-model="id" />
                            <label for="inputtext">Device ID</label>
                        </span>
                    </div>
                    <div class="field col-12 md:col-4">
                        <span class="p-float-label">
                            <Calendar inputId="calendar" v-model="startDate"></Calendar>
                            <label for="calendar">Start Date</label>
                        </span>
                    </div>
                    <div class="field col-12 md:col-4">
                        <span class="p-float-label">
                            <Calendar inputId="calendar" v-model="endDate"></Calendar>
                            <label for="calendar">End Date</label>
                        </span>
                    </div>
                    <div class="field col-12 md:col-4">
                        <Button type="button" class="" label="Search" icon="pi pi-search" iconPos="right" :loading="loading"
                            @click="searchTableData" />
                    </div>
                </div>


                <h5>Alarm Log</h5>
                <DataTable :value="alarmLog" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" :loading="loading1" responsiveLayout="scroll" stripedRows>

                    <template #empty> No records found. </template>
                    <template #loading> Loading alarm data... Please wait. </template>
                    <Column header="Device ID" style="min-width: 8rem">
                        <template #body="{ data }">
                            {{ data.deviceId }}
                        </template>
                    </Column>
                    <Column header="Alarm Time" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.time }}
                        </template>
                    </Column>
                    <Column header="Alarm Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.alarmName }}
                        </template>
                    </Column>
                    <Column header="Alarm Level" style="min-width: 8rem">
                        <template #body="{ data }">
                            {{ data.level == 1 ? 'Minor' : 'Severe' }}
                        </template>
                    </Column>
                    <Column header="Alarm Quota" style="min-width: 8rem">
                        <template #body="{ data }">
                            {{ data.quotaName }}
                        </template>
                    </Column>
                    <Column header="Alarm Value" style="min-width: 8rem">
                        <template #body="{ data }">
                            {{ data.stringValue }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>