<script setup>
import { ref } from "vue";
const msgProcessingPhases = ref([
  {
    obj: "Device (Sensor)",
    caption: "The component that sends messages",
    icon: "pi pi-car",
    color: "#9C27B0",
    content:
      "The device collects data from the environment and sends it to the broker.",
  },
  {
    obj: "EMQ X",
    caption: "The broker between devices and Sensonet",
    icon: "pi pi-sort-alt",
    color: "#673AB7",
    content:
      "EMQX receives messages from devices and sends them to Sensonet. \
      EMQ X can support large-scale connections, even up to millions of devices, maintaining stability and making it suitable for IoT ecosystems with a vast number of devices.",
  },
  {
    obj: "Sensonet",
    caption: "The platform layer that manages data from devices",
    icon: "pi pi-code",
    color: "#FF9800",
    content:
      "Senonet manages data from devices as a MQTT client. \
      It subscribes certain topics and analyzes relevant messages published by the devices \
      with the quota rules and the corresponding alarm rules. \
      It also provides a web interface for users to view and manage the data.",
  },
  {
    obj: "User / Third-party System",
    caption: "The client of Sensonet",
    icon: "pi pi-check",
    color: "#607D8B",
    content:
      "Users can view and manage the data through the web interface. \
      Third-party systems can also access the data through the API provided by Sensonet. \
      The API is based on the RESTful architecture.",
  },
]);

const events = ref([
  "Get the message",
  "Analyze with quota rules",
  "Analyze with alarm rules",
  "Done",
]);
</script>

<template>
  <div class="grid text-600">
    <div class="col-12">
      <div class="card">
        <h3>Documentation</h3>
      </div>

      <div class="card">
        <h5>Introduction</h5>
        <p>
          Sensonet is an all-in-one Iot platform layer solution for managing Iot
          devices, their messages and alarms based on the
          <a
            href="https://mqtt.org/"
            target="_blank"
            class="font-medium text-primary hover:underline"
            >MQTT</a
          >, the standard messaging protocol for the Internet of Things (IoT).
          It acts as a special client that subscribes certain topics and
          analyzes relevant messages published by the devices.
        </p>

        <h5>Views</h5>
        <p>
          Sensonet consists of serveral views with different layout so that you
          navigate to the corresponding module and get the job done.
        </p>
        <ul class="line-height-3">
          <li>
            <span class="text-primary font-medium">Dashboard</span>: It presents
            the critical infomation of the system to be aware of.
          </li>
          <li>
            <span class="text-primary font-medium">Device Management</span>: It
            provides functions to view, search and modify devices.
          </li>
          <li>
            <span class="text-primary font-medium">Quota Management</span>: It
            provides functions to view, add, search, modify and delete quotas.
          </li>
          <li>
            <span class="text-primary font-medium">Alarm Log</span>: It provides
            a list to view the alarm log.
          </li>
          <li>
            <span class="text-primary font-medium">Alarm Management</span>: It
            provides functions to view, add, search, modify and delete alarm
            records.
          </li>
          <li>
            <span class="text-primary font-medium">Settings</span>: The theme
            settings of the system.
          </li>
        </ul>
      </div>

      <div class="card">
        <h5>Key Concepts</h5>
        <ul class="line-height-3">
          <li>
            <div class="text-orange-500 font-medium">Device</div>
            <p>
              The Iot devices (sensors) which are pieces of hardware that detect
              changes in an environment, then collect and send data as messages.
            </p>
          </li>
          <li>
            <div class="text-orange-500 font-medium">Quota</div>
            <p>
              A quota is a specific type of data that is represented by the same
              filed in a message. Such as temperature, humidity, etc.
            </p>
          </li>
          <li>
            <div class="text-orange-500 font-medium">Alarm Rule</div>
            <p>
              Alarm rules are set based on quotas. It defines when the value of
              the corresponding quota in the message is abnormal, that is, in
              alarm.
            </p>
          </li>
          <li>
            <div class="text-orange-500 font-medium">Alarm Log</div>
            <p>
              An alarm log record is created when the value of the corresponding
              quota in the message is abnormal.
            </p>
          </li>
        </ul>

        <h5>Workflow</h5>
        <Timeline
          :value="msgProcessingPhases"
          align="alternate"
          class="customized-timeline"
        >
          <template #marker="slotProps">
            <span
              class="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-2"
              :style="{ backgroundColor: slotProps.item.color }"
            >
              <i :class="slotProps.item.icon"></i>
            </span>
          </template>
          <template #content="slotProps">
            <Card>
              <template #title>
                {{ slotProps.item.obj }}
              </template>
              <template #subtitle>
                {{ slotProps.item.caption }}
              </template>
              <template #content>
                <p class="text-600">
                  {{ slotProps.item.content }}
                </p>
              </template>
            </Card>
          </template>
        </Timeline>
      </div>

      <div class="card">
        <h5>Message Processing Flow</h5>

        <Timeline :value="events" layout="horizontal" align="alternate">
          <template #opposite> &nbsp; </template>
          <template #content="slotProps">
            {{ slotProps.item }}
          </template>
        </Timeline>
      </div>
    </div>
  </div>
</template>
