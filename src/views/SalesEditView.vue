<script>
import axios from "axios";

export default {
  data() {
    return {
      userId: this.$route.params.id,
      data: [],
    };
  },
  methods: {
    setData(data) {
      this.data = data;
    },
  },
  async created() {
    const response = await axios.get(
      `http://localhost:5020/api/sales/${this.userId}`
    );
    const data = response.data.data;
    this.setData(data);
  },
};
</script>

<template>
  <main>
    <h1>Sales Edit</h1>
    {{ this.$route.params.id }}
    {{ this.userId }}
  </main>
</template>
