<script setup>
import { ref } from "vue";
import Axios from "axios"; // Import Axios
import { signupUrl } from "@/api/APIUrls";
import router from "@/router";
import { setThemeAndScale } from "@/utils/themeUtil";
import { onMounted } from "vue";

onMounted(() => {
  setThemeAndScale();
});

const username = ref("");
const password1 = ref("");
const password2 = ref("");
let errorWarning = ref("");

const showUsernameWarning = ref(false);
const showPassword1Warning = ref(false);
const showPassword2Warning = ref(false);
const showErrorWarning = ref(false);

let usernameFirstInput = true;

let usernameValid = false;
let password1Valid = false;
let password2Valid = true;

function usernameValidation() {
  showErrorWarning.value = false;
  if (usernameFirstInput) {
    usernameFirstInput = false;
    usernameValid = true;
  } else {
    if (!username.value.trim()) {
      usernameValid = false;
      showUsernameWarning.value = true;
    } else {
      usernameValid = true;
      showUsernameWarning.value = false;
    }
  }
}

function password1Validation() {
  password1Valid = true;

  if (password1.value.length < 6) {
    password1Valid = false;
    showPassword1Warning.value = true;
  } else {
    password1Valid = true;
    showPassword1Warning.value = false;
  }
}

function password2Validation() {
  password2Valid = true;
  showPassword2Warning.value = false;
}

async function handleSignup() {
  let valid = true;
  if (!usernameValid) {
    showUsernameWarning.value = true;
    valid = false;
  }
  if (!password1Valid) {
    showPassword1Warning.value = true;
    valid = false;
  }
  if (password2.value !== password1.value) {
    errorWarning.value = "Passwords do not match!";
    showErrorWarning.value = true;
    valid = false;
  } else if (password2.value == "") {
    errorWarning.value = "Please confirm your password!";
    showErrorWarning.value = true;
    valid = false;
  }
  if (!valid) {
    return;
  }

  // Make the HTTP request using Axios
  try {
    const response = await Axios.post(signupUrl, {
      account: username.value,
      password: password1.value,
    });

    // Store the token in the local storage
    const token = response.headers["authorization"];
    const userId = response.data['userId']

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId)

    // Redirect to the dashboard by router
    router.push({ name: "dashboard" });
  } catch (error) {
    // Access the HTTP status code from the response property of the error
    const statusCode = error.response ? error.response.status : null;
    // Check if the error status is 401
    if (statusCode === 401) {
      errorWarning.value = "Account already exists!";
      showErrorWarning.value = true;
    } else {
      // Log the error if the status is not 401 or if there's no response property
      console.error(error);
    }
  }
}
</script>

<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 20%,
            rgb(38, 172, 206) 50%
          );
        "
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">
              Create an account!
            </div>
            <span class="text-600 font-medium">Set up your account</span>
          </div>

          <div>
            <!-- Username -->
            <label
              for="username"
              class="block text-900 text-xl font-medium mb-2"
              >Username</label
            >
            <InputText
              id="username"
              type="text"
              placeholder="Username"
              class="w-full md:w-30rem mb-0"
              style="padding: 1rem"
              v-model="username"
              @input="usernameValidation"
            />
            <div class="text-red-400 text-right" v-if="showUsernameWarning">
              Username cannot be empty!
            </div>
            <!-- Password 1 -->
            <label
              for="password"
              class="block text-900 font-medium text-xl mb-2 mt-2"
              >Password</label
            >
            <Password
              id="password1"
              v-model="password1"
              placeholder="Password"
              toggleMask
              :feedback="false"
              class="w-full mb-0"
              inputClass="w-full"
              :inputStyle="{ padding: '1rem' }"
              @input="password1Validation"
            ></Password>
            <div class="text-red-400 text-right" v-if="showPassword1Warning">
              Password must be at least 6 characters!
            </div>
            <!-- Password 2 -->
            <label
              for="password"
              class="block text-900 font-medium text-xl mb-2 mt-2"
              >Repeat Password</label
            >
            <Password
              id="password2"
              v-model="password2"
              placeholder="Repeat Password"
              toggleMask
              :feedback="false"
              class="w-full mb-0"
              inputClass="w-full"
              :inputStyle="{ padding: '1rem' }"
              @input="password2Validation"
            ></Password>
            <div class="text-red-400 text-right" v-if="showPassword2Warning">
              Password does not match!
            </div>

            <Button
              label="Sign Up"
              class="w-full p-3 text-xl mt-4"
              style="
                background: linear-gradient(
                  90deg,
                  rgb(164, 131, 241) 20%,
                  rgb(38, 172, 206) 70%
                );
              "
              @click="handleSignup"
            ></Button>
            <div class="text-red-400 text-center mt-1" v-if="showErrorWarning">
              {{ errorWarning }}
            </div>
          </div>
          <div class="col-12 mt-4 text-center">
            <div class="text-600 font-medium">Already have an account?</div>
            <i
              class="pi pi-fw pi-arrow-left text-blue-500 mr-2 mt-3"
              style="vertical-align: center"
            ></i>
            <router-link to="/user/login" class="text-blue-500"
              >Go to login</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
