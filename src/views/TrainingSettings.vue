<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref, onBeforeMount } from "vue";
import { trainUrl, uploadUrl } from "@/api/APIUrls";

const toast = useToast();

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

const uploader = (event) => {
  const files = event.files; // Get the selected files
  const formData = new FormData();

  // Append files to formData
  files.forEach((file) => {
    formData.append("file", file, file.name);
  });

  // Get your custom token or other header values
  const token = localStorage.getItem("token"); // Replace with actual token retrieval logic

  // Send the request with Axios
  axios
    .post(uploadUrl, formData, {
      headers: {
        // Add your custom headers here
        Authorization: `${token}`,
        // Any other headers you need
      },
    })
    .then((response) => {
      // Handle the response from the server
      console.log("Upload successful");
      localStorage.setItem("filePath", response.data['filePath'])
      // Add any success toasts
      toast.add({
      severity: "success",
      summary: "Dataset upload success",
      life: 3000,
    });
    })
    .catch((error) => {
      // Handle any errors that occur during the upload
      console.error("Upload failed", error);
      // Add any error toasts or messages here
      toast.add({
      severity: "error",
      summary: "Dataset upload failed!",
      life: 3000,
    });
    });
};

const submitTrainingSettings = () => {
  if (
    name.value == null ||
    tag.value == null ||
    dropdownValue.value == null ||
    minCount.value == null ||
    vectorSize.value == null ||
    windowSize.value == null ||
    epochs.value == null
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
    url: trainUrl,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    data: {
      name: name.value,
      tag: tag.value,
      algorithm: dropdownValue.value,
      minCount: minCount.value,
      vectorSize: vectorSize.value,
      windowSize: windowSize.value,
      epochs: epochs.value,
      webhook: null,
    },
  })
    .then((response) => {
      // Output the received response content
      console.log(response.data);
      // getTableData(null);
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
        detail: "Training in progress!",
        life: 3000,
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
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
            <FileUpload
              name="dataset"
              :auto="false"
              :customUpload="true"
              @uploader="uploader"
              :multiple="false"
              accept=".txt"
              :maxFileSize="1000000"
            >
              <template #empty>
                <p>Drag and drop files to here to upload.</p>
              </template>
            </FileUpload>
          </div>
          <div>
            <Button
              label="Submit"
              class="mr-2 mb-2 mt-2"
              @click="submitTrainingSettings"
            ></Button>
          </div>
        </form>
        <Toast />
      </div>
    </div>
  </div>
</template>
