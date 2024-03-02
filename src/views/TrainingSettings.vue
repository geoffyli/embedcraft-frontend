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
const tag = ref(null);
const minCount = ref(null);
const vectorSize = ref(null);
const windowSize = ref(null);
const epochs = ref(null);

const dropdownValues = ref([
  { name: "Word2Vec", code: "w2v" },
  { name: "FastText", code: "ft" },
]);
const dropdownValue = ref(null);

let selected = ref(null);

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

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
  <div class="grid">
    <div class="col-12">
      <div class="card p-fluid">
        <h5>Customized Settings for Training</h5>
        <!-- Create a form -->
        <form>
          <div class="field">
            <label for="name">Name</label>
            <InputText id="name" type="text" v-model="name" />
          </div>
          <div class="field">
            <label for="tag">Tag</label>
            <InputText id="tag" type="text" v-model="tag" />
          </div>
          <div class="field">
            <label for="algorithm">Algorithm</label>
            <Dropdown
              id="algorithm"
              v-model="dropdownValue"
              :options="dropdownValues"
              optionLabel="name"
              placeholder="Select"
            />
          </div>
          <div class="field">
            <label for="minCount">Minimal Count</label>
            <InputText id="minCount" type="number" v-model="minCount" />
          </div>
          <div class="field">
            <label for="vectorSize">Vector Size</label>
            <InputText id="vectorSize" type="number" v-model="vectorSize" />
          </div>
          <div class="field">
            <label for="windowSize">Window Size</label>
            <InputText id="windowSize" type="number" v-model="windowSize" />
          </div>
          <div class="field">
            <label for="epochs">Epochs</label>
            <InputText id="epochs" type="number" v-model="epochs" />
          </div>
          <div class="field">
            <label for="dataset">Upload Dataset</label>
            <FileUpload id="dataset" @uploader="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000" customUpload />

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
    </div>
  </div>
</template>
