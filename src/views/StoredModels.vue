<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { queryModelListUrl } from "@/api/APIUrls";

// Use Vue router
const router = useRouter();

const toast = useToast();

const modelTable = ref(null);
const loading = ref(false);
const visible = ref(false);

const modifyingId = ref(null);
const modifyingtags = ref(null);

let selected = ref(null);
const name = ref(null);
const tag = ref(null);

const getTableData = (name, tag) => {
  if (name == null || name === "")
    name = "none"
  if (tag == null || tag === "")
    tag = "none"
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  axios({
    method: "get",
    url: `${queryModelListUrl}?userId=${userId}&name=${name}&tag=${tag}`,
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      // Output the received response content
      modelTable.value = response.data["models"];
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

// const searchTableData = () => {
//     loading.value = true;
//     getTableData(id.value, tag.value);

//     loading.value = false;
// };

onBeforeMount(() => {
  getTableData(null, null);
});

// onMounted(() => {
//   setDatabase();
// });

const check = (data) => {
  localStorage.setItem("modelId", data.modelId)
  // Redirect to the model detail page
  router.push("/main/modelDetail");
};

const searchTableData = () => {
  loading.value = true;
  getTableData(name.value, tag.value);

  loading.value = false;
};
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
            <Button
              type="button"
              label="Search"
              icon="pi pi-search"
              iconPos="right"
              :loading="loading"
              @click="searchTableData"
            />
          </div>
        </div>

        <DataTable
          v-model:selection="selected"
          :value="modelTable"
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
          <Column header="Algorithm" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.algorithm }}
            </template>
          </Column>
          <Column header="Training Time" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.trainingTime }}
            </template>
          </Column>
          <Column header="Dimension" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.vectorSize }}
            </template>
          </Column>
          <Column header="Size" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.vocabularySize }}
            </template>
          </Column>
          <Column header="Epochs" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.epochs }}
            </template>
          </Column>
          <Column header="Details" style="min-width: 1rem">
            <template #body="{ data }">
              <Button
                label="Check"
                class="p-button-outlined p-button-info w-full"
                @click="check(data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
