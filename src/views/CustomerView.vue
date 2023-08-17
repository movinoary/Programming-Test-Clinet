<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      isModal: false,
      idDelete: "",
    };
  },
  methods: {
    setData(data) {
      this.data = data;
    },
    goToAdd() {
      this.$router.push("customer/add");
    },
    goToEdit(id) {
      this.$router.push(`customer/edit/${id}`);
    },
    clickModal(id) {
      this.idDelete = id;
      this.isModal = !this.isModal;
    },
    async getData() {
      const response = await axios.get(`http://localhost:5020/api/customer`);
      const data = response.data.data;
      this.setData(data);
    },
    async handleDelete() {
      try {
        await axios.delete(
          `http://localhost:5020/api/customer/${this.idDelete}`
        );
        this.isModal = !this.isModal;
        this.idDelete = "";
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<template>
  <section v-if="isModal" class="modal">
    <div class="content-modal">
      <p class="title">Sure to delete this item?</p>
      <div class="flex gap-4">
        <button @click="handleDelete()" class="btn-primary">delete</button>
        <button @click="clickModal()" class="btn-secondary">close</button>
      </div>
    </div>
  </section>

  <main class="flex flex-col justify-end items-end gap-8 -mt-10">
    <div class="w-20">
      <button @click="goToAdd()" class="btn-primary">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
    <table class="w-full bg-slate-100 shadow-md rounded overflow-hidden">
      <thead class="text-xl text-center bg-slate-400 text-white">
        <tr>
          <th class="p-4 w-[5%]">No</th>
          <th class="p-4 w-[10%]">nama</th>
          <th class="p-4 w-[10%]">email</th>
          <th class="p-4 w-[10%]">alamat</th>
          <th class="p-4 w-[10%]">contact</th>
          <th class="p-4 w-[10%]">diskon</th>
          <th class="p-4 w-[10%]">tipe_diskon</th>
          <th class="p-4 w-[10%]">ktp</th>
          <th class="p-4 w-[10%]">actions</th>
        </tr>
      </thead>
      <tbody class="text-md text-center">
        <tr v-for="(data, index) in data" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ data.nama }}</td>
          <td>{{ data.alamat }}</td>
          <td>{{ data.email }}</td>
          <td>{{ data.contact }}</td>
          <td>{{ data.diskon }}</td>
          <td>{{ data.tipe_diskon }}</td>
          <td class="flex justify-center">
            <img
              class="img-table"
              :src="'http://localhost:5020/public/' + data.ktp"
              :alt="data.nama"
            />
          </td>
          <td>
            <button class="icon-detail">
              <i class="fa-solid fa-file"></i>
            </button>
            <button class="icon-edit" @click="goToEdit(data.id)">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="icon-delete" @click="clickModal(data.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

alamat contact diskon email ktp nama tipe_diskon
