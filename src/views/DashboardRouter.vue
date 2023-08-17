<script>
import { RouterView, RouterLink } from "vue-router";

export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("akunEcom");
      this.$router.push("/login");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
  },
};
</script>

<template>
  <nav class="bg-slate-400 p-7 flex justify-center gap-5">
    <router-link class="nav-menu" to="/">Home</router-link>
    <router-link class="nav-menu" to="/product">Product</router-link>
    <router-link class="nav-menu" to="/customer">Customer</router-link>
    <router-link class="nav-menu" to="/sales">Sales</router-link>
    <div>
      <button @click="logout()" class="btn-primary">Logout</button>
    </div>
  </nav>
  <main class="main-content">
    <RouterView />
  </main>
</template>
