<script>
import axios from "axios";

export default {
  data() {
    return {
      data: {
        username: "",
        password: "",
        email: "",
        role: "",
      },
      message: "",
      isRegister: false,
    };
  },
  methods: {
    async handleLogin() {
      try {
        let body = {
          username: this.data.username,
          password: this.data.password,
        };
        body = JSON.stringify(body);
        const setting = {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: "Basic ",
          },
        };

        const res = await axios.post(
          `http://localhost:5020/api/login/`,
          body,
          setting
        );
        const data = res.data.data;

        localStorage.setItem("akunEcom", JSON.stringify(data));
        this.message = "Berhasil Login";
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        this.message = error.response.data.message;
      }
    },
    clickRegister() {
      this.isRegister = !this.isRegister;
    },
    async handleRegister() {
      try {
        let body = {
          username: this.data.username,
          password: this.data.password,
          email: this.data.email,
          role: "admin",
        };
        body = JSON.stringify(body);

        const setting = {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: "Basic ",
          },
        };

        if (
          this.data.username !== "" ||
          this.data.password !== "" ||
          this.data.email !== ""
        ) {
          await axios.post(
            `http://localhost:5020/api/register/`,
            body,
            setting
          );
          this.message = "Berhasil Register";
          this.isRegister = !this.isRegister;
          this.data = {
            username: "",
            password: "",
            email: "",
          };
        } else {
          this.message = "please complete the data";
        }
      } catch (error) {
        this.message = error.response.data.message;
      }
    },
  },
  created() {
    const akun = JSON.parse(localStorage.getItem("akunEcom")) || undefined;
  },
};
</script>

<template>
  <main
    v-if="!isRegister"
    class="w-[100vw] h-[100vh] flex justify-center items-center"
  >
    <section class="form bg-slate-200">
      <h1 class="title">Login</h1>
      <input
        class="input"
        type="text"
        v-model="data.username"
        placeholder="username"
      />
      <input
        class="input"
        type="password"
        v-model="data.password"
        placeholder="******"
      />
      <p class="alert">{{ message !== "" ? message : null }}</p>
      <div class="w-full flex gap-4">
        <button @click="handleLogin()" class="btn-primary">Login</button>
        <button @click="clickRegister()" class="btn-secondary">Register</button>
      </div>
    </section>
  </main>
  <main v-else class="w-[100vw] h-[100vh] flex justify-center items-center">
    <section class="form bg-slate-200">
      <h1 class="title">Register</h1>
      <input
        class="input"
        type="text"
        v-model="data.username"
        placeholder="username"
      />
      <input
        class="input"
        type="email"
        v-model="data.email"
        placeholder="email"
      />
      <input
        class="input"
        type="password"
        v-model="data.password"
        placeholder="******"
      />
      <p class="alert">{{ message !== "" ? message : null }}</p>
      <div class="w-full flex flex-col gap-3">
        <button class="btn-primary" @click="handleRegister()">Register</button>
        <p>
          If you have account click here
          <button @click="clickRegister()" class="hover:text-slate-500">
            login
          </button>
        </p>
      </div>
    </section>
  </main>
</template>
