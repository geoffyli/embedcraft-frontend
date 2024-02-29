<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref, onBeforeMount } from "vue";
import { alarmUrl, quotaUrl } from "@/api/APIUrls";

const toast = useToast();

const quotaName = ref(null);

const name = ref(null);
const quotaId = ref(null);
const quotaTable = ref(null);
const alarmTable = ref(null);
const loading = ref(false);

const searchQuotaId = ref(null);

const alarmName = ref(null);
const operator = ref(null);
const threshold = ref(null);
const level = ref(null);
const cycle = ref(null);

let selected = ref(null);

const addAlarm = () => {
  if (
    name.value == null ||
    quotaId.value == null ||
    operator.value == null ||
    threshold.value == null ||
    level.value == null ||
    cycle.value == null ||
    name.value == "" ||
    quotaId.value == "" ||
    operator.value == "" ||
    threshold.value == "" ||
    level.value == "" ||
    cycle.value == ""
  ) {
    toast.add({
      severity: "error",
      summary: "Invalid Content!",
      detail: "Please fill all fields",
      life: 3000,
    });
    return;
  }

  let token = localStorage.getItem("token");
  axios({
    method: "post",
    url: alarmUrl,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    data: {
      name: name.value,
      quotaId: quotaId.value,
      operator: operator.value,
      threshold: threshold.value,
      level: level.value,
      cycle: cycle.value,
      webhook: null,
    },
  })
    .then((response) => {
      // Output the received response content
      console.log(response.data);
      getTableData(null);
      name.value = "";
      quotaId.value = "";
      operator.value = "";
      threshold.value = "";
      level.value = "";
      cycle.value = "";
      toast.add({
        severity: "success",
        summary: "Success!",
        detail: "Add alarm record successfully!",
        life: 3000,
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const getQuotaData = (quotaName) => {
  let token = localStorage.getItem("token");
  axios({
    method: "get",
    url: quotaUrl,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    params: {
      page: 1,
      pageSize: 1000,
      quotaName: quotaName,
    },
  })
    .then((response) => {
      // Output the received response content
      quotaTable.value = response.data["items"];
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const getTableData = (alarmName, searchQuotaId) => {
  let token = localStorage.getItem("token");
  axios({
    method: "get",
    url: alarmUrl,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    params: {
      page: 1,
      pageSize: 1000,
      name: alarmName,
      quotaId: searchQuotaId,
    },
  })
    .then((response) => {
      // Output the received response content
      alarmTable.value = response.data["items"];
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const searchTableData = () => {
  loading.value = true;
  getTableData(alarmName.value, searchQuotaId.value);
  loading.value = false;
};

const searchQuota = () => {
  getQuotaData(quotaName.value);
};

const deleteAlarm = () => {
  let success = true;
  // Traverse the selected rows.
  for (let key in selected["_value"]) {
    let alarmId = selected["_value"][key]["id"];
    let token = localStorage.getItem("token");
    axios({
      method: "delete",
      url: alarmUrl + "/" + alarmId,
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // Output the received response content
        console.log(response.data);
        getTableData(null);
      })
      .catch((error) => {
        console.log("Error:", error);
        success = false;
      });
  }
  if (success) {
    toast.add({
      severity: "success",
      summary: "Success!",
      detail: "Delete alarm successfully!",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error!",
      detail: "Delete alarm failed!",
      life: 3000,
    });
  }
};

onBeforeMount(() => {
  getTableData(null, null);
  getQuotaData(null);
});
</script>

<template>
  <div class="grid">
    <div class="col-6">
      <div class="card p-fluid">
        <h5>Quota List</h5>
        <div class="grid p-fluid mt-3">
          <div class="field col-12 md:col-8">
            <span class="p-float-label">
              <InputText type="text" id="inputtext" v-model="quotaName" />
              <label for="inputtext">Quota Name</label>
            </span>
          </div>
          <div class="field col-12 md:col-4">
            <Button
              type="button"
              class=""
              label="Search"
              icon="pi pi-search"
              iconPos="right"
              :loading="loading"
              @click="searchQuota"
            />
          </div>
        </div>

        <DataTable
          :value="quotaTable"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="6"
          dataKey="id"
          :rowHover="true"
          responsiveLayout="scroll"
          stripedRows
        >
          <template #empty> No records found. </template>
          <template #loading> Loading devices data... Please wait. </template>

          <Column header="ID" style="min-width: 4rem">
            <template #body="{ data }">
              {{ data.id }}
            </template>
          </Column>
          <Column header="Name" style="min-width: 4rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
          </Column>
          <Column header="Unit" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.unit }}
            </template>
          </Column>
          <Column header="Subject" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.subject }}
            </template>
          </Column>
          <Column header="Value Key" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.valueKey }}
            </template>
          </Column>
          <Column header="Value Type" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.valueType }}
            </template>
          </Column>
          <Column header="Device Id Key" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.snKey }}
            </template>
          </Column>
          <Column header="Reference Value" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.referenceValue }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="col-6">
      <div class="card p-fluid">
        <h5>Add Alarm</h5>
        <!-- Create a form -->
        <form>
          <div class="field">
            <label for="name">Alarm Name</label>
            <InputText id="name" type="text" v-model="name" />
          </div>
          <div class="field">
            <label for="id">Quota Id</label>
            <InputText id="id" type="text" v-model="quotaId" />
          </div>
          <div class="field">
            <label for="operator">Operator</label>
            <InputText id="operator" type="text" v-model="operator" />
          </div>
          <div class="field">
            <label for="threshold">Threshold</label>
            <InputText id="threshold" type="text" v-model="threshold" />
          </div>
          <div class="field">
            <label for="level">Level</label>
            <InputText id="level" type="text" v-model="level" />
          </div>
          <div class="field">
            <label for="cycle">Slience Cycle (min)</label>
            <InputText id="cycle" type="text" v-model="cycle" />
          </div>
          <div>
            <Button
              label="Submit"
              class="mr-2 mb-2 mt-2"
              @click="addAlarm"
            ></Button>
          </div>
        </form>
        <Toast />
      </div>
    </div>
    <div class="col-12">
      <div class="card">
        <h5>Alarm Record List</h5>
        <div class="grid p-fluid mt-3">
          <div class="field col-12 md:col-4">
            <span class="p-float-label">
              <InputText type="text" id="inputtext" v-model="alarmName" />
              <label for="inputtext">Alarm Name</label>
            </span>
          </div>
          <div class="field col-12 md:col-4">
            <span class="p-float-label">
              <InputText type="text" id="inputtext" v-model="searchQuotaId" />
              <label for="inputtext">Quota Id</label>
            </span>
          </div>
          <div class="field col-12 md:col-2">
            <Button
              type="button"
              class=""
              label="Search"
              icon="pi pi-search"
              iconPos="right"
              :loading="loading"
              @click="searchTableData"
            />
          </div>
          <div class="field col-12 md:col-2">
            <Button
              label="Delete"
              :disabled="selected === null ? true : selected.length === 0"
              disabled
              class="p-button-danger mr-2 mb-2"
              @click="deleteAlarm"
            />
          </div>
        </div>

        <DataTable
          v-model:selection="selected"
          :value="alarmTable"
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
          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

          <!-- <Column header="ID" style="min-width: 4rem">
            <template #body="{ data }">
              {{ data.id }}
            </template>
          </Column> -->
          <Column header="Name" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
          </Column>
          <Column header="Quota ID" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.quotaId }}
            </template>
          </Column>
          <Column header="Quota Name" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.quota.name }}
            </template>
          </Column>
          <Column header="Operator" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.operator }}
            </template>
          </Column>
          <Column header="Threshold" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.threshold }}
            </template>
          </Column>
          <Column header="Level" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.level }}
            </template>
          </Column>
          <Column header="Cycle" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.cycle }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
