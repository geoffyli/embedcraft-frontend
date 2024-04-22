<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref, onBeforeMount } from "vue";
import { modelDetailPrepared } from "@/utils/globals";
import { modelDetailsUrl, searchSimilarWordUrl } from "@/api/APIUrls";

// Use prime vue toast
const toast = useToast();

// Define model detail variables
const windowSize = ref(null);
const trainingTime = ref(null);
const modelFilePath = ref(null);
const name = ref(null);
const minCount = ref(null);
const vocabularySize = ref(null);
const tag = ref(null);
const vectorSize = ref(null);
const epochs = ref(null);
const lossOverTime = ref(null);
const lossOverTimeLabels = ref(null);
const algorithm = ref(null);
// Define search box value model
const wordToSearch = ref(null);
// Define similar word list object
const similarWordList = ref(null);
const similarWords = ref(null);

const lossOverTimeData = ref(null);

const vocSizeOverTimeData = ref({
  labels: [1, 2, 3, 4, 5, 6, 7],
  datasets: [
    {
      label: "Vocabulary Size Over Time",
      data: [1352, 4565, 9483, 14867, 19736, 23785, 28563],
      fill: false,
      borderColor: "rgb(75, 102, 192)",
      tension: 0.1,
    },
  ],
});

// Define loading flag
const loading = ref(true);

