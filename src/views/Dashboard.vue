<script setup>
import { onMounted, reactive, ref, watch, computed } from "vue";
import { useLayout } from "@/layout/composables/layout";
import axios from "axios";
import { useRouter } from "vue-router";
import { queryModelListUrl } from "@/api/APIUrls";


// Use Vue router
const router = useRouter();

const lossOverTimeXData = ref(null);
const lossOverTimeYData = ref(null);
const lossOverTimeData = computed(() => ({
  labels: lossOverTimeXData.value,
  datasets: [
    {
      label: "Loss Over Time",
      data: lossOverTimeYData.value,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.4,
    },
  ],
}));

const pieData = ref(null);

let selected = ref(null);
const modelTable = ref(null);

const getTableData = () => {
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  axios({
    method: "get",
    url: `${queryModelListUrl}?userId=${userId}&name=none&tag=none`,
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



const lineOptions = ref({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  });


onMounted(() => {
  setChart();
  getTableData(null, null);
});


const setChart = () => {
  pieData.value = {
  datasets: [{
    label: 'Word2Vec',
    data: [{
      x: 120, // Vectorsize
      y: 70,  // Training time in seconds
      r: 15   // epochs.
    }, {
      x: 40,
      y: 130,
      r: 10
    }],
    backgroundColor: 'rgb(100, 150, 132)'
  },
  {
    label: 'FastText',
    data: [{
      x: 100, // Vectorsize
      y: 30,  // Training time in seconds
      r: 20   // epochs.
    }, {
      x: 70,
      y: 90,
      r: 10
    }],
    backgroundColor: 'rgb(200, 150, 30)'
  }]
};
  
};

const check = (data) => {
  localStorage.setItem("taskId", data.modelId)
  // Redirect to the model detail page
  router.push("/main/modelDetail");
};
</script>

<template>
  <div class="grid">
    <!-- The left column -->
    <div class="col-12 xl:col-6">
      <!-- Training time, dataset size and vector demension statistics (bubble chart) -->
      <div class="card">
        <h5 class="text-left w-full">Training Time Statistics</h5>
        <Chart type="bubble" :data="pieData"></Chart>
      </div>
    </div>

    <!-- The right column -->
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Loss Over Time</h5>
        <Chart type="line" :data="lossOverTimeData" :options="lineOptions" />
      </div>
    </div>
    <!-- Word embedding database -->
    <div class="col-12 xl:col-12">
      <div class="card">
        <h5>Stored Word Embeddings</h5>
        <DataTable
          v-model:selection="selected"
          :value="modelTable"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="5"
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
