<script setup>
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { ref, onBeforeMount, onMounted } from 'vue';

const toast = useToast();

const deviceTable = ref(null);
const loading = ref(false);
const visible = ref(false);

const modifyingId = ref(null);
const modifyingtags = ref(null);

let selected = ref(null);
const storedEmbeddingsTable = ref(null);
const name = ref(null);
const tag = ref(null);


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
const setDatabase = () => {
  storedEmbeddingsTable.value = [
    {
      'name' : 'A',
      'tag' : 'Technology',
      'time' : '02/25/2024 01:32PM',
      'dimension' : 300,
      'size' : '130MB',
      'vocsize' : 35258,
    },
    {
      'name' : 'B',
      'tag' : 'Psychology',
      'time' : '02/22/2024 10:11PM',
      'dimension' : 450,
      'size' : '330MB',
      'vocsize' : 85731,
    },
    {
      'name' : 'C',
      'tag' : 'Politics',
      'time' : '03/01/2024 07:46PM',
      'dimension' : 150,
      'size' : '40MB',
      'vocsize' : 14289,
    },
  ]
}

// const searchTableData = () => {
//     loading.value = true;
//     getTableData(id.value, tag.value);

//     loading.value = false;
// };

onBeforeMount(() => {
    // getTableData(null, null);
});

onMounted(() =>{
    setDatabase();
})

const modify = (data) => {
    visible.value = true;
    modifyingId.value = data.deviceId;
    modifyingtags.value = data.tag;
}

const searchTableData = () => {
    loading.value = true;
    // getTableData(id.value, tag.value);

    loading.value = false;
};

// const modifyRow = () => {
//     visible.value = false;
//     // Send request to modify the row.
//     let token = localStorage.getItem('token')
//     axios({
//         method: 'put',
//         url: setDeviceTagsUrl,
//         headers: {
//             Authorization: `${token}`
//         },
//         data: {
//             'sn': modifyingId.value,
//             'tags': modifyingtags.value,
//         }
//     })
//         .then((responses) => {
//             for (let i = 0; i < deviceTable.value.length; i++) {
//                 if (deviceTable.value[i].deviceId == modifyingId.value) {
//                     deviceTable.value[i].tag = modifyingtags.value;
//                 }
//             }
//             toast.add({ severity: 'success', summary: 'Success Message', detail: 'Modify successfully!', life: 3000 });
//         }).catch((error) => {
//             
//             console.log('Error:', error);
//         });
// }

</script>

<template>
    <Toast />
    <div class="grid">
        <div class="col-12 xl:col-12">
      <div class="card">
        <h5>Stored Word Embeddings</h5>
                <div class="grid p-fluid mt-3">
                    <div class="field col-12 md:col-5">
                        <span class="p-float-label">
                            <InputText type="text" id="inputName" v-model="name" />
                            <label for="inputName">Name</label>
                        </span>
                    </div>
                    <div class="field col-12 md:col-5">
                        <span class="p-float-label">
                            <InputText type="text" id="inputTag" v-model="tag" />
                            <label for="inputTag">Tag</label>
                        </span>
                    </div>
                    <div class="field col-12 md:col-2">
                        <Button type="button" label="Search" icon="pi pi-search" iconPos="right" :loading="loading"
                            @click="searchTableData" />
                    </div>
                </div>

        <DataTable
          v-model:selection="selected"
          :value="storedEmbeddingsTable"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          responsiveLayout="scroll"
          stripedRows
        >
          <template #empty> No records found. </template>
          <template #loading> Loading devices data... Please wait. </template>
          <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
          <Column header="Name" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
          </Column>
          <Column header="Tag" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.tag }}
            </template>
          </Column>
          <Column header="Time" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.time }}
            </template>
          </Column>
          <Column header="Dimension" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.dimension }}
            </template>
          </Column>
          <Column header="Size" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.size }}
            </template>
          </Column>
          <Column header="Vocabulary Size" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.vocsize }}
            </template>
          </Column>
          <Column header="Details" style="min-width: 1rem">
            <template #body="{ data }">
              <Button
                label="Check"
                class="p-button-outlined p-button-info w-full"
                @click="modify(data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    </div>
</template>