const scatterData = ref({
  datasets: [
    {
      label: "Scatter Dataset",
      data: [],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
});

const scatterChartOptions = ref({
  plugins: {
    tooltip: {
      callbacks: {
        label: function (ctx) {
          // console.log(ctx);
          let label = ctx.dataset.labels[ctx.dataIndex];
          label += " (" + ctx.parsed.x + ", " + ctx.parsed.y + ")";
          return label;
        },
      },
    },
  },
});

const queryModelDetails = () => {
  /*
  Get the token and blob name from the local storage
  */
  let token = localStorage.getItem("token");
  let modelId = localStorage.getItem("taskId");
  if (modelId == null) {
    toast.add({
      severity: "error",
      summary: "Model Not Found!",
      detail: "Cannot get model details!",
      life: 3000,
    });
    return;
  }
  /*
  Send post request
  */
  axios({
    method: "get",
    url: `${modelDetailsUrl}?modelId=${modelId}`,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // Set the detail variables
      name.value = response.data.name;
      tag.value = response.data.tag;
      algorithm.value = response.data.algorithm;
      minCount.value = response.data.minCount;
      vectorSize.value = response.data.vectorSize;
      windowSize.value = response.data.windowSize;
      epochs.value = response.data.epochs;
      trainingTime.value = response.data.trainingTime;
      modelFilePath.value = response.data.modelFilePath;
      vocabularySize.value = response.data.vocabularySize;
      // Set loss over time chart values
      lossOverTime.value = response.data.lossOverTime;
      lossOverTimeLabels.value = Array.from(
        { length: lossOverTime.value.length },
        (_, index) => index + 1
      );
      lossOverTimeData.value = {
        labels: lossOverTimeLabels.value,
        datasets: [
          {
            label: "Loss Over Time",
            data: lossOverTime.value,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };

      // Save the task id in the local Storage
      // localStorage.setItem("taskId", response.data.taskId);
      console.log("Model details queried!");
      // Set flag value
      loading.value = false;
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

const convertToScatterDataPoints = (data) => {
  // Create an array from the object's values, transforming each entry to the {x, y} form
  return Object.values(data).map(([_, coordinates]) => {
    return {
      x: coordinates[0],
      y: coordinates[1],
    };
  });
};

function transformAndSort(data) {
  // Convert the object into an array of arrays
  const array = Object.entries(data).map(([word, [similarity, _]]) => {
    return [word, similarity];
  });

  // Sort the array by similarity score in descending order
  array.sort((a, b) => b[1] - a[1]);

  return array;
}

const searchSimilarWords = () => {
  /*
  Check the validity of the search box
  */
  if (wordToSearch.value == null || wordToSearch.value == "") {
    toast.add({
      severity: "error",
      summary: "Invalid Content!",
      detail: "Please enter the word to search!",
      life: 3000,
    });
    return;
  }
  /*
  Get the token and blob name from the local storage
  */
  let token = localStorage.getItem("token");
  let modelId = localStorage.getItem("taskId");
  /*
  Send the get request
  */
  axios({
    method: "get",
    url: `${searchSimilarWordUrl}?modelId=${modelId}&word=${wordToSearch.value}`,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // Set the detail variables
      /*
      {
  "message": "success",
  "similarWords": {
    "charger": [
      0.99988025,
      [
        -36.63813,
        -48.328716
      ]
    ],
    "works": [
      0.9999108,
      [
        28.071241,
        -18.342422
      ]
    ],
  }
}
      */
      similarWordList.value = response.data.similarWords;
      similarWords.value = transformAndSort(similarWordList.value).slice(0, 10)
      console.log(similarWords.value);
      // Set the scatter chart data
      scatterData.value = {
        datasets: [
          {
            label: "Similar Words",
            labels: Object.keys(similarWordList.value),
            data: convertToScatterDataPoints(similarWordList.value),
            backgroundColor: "rgb(255, 99, 132)",
          },
        ],
      };
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

onBeforeMount(() => {
  queryModelDetails();
});
</script>

<template>
  <Toast />
  <div class="grid" v-if="!loading">
    <!-- Top Statistics (4 cards) -->
    <div class="col-12 lg:col-6 xl:col-3">
      <!-- Model Tag & Model Name-->
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Model Name</span>
            <!-- <div class="text-900 font-medium text-xl">{{ deviceNum }}</div> -->
            <div class="text-700 font-medium text-xl">{{ name }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-green-100 border-round mt-3"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-at text-green-500 text-xl"></i>
          </div>
        </div>
        <!-- <span class="text-green-500 font-medium">Model Tag: Technology</span> -->
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <!-- Training Time-->
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3 mt-0"
              >Training Time</span
            >
            <!-- <div class="text-900 font-medium text-xl">{{ alarmDeviceNum }}</div> -->
            <div class="text-700 font-medium text-xl">{{ trainingTime }}s</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round mt-3"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-clock text-cyan-500 text-xl"></i>
          </div>
        </div>
        <!-- <span class="text-green-500 font-medium">Total training time</span> -->
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <!-- Vocabulary Size-->
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Vocabulary Size</span>
            <div class="text-700 font-medium text-xl">{{ vocabularySize }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-indigo-100 border-round mt-3"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-file text-indigo-500 text-xl"></i>
          </div>
        </div>
        <!-- <span class="text-green-500 font-medium"
          >Msgs received in last 24h</span
        > -->
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <!-- Dimension -->
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Dimension</span>
            <div class="text-700 font-medium text-xl">{{ vectorSize }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-red-100 border-round mt-3"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-box text-red-500 text-xl"></i>
          </div>
        </div>
        <!-- <span class="text-green-500 font-medium"
          >Number of quotas set in Sensonet</span
        > -->
      </div>
    </div>

    <!-- Left Chart -->
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Loss Over Time</h5>
        <Chart type="line" :data="lossOverTimeData" />
      </div>
    </div>

    <!-- Right Chart -->
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Vocabulary Size Over Time</h5>
        <Chart type="line" :data="vocSizeOverTimeData" />
      </div>
    </div>

    <!-- Bottom Chart-->
    <div class="col-12">
      <div class="card">
        <h5>Word Clusters</h5>
        <div class="grid">
          <div class="col-8">
            <h5>Scatter Chart</h5>
            <Chart
              type="scatter"
              :data="scatterData"
              :options="scatterChartOptions"
            />
          </div>

          <div class="col-4">
            <h5>Similarity Search</h5>
            <div class="p-inputgroup">
              <InputText placeholder="Keyword" v-model="wordToSearch" />
              <Button label="Search" @click="searchSimilarWords" />
            </div>
            <!-- Search Results -->
            <div class="card mt-3 text-lg text-800">
              <ul>
                <li v-for="word in similarWords">
                  {{ word[0] }}: {{ word[1] }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid" v-if="loading">
    <!-- Not prepared -->
    <div class="col-12">
      <!-- Loading in progress card -->
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
