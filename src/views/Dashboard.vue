<script setup>
import { onMounted, reactive, ref, watch, computed } from "vue";
import { useLayout } from "@/layout/composables/layout";
import axios from "axios";
import {
  deviceStatusUrl,
  getStatisticsUrl,
  getAlarmTrendUrl,
  getTop10AlarmUrl,
  getLast24HourMessagesUrl,
  getQuotaNumUrl,
} from "@/api/APIUrls";

const { isDarkTheme } = useLayout();
const { layoutConfig } = useLayout();
let documentStyle = getComputedStyle(document.documentElement);
let textColor = documentStyle.getPropertyValue("--text-color");
let textColorSecondary = documentStyle.getPropertyValue(
  "--text-color-secondary"
);
let surfaceBorder = documentStyle.getPropertyValue("--surface-border");

const alarmTrendXData = ref(null);
const alarmTrendYData = ref(null);
const alarmTrendData = computed(() => ({
  labels: alarmTrendXData.value,
  datasets: [
    {
      label: "Alarm Trend",
      data: alarmTrendYData.value,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.4,
    },
  ],
}));

const top10Alarm = ref(null);
const last24HourMessages = ref(null);
const quotaNum = ref(null);
const pieData = ref(null);

let selected = ref(null);
const storedEmbeddingsTable = ref(null);



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
const barOptions = ref({
  plugins: {
    legend: {
      labels: {
        fontColor: textColor,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: textColorSecondary,
        font: {
          weight: 500,
        },
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    y: {
      ticks: {
        color: textColorSecondary,
      },
      grid: {
        color: surfaceBorder,
        drawBorder: false,
      },
    },
  },
});
const deviceNum = ref(null);
const alarmDeviceNum = ref(null);

const alarmTrendInterval = ref(null);
const alarmTrendOptions = ref([
  { name: "Per Minute", code: "PM" },
  { name: "Per Hour", code: "PH" },
  { name: "Per Day", code: "PD" },
]);
const alarmTrendStartTime = ref(null);
const alarmTrendEndTime = ref(null);
const top10AlarmStartTime = ref(null);
const top10AlarmEndTime = ref(null);

const getDeviceReport = () => {
  let token = localStorage.getItem("token");
  axios({
    method: "get",
    url: getStatisticsUrl,
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      // Output the received response content
      deviceNum.value = response.data["deviceCount"];
      alarmDeviceNum.value = response.data["alarmCount"];
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const getLast24HourMessages = () => {
  let token = localStorage.getItem("token");
  axios({
    method: "get",
    url: getLast24HourMessagesUrl,
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      last24HourMessages.value = response.data;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const getQuotaNumber = () => {
  let token = localStorage.getItem("token");
  axios({
    method: "get",
    url: getQuotaNumUrl,
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      // Output the received response content
      quotaNum.value = response.data;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

onMounted(() => {
  getDeviceReport();
  getLast24HourMessages();
  getQuotaNumber();
  // Get the time of a week ago with the format yyyy-mm-dd hh:mm:ss
  let date = new Date();
  let startTime = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000);
  let endTime = new Date();
  getAlarmTrend(formatDate(startTime), formatDate(endTime), 3);
  getTop10Alarm(formatDate(startTime), formatDate(endTime));
  setChart();
  setDatabase();
});

const getTop10Alarm = (startTime, endTime) => {
  let token = localStorage.getItem("token");
  axios({
    method: "get",
    url: getTop10AlarmUrl + `/${startTime}` + `/${endTime}`,
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      // Output the received response content
      let labels = [];
      let data = [];
      for (let i = 0; i < response.data.length; i++) {
        labels.push(
          response.data[i]["deviceId"] + ", " + response.data[i]["quotaName"]
        );
        data.push(response.data[i]["heapValue"]);
      }

      top10Alarm.value = {
        labels: labels,
        datasets: [
          {
            backgroundColor: documentStyle.getPropertyValue("--primary-500"),
            borderColor: documentStyle.getPropertyValue("--primary-500"),
            data: data,
          },
        ],
      };
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const getAlarmTrend = (startTime, endTime, interval) => {
  // let token = localStorage.getItem("token");
  // axios({
  //   method: "get",
  //   url: getAlarmTrendUrl + `/${startTime}` + `/${endTime}` + `/${interval}`,
  //   headers: {
  //     Authorization: `${token}`,
  //   },
  // })
  //   .then((response) => {
  //     // Output the received response content
  //     alarmTrendXData.value = response.data.xdata;
  //     alarmTrendYData.value = response.data.series;
  //   })
  //   .catch((error) => {
  //     console.log("Error:", error);
  //   });
  alarmTrendXData.value = [1, 2, 3, 4, 5]
  alarmTrendYData.value = [1.0, 0.7, 0.5, 0.4, 0.35]
};

function formatDate(dateString) {
  let date = new Date(dateString);

  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // JavaScript months start from 0
  let day = String(date.getDate()).padStart(2, "0");

  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const updateAlarmTrend = () => {
  let startTime = formatDate(alarmTrendStartTime.value);
  let endTime = formatDate(alarmTrendEndTime.value);
  let interval = null;
  if (alarmTrendInterval.value.code == "PM") {
    interval = 1;
  } else if (alarmTrendInterval.value.code == "PH") {
    interval = 2;
  } else if (alarmTrendInterval.value.code == "PD") {
    interval = 3;
  }
  getAlarmTrend(startTime, endTime, interval);
};

const updateTop10Alarm = () => {
  let startTime = formatDate(top10AlarmStartTime.value);
  let endTime = formatDate(top10AlarmEndTime.value);
  getTop10Alarm(startTime, endTime);
};

const applyLightTheme = () => {
  lineOptions.value = {
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
  };
};

const applyDarkTheme = () => {
  lineOptions.value = {
    plugins: {
      legend: {
        labels: {
          color: "#ebedef",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ebedef",
        },
        grid: {
          color: "rgba(160, 167, 181, .3)",
        },
      },
      y: {
        ticks: {
          color: "#ebedef",
        },
        grid: {
          color: "rgba(160, 167, 181, .3)",
        },
      },
    },
  };
};

// watch(
//   isDarkTheme,
//   (val) => {
//     if (val) {
//       applyDarkTheme();
//     } else {
//       applyLightTheme();
//     }
//   },
//   { immediate: true }
// );

// Mine

// const setColorOptions = () => {
//   documentStyle = getComputedStyle(document.documentElement);
//   textColor = documentStyle.getPropertyValue("--text-color");
//   textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
//   surfaceBorder = documentStyle.getPropertyValue("--surface-border");
// };

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
  // let deviceStatus = null;
  // let normalNum = null;
  // let offlineNum = null;
  // let alarmNum = null;
  // let token = localStorage.getItem("token");
  // axios({
  //   method: "get",
  //   url: deviceStatusUrl,
  //   headers: {
  //     Authorization: `${token}`,
  //   },
  // })
  //   .then((response) => {
  //     // Output the received response content
  //     deviceStatus = response.data;
  //     normalNum = deviceStatus[0]["value"];
  //     offlineNum = deviceStatus[1]["value"];
  //     alarmNum = deviceStatus[2]["value"];
  //     pieData.value = {
  //       labels: ["Normal", "Offline", "Alarm"],
  //       datasets: [
  //         {
  //           data: [normalNum, offlineNum, alarmNum],
  //           backgroundColor: [
  //             documentStyle.getPropertyValue("--indigo-500"),
  //             documentStyle.getPropertyValue("--purple-500"),
  //             documentStyle.getPropertyValue("--teal-500"),
  //           ],
  //           hoverBackgroundColor: [
  //             documentStyle.getPropertyValue("--indigo-400"),
  //             documentStyle.getPropertyValue("--purple-400"),
  //             documentStyle.getPropertyValue("--teal-400"),
  //           ],
  //         },
  //       ],
  //     };
  //   })
  //   .catch((error) => {
  //     console.log("Error:", error);
  //   });
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

// watch(
//   layoutConfig.theme,
//   () => {
//     setColorOptions();
//     setChart();
//   },
//   { immediate: true }
// );
</script>

<template>
  <div class="grid">
    <!-- Top Statistics (4 cards) -->
    <!-- <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Devices</span>
            <div class="text-900 font-medium text-xl">{{ deviceNum }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-wifi text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium"
          >Number of devices in total</span
        >
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >Alarming Devices</span
            >
            <div class="text-900 font-medium text-xl">{{ alarmDeviceNum }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-info-circle text-orange-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium"
          >Number of alarming devices</span
        >
      </div>
    </div> -->
    <!-- <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >Last 24h Messages</span
            >
            <div class="text-900 font-medium text-xl">
              {{ last24HourMessages }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-inbox text-cyan-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium"
          >Msgs received in last 24h</span
        >
      </div>
    </div> -->
    <!-- <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Quotas</span>
            <div class="text-900 font-medium text-xl">{{ quotaNum }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-list text-purple-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium"
          >Number of quotas set in Sensonet</span
        >
      </div>
    </div> -->

    <!-- The left column -->
    <div class="col-12 xl:col-6">
      <!-- Training time, dataset size and vector demension statistics (bubble chart) -->
      <div class="card">
        <h5 class="text-left w-full">Training Time Statistics</h5>
        <Chart type="bubble" :data="pieData"></Chart>
      </div>
      <!-- <div class="card">
        <h5>Top 10 Alarming Device</h5>
        <Chart type="bar" :data="top10Alarm" :options="barOptions"></Chart>
        <div class="mt-3 grid">
          <Calendar
            class="col-6"
            v-model="top10AlarmStartTime"
            showTime
            hourFormat="24"
            placeholder="Start Time"
          />
          <Calendar
            class="col-6"
            v-model="top10AlarmEndTime"
            showTime
            hourFormat="24"
            placeholder="End Time"
          />
        </div>
        <div class="grid mt-2 ml-auto">
          <Button
            class="w-full mr-2"
            label="Submit"
            @click="updateTop10Alarm"
          />
        </div>
      </div> -->
    </div>

    <!-- The right column -->
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Loss Over Time</h5>
        <Chart type="line" :data="alarmTrendData" :options="lineOptions" />
        <!-- style="display: flex; justify-content: center;" -->
        <!-- <div class="mt-3 grid">
          <Calendar
            class="col-3"
            v-model="alarmTrendStartTime"
            showTime
            hourFormat="24"
            placeholder="Start Time"
          />
          <Calendar
            class="col-3"
            v-model="alarmTrendEndTime"
            showTime
            hourFormat="24"
            placeholder="End Time"
          />
          <Dropdown
            class="col-6 mt-2 mb-2"
            v-model="alarmTrendInterval"
            :options="alarmTrendOptions"
            optionLabel="name"
            placeholder="Select an Interval"
          />
        </div> -->
        <!-- <div class="grid mt-4 ml-auto">
          <Button class="w-full" label="Submit" @click="updateAlarmTrend" />
        </div> -->
      </div>
      <!-- <div class="card">
        <div class="flex align-items-center justify-content-between mb-4">
          <h5>Developor's Announcement & Log</h5>
        </div>

        <span class="block text-600 font-medium mb-3">Aug. 24 2023</span>
        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
          <li
            class="flex align-items-center py-2 border-bottom-1 surface-border"
          >
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-check text-xl text-blue-500"></i>
            </div>
            <span class="text-700 line-height-3">
              Fix responsive layout bug.
            </span>
          </li>
          <li class="flex align-items-center py-2">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-download text-xl text-orange-500"></i>
            </div>
            <span class="text-700 line-height-3"
              >Update data storage performance.</span
            >
          </li>
        </ul>

        <span class="block text-600 font-medium mb-3">Aug. 04 2023</span>
        <ul class="p-0 m-0 list-none">
          <li
            class="flex align-items-center py-2 border-bottom-1 surface-border"
          >
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-check text-xl text-blue-500"></i>
            </div>
            <span class="text-700 line-height-3">Debug CORS policy.</span>
          </li>
          <li
            class="flex align-items-center py-2 border-bottom-1 surface-border"
          >
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-chart-line text-xl text-pink-500"></i>
            </div>
            <span class="text-700 line-height-3"
              >Complete front-end design.
            </span>
          </li>
        </ul>
      </div> -->
    </div>
    <!-- Word embedding database -->
    <div class="col-12 xl:col-12">
      <div class="card">
        <h5>Stored Word Embeddings</h5>

        <DataTable
          v-model:selection="selected"
          :value="storedEmbeddingsTable"
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
