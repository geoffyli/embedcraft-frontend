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

const lossOverTimeData = ref({
  labels: [1, 2, 3, 4, 5, 6, 7],
  datasets: [
    {
      label: "Loss Over Time",
      data: [0.9, 0.6, 0.4, 0.25, 0.2, 0.17, 0.16],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
});

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

const scatterData = ref({
  datasets: [
    {
      label: "Scatter Dataset",
      data: [
        {
          x: -10,
          y: 0,
        },
        {
          x: 0,
          y: 10,
        },
        {
          x: 10,
          y: 5,
        },
        {
          x: 0.5,
          y: 5.5,
        },
      ],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
});

onBeforeMount(() => {
  //   getTableData(null);
});
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
    <!-- Top Statistics (4 cards) -->
    <div class="col-12 lg:col-6 xl:col-3">
      <!-- Model Tag & Model Name-->
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Model Name</span>
            <!-- <div class="text-900 font-medium text-xl">{{ deviceNum }}</div> -->
            <div class="text-700 font-medium text-xl">Word2Vec_1</div>
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
            <div class="text-700 font-medium text-xl">32.5s</div>
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
            <div class="text-700 font-medium text-xl">24559</div>
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
            <div class="text-700 font-medium text-xl">150</div>
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
        <Chart type="line" :data="vocSizeOverTimeData"/>
      </div>
    </div>

    <!-- Bottom Chart-->
    <div class="col-12">
      <div class="card">
        <h5>Word Clusters</h5>
        <div class="grid">
          <div class="col-8">
            <h5>Scatter Chart</h5>
            <Chart type="scatter" :data="scatterData" />
          </div>

          <div class="col-4">
            <h5>Similarity Search</h5>
            <div class="p-inputgroup">
              <InputText placeholder="Keyword" />
              <Button label="Search" />
            </div>
            <!-- Search Results -->
            <div class="card mt-3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
