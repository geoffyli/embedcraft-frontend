<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref, onBeforeMount } from "vue";
import { quotaUrl } from "@/api/APIUrls";

const toast = useToast();

const quotaName = ref(null);
const quotaTable = ref(null);
const loading = ref(false);
const visible = ref(false);

const modifyingId = ref(null);
const modifyingName = ref(null);
const modifyingUnit = ref(null);
const modifyingSubject = ref(null);
const modifyingValueKey = ref(null);
const modifyingValueType = ref(null);
const modifyingSnKey = ref(null);
const modifyingReferenceValue = ref(null);

const name = ref(null);
const unit = ref(null);
const subject = ref(null);
const valueKey = ref(null);
const valueType = ref(null);
const snKey = ref(null);
const referenceValue = ref(null);

let selected = ref(null);

const addQuota = () => {
  if (
    name.value == null ||
    unit.value == null ||
    subject.value == null ||
    valueKey.value == null ||
    valueType.value == null ||
    snKey.value == null ||
    referenceValue.value == null ||
    name.value == "" ||
    unit.value == "" ||
    subject.value == "" ||
    valueKey.value == "" ||
    valueType.value == "" ||
    snKey.value == "" ||
    referenceValue.value == ""
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
    url: quotaUrl,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    data: {
      name: name.value,
      unit: unit.value,
      subject: subject.value,
      valueKey: valueKey.value,
      valueType: valueType.value,
      referenceValue: referenceValue.value,
      webhook: null,
      snKey: snKey.value,
    },
  })
    .then((response) => {
      // Output the received response content
      console.log(response.data);
      getTableData(null);
      name.value = "";
      unit.value = "";
      subject.value = "";
      valueKey.value = "";
      valueType.value = "";
      snKey.value = "";
      referenceValue.value = "";
      toast.add({
        severity: "success",
        summary: "Success!",
        detail: "Add quota successfully!",
        life: 3000,
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const getTableData = (quotaName) => {
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

const searchTableData = () => {
  loading.value = true;
  getTableData(quotaName.value);
  loading.value = false;
};

const deleteQuota = () => {
  let success = true;
  // Traverse the selected rows.
  for (let key in selected["_value"]) {
    let quotaId = selected["_value"][key]["id"];
    let token = localStorage.getItem("token");
    axios({
      method: "delete",
      url: quotaUrl + "/" + quotaId,
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
      detail: "Delete quota successfully!",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "Error",
      summary: "Error!",
      detail: "Something went wrong!",
      life: 3000,
    });
  }
};

onBeforeMount(() => {
  getTableData(null);
});

const modify = (data) => {
  visible.value = true;
  modifyingId.value = data.id;
  modifyingName.value = data.name;
  modifyingUnit.value = data.unit;
  modifyingSubject.value = data.subject;
  modifyingValueKey.value = data.valueKey;
  modifyingValueType.value = data.valueType;
  modifyingSnKey.value = data.snKey;
  modifyingReferenceValue.value = data.referenceValue;
};

const modifyRow = () => {
  let success = true;
  visible.value = false;
  // Send request to modify the row.
  let token = localStorage.getItem("token");
  axios({
    method: "put",
    url: quotaUrl,
    headers: {
      Authorization: `${token}`,
    },
    data: {
      id: modifyingId.value,
      name: modifyingName.value,
      unit: modifyingUnit.value,
      subject: modifyingSubject.value,
      valueKey: modifyingValueKey.value,
      valueType: modifyingValueType.value,
      snKey: modifyingSnKey.value,
      webhook: null,
      referenceValue: modifyingReferenceValue.value,
    },
  })
    .then(() => {
      for (let i = 0; i < quotaTable.value.length; i++) {
        if (quotaTable.value[i].id == modifyingId.value) {
          quotaTable.value[i].name = modifyingName.value;
          quotaTable.value[i].unit = modifyingUnit.value;
          quotaTable.value[i].subject = modifyingSubject.value;
          quotaTable.value[i].valueKey = modifyingValueKey.value;
          quotaTable.value[i].valueType = modifyingValueType.value;
          quotaTable.value[i].snKey = modifyingSnKey.value;
          quotaTable.value[i].referenceValue = modifyingReferenceValue.value;
        }
      }
    })
    .catch((error) => {
      // Handle the error
      console.log("Error:", error);
      success = false;
    });
  if (success) {
    toast.add({
      severity: "success",
      summary: "Success Message",
      detail: "Modify successfully!",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error Message",
      detail: "Something went wrong!",
      life: 3000,
    });
  }
};
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Header"
    :style="{ width: '50vw' }"
  >
    <div class="card p-fluid">
      <div class="field">
        <label for="modifyingName">Quota Name</label>
        <InputText id="modifyingName" type="text" v-model="modifyingName" />
      </div>
      <div class="field">
        <label for="modifyingUnit">Unit</label>
        <InputText id="modifyingUnit" type="text" v-model="modifyingUnit" />
      </div>
      <div class="field">
        <label for="modifyingSubject">Subject</label>
        <InputText
          id="modifyingSubject"
          type="text"
          v-model="modifyingSubject"
        />
      </div>
      <div class="field">
        <label for="modifyingValueKey">Value Key</label>
        <InputText
          id="modifyingValueKey"
          type="text"
          v-model="modifyingValueKey"
        />
      </div>
      <div class="field">
        <label for="modifyingValueType">Value Type</label>
        <InputText
          id="modifyingValueType"
          type="text"
          v-model="modifyingValueType"
        />
      </div>
      <div class="field">
        <label for="modifyingSnKey">Device Indentification Key</label>
        <InputText id="modifyingSnKey" type="text" v-model="modifyingSnKey" />
      </div>
      <div class="field">
        <label for="modifyingReferenceValue">referenceValue</label>
        <InputText
          id="modifyingReferenceValue"
          type="text"
          v-model="modifyingReferenceValue"
        />
      </div>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="visible = false" text />
      <Button label="Yes" icon="pi pi-check" @click="modifyRow" autofocus />
    </template>
  </Dialog>

  <div class="grid">
    <div class="col-12">
      <div class="card p-fluid">
        <h5>Add Quota</h5>
        <!-- Create a form -->
        <form>
          <div class="field">
            <label for="name">Quota Name</label>
            <InputText id="name" type="text" v-model="name" />
          </div>
          <div class="field">
            <label for="unit">Quota Unit</label>
            <InputText id="unit" type="text" v-model="unit" />
          </div>
          <div class="field">
            <label for="subject">Subject</label>
            <InputText id="subject" type="text" v-model="subject" />
          </div>
          <div class="field">
            <label for="valuekey">Value Key</label>
            <InputText id="valuekey" type="text" v-model="valueKey" />
          </div>
          <div class="field">
            <label for="valuetype">Value Type</label>
            <InputText id="valuetype" type="text" v-model="valueType" />
          </div>
          <div class="field">
            <label for="snkey">Device Indentification Key</label>
            <InputText id="snkey" type="text" v-model="snKey" />
          </div>
          <div class="field">
            <label for="referencevalue">Reference Value</label>
            <InputText
              id="referencevalue"
              type="text"
              v-model="referenceValue"
            />
          </div>
          <div>
            <Button
              label="Submit"
              class="mr-2 mb-2 mt-2"
              @click="addQuota"
            ></Button>
          </div>
        </form>
        <Toast />
      </div>

      <div class="card">
        <h5>Quota List</h5>
        <div class="grid p-fluid mt-3">
          <div class="field col-12 md:col-8">
            <span class="p-float-label">
              <InputText type="text" id="inputtext" v-model="quotaName" />
              <label for="inputtext">Quota Name</label>
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
              @click="deleteQuota"
            />
          </div>
        </div>

        <DataTable
          v-model:selection="selected"
          :value="quotaTable"
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
          <Column header="Edit" style="min-width: 1rem">
            <template #body="{ data }">
              <Button
                label="Modify"
                class="p-button-outlined p-button-info w-full"
                @click="modify(data)"
              />
            </template>
          </Column>
          <Column header="Name" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
          </Column>
          <Column header="Unit" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.unit }}
            </template>
          </Column>
          <Column header="Subject" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.subject }}
            </template>
          </Column>
          <Column header="Value Key" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.valueKey }}
            </template>
          </Column>
          <Column header="Value Type" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.valueType }}
            </template>
          </Column>
          <Column header="Device ID Key" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.snKey }}
            </template>
          </Column>
          <Column header="Reference Value" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.referenceValue }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
