<script setup>
import axios from "axios";
import ProgressSpinner from "primevue/progressspinner";
import { useToast } from "primevue/usetoast";
import { ref, onBeforeMount } from "vue";
import { trainUrl, uploadUrl, statusUrl } from "@/api/APIUrls";
import { useRouter } from "vue-router";
import { trainingSettingsFlag } from "@/utils/globals";

// Use Vue router
const router = useRouter();
// Use Vue toast
const toast = useToast();

// Define training argument variables
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

/**
 * This function uploads the dataset file to the Spring Boot application.
 * @param {*} event upload event
 */
const uploader = (event) => {
  const files = event.files; // Get the selected files
  const formData = new FormData();
  // Append files to formData
  files.forEach((file) => {
    formData.append("file", file, file.name);
  });
  // Get token
  const token = localStorage.getItem("token");
  // Add the info toast
  toast.add({
    severity: "info",
    summary: "Uploading!",
    detail: "Dataset uploading!",
    life: 3000,
  });
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
      console.log("Dataset file upload success!");
      // Store the dataset file path on the cloud
      localStorage.setItem("blobName", response.data["blobName"]);
      // Add a success toast
      toast.add({
        severity: "success",
        summary: "Success!",
        detail: "Dataset upload success!",
        life: 3000,
      });
    })
    .catch((error) => {
      // Handle any errors that occur during the upload
      console.error("Dataset file upload failed.", error);
      // Add any error toasts or messages here
      toast.add({
        severity: "error",
        summary: "Dataset upload failed!",
        life: 3000,
      });
    });
};

/**
 * Submit the training setting arguments to the Spring Boot application
 * Once the submission has been successful, it keeps querying the status of the training task
 */
const submitTrainingSettings = () => {
  /*
  Check the validity of the form data
  */
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
      detail: "Please fill all the fields",
      life: 3000,
    });
    return;
  }
  /*
  Get the token and blob name from the local storage
  */
  let token = localStorage.getItem("token");
  let blobName = localStorage.getItem("blobName");
  if (blobName == null) {
    toast.add({
      severity: "error",
      summary: "Dataset Not Found!",
      detail: "Please upload dataset file first!",
      life: 3000,
    });
    return;
  }
  /*
  Send post request
  */
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
      algorithm: dropdownValue.value.name,
      minCount: minCount.value,
      vectorSize: vectorSize.value,
      windowSize: windowSize.value,
      epochs: epochs.value,
      blobName: blobName,
    },
  })
    .then((response) => {
      // Empty the fields of the form
      name.value = "";
      tag.value = "";
      dropdownValue.value = "";
      minCount.value = "";
      vectorSize.value = "";
      windowSize.value = "";
      epochs.value = "";
      // Add the success toast
      toast.add({
        severity: "success",
        summary: "Success!",
        detail: "Training in progress!",
        life: 3000,
      });
      // Remove the dataset file path in the localStorage
      localStorage.removeItem("blobName");
      // Save the task id in the local Storage
      localStorage.setItem("taskId", response.data.taskId);
      console.log("Task ID saved!");
      // Set flag value
      trainingSettingsFlag.value = false;
      // Keeping querying the status
      checkTrainingStatus();
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
};

/**
 * Query the status of the training task
 */
const checkTrainingStatus = () => {
  axios({
    method: "get",
    url: `${statusUrl}?taskId=${localStorage.getItem(
      "taskId"
    )}&userId=${localStorage.getItem("userId")}`,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // Check if the status is 1 (completed)
      if (response.data.status === 1) {
        console.log("Training completed!");
        // Set the flag
        trainingSettingsFlag.value = true;
        // Redirect to the model detail page
        router.push("/main/modelDetail");
      } else {
        // The task is still in progress
        console.log("Training in progress");
        setTimeout(checkTrainingStatus, 3000);
      }
    })
    .catch((error) => {
      // Log errors and clear the interval
      console.error("Error checking training status", error);
      // Set the flag
      trainingSettingsFlag.value = true;
      // Show the error toast
      toast.add({
        severity: "error",
        summary: "Error!",
        detail: "Error checking training status!",
        life: 3000,
      });
    });
};
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <Toast />
      <!-- Training settings card -->
      <div class="card p-fluid" v-if="trainingSettingsFlag">
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
              :maxFileSize="1000000000"
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
      </div>
      <!-- Training in progress card -->
      <div
        class="card p-fluid"
        v-if="!trainingSettingsFlag"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80vh;
        "
      >
        <ProgressSpinner
          style="width: 150px; height: 150px"
          strokeWidth="2"
          animationDuration=".8s"
          aria-label="Custom ProgressSpinner"
        />
      </div>
    </div>
  </div>
</template>
