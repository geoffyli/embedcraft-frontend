<script setup>
import { onMounted } from 'vue';
import {setThemeAndScale} from '@/utils/themeUtil';

onMounted(() => {
    setThemeAndScale();
});
</script>

<template>
  <div class="surface-0 flex justify-content-center">
    <div id="home" class="landing-wrapper overflow-hidden">
      <!-- Slogan -->
      <div
        style="
          background: linear-gradient(
            90deg,
            rgb(164, 131, 241) 20%,
            rgb(38, 172, 206) 70%
          );
        "
        class="py-1 px-3 mx-0 md:mx-0 lg:mx-0 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-0"
      >
        <span
          class="text-900 font-medium text-4xl line-height-4 mr-8 text-white"
          >SENSONET</span
        >
      </div>

      <!-- Hero Img -->
      <div
        id="hero"
        class="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
        style="
          background: linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.2),
              rgba(255, 255, 255, 0.2)
            ),
            radial-gradient(
              77.36% 256.97% at 77.36% 57.52%,
              rgb(238, 239, 175) 0%,
              rgb(195, 227, 250) 100%
            );
          clip-path: ellipse(150% 87% at 93% 13%);
        "
      >
        <div class="mx-4 md:mx-8 mt-0 md:mt-4">
          <h1 class="text-6xl font-bold text-gray-900 line-height-2">
            <span class="font-light block">Connect everything.</span>Iot
            Platform Layer Slution
          </h1>
          <p class="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">
            Manage all your Iot devices, messages and alarm-tracks just in one
            platform, with your brilliant inspiration...
          </p>
          <router-link to="/user/login">
            <Button
              label="Get Started"
              severity="info"
              class="p-button-rounded text-xl border-none mt-3 mb-5 bg-500 font-normal text-white line-height-3 px-3"
              style="
                width: 200px;
                background: linear-gradient(
                  90deg,
                  rgb(51, 193, 218) 20%,
                  rgb(214, 211, 49) 70%
                );
              "
            ></Button>
          </router-link>
        </div>
        <div class="flex justify-content-center md:justify-content-end mt-2">
          <img
            src="/src/assets/images/welcome/dashboard_img.jpg"
            alt="Hero Image"
            class="w-9 md:w-auto"
            style="border-radius: 4%"
          />
        </div>
      </div>

      <!-- Features -->
      <div id="features" class="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">
        <div class="grid justify-content-center">
          <div class="col-12 text-center mt-8 mb-4">
            <h2 class="text-900 font-normal mb-2">Marvelous Features</h2>
            <span class="text-600 text-2xl">This is what you expect...</span>
          </div>

          <div
            class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0"
          >
            <div
              style="
                height: 160px;
                padding: 2px;
                border-radius: 10px;
                background: linear-gradient(
                    90deg,
                    rgba(253, 228, 165, 0.2),
                    rgba(187, 199, 205, 0.2)
                  ),
                  linear-gradient(
                    180deg,
                    rgba(253, 228, 165, 0.2),
                    rgba(187, 199, 205, 0.2)
                  );
              "
            >
              <div class="p-3 surface-card h-full" style="border-radius: 8px">
                <div
                  class="flex align-items-center justify-content-center bg-yellow-200 mb-3"
                  style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
                >
                  <i class="pi pi-fw pi-users text-2xl text-yellow-700"></i>
                </div>
                <h5 class="mb-2 text-900">Easy to Use</h5>
                <span class="text-600">With friendly user Interface.</span>
              </div>
            </div>
          </div>

          <div
            class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0"
          >
            <div
              style="
                height: 160px;
                padding: 2px;
                border-radius: 10px;
                background: linear-gradient(
                    90deg,
                    rgba(145, 226, 237, 0.2),
                    rgba(251, 199, 145, 0.2)
                  ),
                  linear-gradient(
                    180deg,
                    rgba(253, 228, 165, 0.2),
                    rgba(172, 180, 223, 0.2)
                  );
              "
            >
              <div class="p-3 surface-card h-full" style="border-radius: 8px">
                <div
                  class="flex align-items-center justify-content-center bg-cyan-200 mb-3"
                  style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
                >
                  <i class="pi pi-fw pi-palette text-2xl text-cyan-700"></i>
                </div>
                <h5 class="mb-2 text-900">Fresh Design</h5>
                <span class="text-600">Artist's flat design.</span>
              </div>
            </div>
          </div>

          <div class="col-12 md:col-12 lg:col-4 p-0 lg:pb-5 mt-4 lg:mt-0">
            <div
              style="
                height: 160px;
                padding: 2px;
                border-radius: 10px;
                background: linear-gradient(
                    90deg,
                    rgba(145, 226, 237, 0.2),
                    rgba(172, 180, 223, 0.2)
                  ),
                  linear-gradient(
                    180deg,
                    rgba(172, 180, 223, 0.2),
                    rgba(246, 158, 188, 0.2)
                  );
              "
            >
              <div class="p-3 surface-card h-full" style="border-radius: 8px">
                <div
                  class="flex align-items-center justify-content-center bg-indigo-200"
                  style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
                >
                  <i class="pi pi-fw pi-map text-2xl text-indigo-700"></i>
                </div>
                <h5 class="mb-2 text-900">Well Documented</h5>
                <span class="text-600"
                  >Check full-detailed instruction with a single click.</span
                >
              </div>
            </div>
          </div>

          <div
            class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0"
          >
            <div
              style="
                height: 160px;
                padding: 2px;
                border-radius: 10px;
                background: linear-gradient(
                    90deg,
                    rgba(187, 199, 205, 0.2),
                    rgba(251, 199, 145, 0.2)
                  ),
                  linear-gradient(
                    180deg,
                    rgba(253, 228, 165, 0.2),
                    rgba(145, 210, 204, 0.2)
                  );
              "
            >
              <div class="p-3 surface-card h-full" style="border-radius: 8px">
                <div
                  class="flex align-items-center justify-content-center bg-bluegray-200 mb-3"
                  style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
                >
                  <i class="pi pi-fw pi-id-card text-2xl text-bluegray-700"></i>
                </div>
                <h5 class="mb-2 text-900">Responsive Layout</h5>
                <span class="text-600"
                  >Laptops, tablets or phones? All's ready!</span
                >
              </div>
            </div>
          </div>

          <div
            class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0"
          >
            <div
              style="
                height: 160px;
                padding: 2px;
                border-radius: 10px;
                background: linear-gradient(
                    90deg,
                    rgba(187, 199, 205, 0.2),
                    rgba(246, 158, 188, 0.2)
                  ),
                  linear-gradient(
                    180deg,
                    rgba(145, 226, 237, 0.2),
                    rgba(160, 210, 250, 0.2)
                  );
              "
            >
              <div class="p-3 surface-card h-full" style="border-radius: 8px">
                <div
                  class="flex align-items-center justify-content-center bg-orange-200 mb-3"
                  style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
                >
                  <i class="pi pi-fw pi-star text-2xl text-orange-700"></i>
                </div>
                <h5 class="mb-2 text-900">Clean Code</h5>
                <span class="text-600">More durable, more reliable.</span>
              </div>
            </div>
          </div>

          <div class="col-12 md:col-12 lg:col-4 p-0 lg:pb-5 mt-4 lg:mt-0">
            <div
              style="
                height: 160px;
                padding: 2px;
                border-radius: 10px;
                background: linear-gradient(
                    90deg,
                    rgba(251, 199, 145, 0.2),
                    rgba(246, 158, 188, 0.2)
                  ),
                  linear-gradient(
                    180deg,
                    rgba(172, 180, 223, 0.2),
                    rgba(212, 162, 221, 0.2)
                  );
              "
            >
              <div class="p-3 surface-card h-full" style="border-radius: 8px">
                <div
                  class="flex align-items-center justify-content-center bg-pink-200 mb-3"
                  style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
                >
                  <i class="pi pi-fw pi-moon text-2xl text-pink-700"></i>
                </div>
                <h5 class="mb-2 text-900">Dark Mode</h5>
                <span class="text-600">Protect your eyes in midnight.</span>
              </div>
            </div>
          </div>

          <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 mt-4 lg:mt-0">
            <div
              style="
                height: 160px;
                padding: 2px;
                border-radius: 10px;
                background: linear-gradient(
                    90deg,
                    rgba(145, 210, 204, 0.2),
                    rgba(160, 210, 250, 0.2)
                  ),
                  linear-gradient(
                    180deg,
                    rgba(187, 199, 205, 0.2),
                    rgba(145, 210, 204, 0.2)
                  );
              "
            >
              <div class="p-3 surface-card h-full" style="border-radius: 8px">
                <div
                  class="flex align-items-center justify-content-center bg-teal-200 mb-3"
                  style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
                >
                  <i
                    class="pi pi-fw pi-shopping-cart text-2xl text-teal-700"
                  ></i>
                </div>
                <h5 class="mb-2 text-900">Ready to Use</h5>
                <span class="text-600"
                  >No tedious setting and configuring.</span
                >
              </div>
            </div>
          </div>

          <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 mt-4 lg:mt-0">
            <div
              style="
                height: 160px;
                padding: 2px;
                border-radius: 10px;
                background: linear-gradient(
                    90deg,
                    rgba(145, 210, 204, 0.2),
                    rgba(212, 162, 221, 0.2)
                  ),
                  linear-gradient(
                    180deg,
                    rgba(251, 199, 145, 0.2),
                    rgba(160, 210, 250, 0.2)
                  );
              "
            >
              <div class="p-3 surface-card h-full" style="border-radius: 8px">
                <div
                  class="flex align-items-center justify-content-center bg-blue-200 mb-3"
                  style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
                >
                  <i class="pi pi-fw pi-globe text-2xl text-blue-700"></i>
                </div>
                <h5 class="mb-2 text-900">Modern Practices</h5>
                <span class="text-600"
                  >with our powerful data management techs.</span
                >
              </div>
            </div>
          </div>

          <div class="col-12 md:col-12 lg:col-4 p-0 lg-4 mt-4 lg:mt-0">
            <div
              style="
                height: 160px;
                padding: 2px;
                border-radius: 10px;
                background: linear-gradient(
                    90deg,
                    rgba(160, 210, 250, 0.2),
                    rgba(212, 162, 221, 0.2)
                  ),
                  linear-gradient(
                    180deg,
                    rgba(246, 158, 188, 0.2),
                    rgba(212, 162, 221, 0.2)
                  );
              "
            >
              <div class="p-3 surface-card h-full" style="border-radius: 8px">
                <div
                  class="flex align-items-center justify-content-center bg-purple-200 mb-3"
                  style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
                >
                  <i class="pi pi-fw pi-eye text-2xl text-purple-700"></i>
                </div>
                <h5 class="mb-2 text-900">Privacy</h5>
                <span class="text-600"
                  >Privacy is of the great importance.</span
                >
              </div>
            </div>
          </div>

          <div
            class="col-12 mt-8 mb-8 p-2 md:p-8"
            style="
              border-radius: 20px;
              background: linear-gradient(
                  0deg,
                  rgba(255, 255, 255, 0.6),
                  rgba(255, 255, 255, 0.6)
                ),
                radial-gradient(
                  77.36% 256.97% at 77.36% 57.52%,
                  #efe1af 0%,
                  #c3dcfa 100%
                );
            "
          >
            <div
              class="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0"
            >
              <h3 class="text-gray-900 mb-2">About the Author</h3>
              <span class="text-gray-600 text-2xl">Yulong Li</span>
              <p
                class="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-4"
                style="max-width: 800px"
              >
                Senior Student of Computer Science and Software Engineering,
                CQUPT & UAlbany, being intreasted in web development, data
                science and machine learning.
              </p>
              <a href="https://github.com/geoffyli" target="_blank">
                <img
                src="/src/assets/images/welcome/avator.jpg"
                class="mt-4"
                alt="Avator"
                style="border-radius: 50%"
              />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
