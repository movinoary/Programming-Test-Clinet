<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      idDelete: "",
      dataDetail: {},
      isModalDelete: false,
      isModalDetail: false,
    };
  },
  methods: {
    setData(data) {
      this.data = data;
    },
    goToAdd() {
      this.$router.push("product/add");
    },
    goToEdit(id) {
      this.$router.push(`product/edit/${id}`);
    },
    clickModalDelete(id) {
      if (id !== "") {
        this.idDelete = id;
        this.isModalDelete = !this.isModalDelete;
      } else {
        this.idDelete = "";
        this.isModalDelete = !this.isModalDelete;
      }
    },
    clickModalDetail(data) {
      if (data !== "") {
        this.dataDetail = data;
        this.isModalDetail = !this.isModalDetail;
      } else {
        this.dataDetail = "";
        this.isModalDetail = !this.isModalDetail;
      }
    },
    async getData() {
      const response = await axios.get(`http://localhost:5020/api/item`);
      const data = response.data.data;
      this.setData(data);
    },
    async handleDelete() {
      try {
        await axios.delete(`http://localhost:5020/api/item/${this.idDelete}`);
        this.isModalDelete = !this.isModalDelete;
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
  <section v-if="isModalDelete" class="modal">
    <div class="content-modal">
      <p class="title">Sure to delete this item?</p>
      <div class="flex gap-4">
        <button @click="handleDelete()" class="btn-primary">delete</button>
        <button @click="clickModalDelete()" class="btn-secondary">close</button>
      </div>
    </div>
  </section>

  <section v-if="isModalDetail" class="modal">
    <div class="content-modal-detail">
      <h1 class="title">{{ dataDetail.nama_item }}</h1>
      <img
        class="w-52 h-52"
        :src="'http://localhost:5020/public/' + dataDetail.barang"
        :alt="data.nama_item"
      />
      <p class="flex justify-between w-56">
        Unit:
        <span>
          {{ dataDetail.unit }}
        </span>
      </p>
      <p class="flex justify-between w-56">
        Stock Product:
        <span>
          {{ dataDetail.unit }}
        </span>
      </p>
      <p class="flex justify-between w-56">
        Price:
        <span>
          {{ dataDetail.harga_satuan }}
        </span>
      </p>
      <button @click="clickModalDetail()" class="btn-secondary">close</button>
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
          <th class="p-4 w-[25%]">Name</th>
          <th class="p-4 w-[10%]">Unit</th>
          <th class="p-4 w-[10%]">Stok</th>
          <th class="p-4 w-[20%]">Price</th>
          <th class="p-4 w-[20%]">Image</th>
          <th class="p-4 w-[10%]">Action</th>
        </tr>
      </thead>
      <tbody class="text-md text-center">
        <tr v-for="(data, index) in data" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ data.nama_item }}</td>
          <td>{{ data.unit }}</td>
          <td>{{ data.stok }}</td>
          <td>{{ data.harga_satuan }}</td>
          <td class="flex justify-center">
            <img
              class="img-table"
              :src="'http://localhost:5020/public/' + data.barang"
              :alt="data.nama_item"
            />
          </td>
          <td>
            <button class="icon-detail" @click="clickModalDetail(data)">
              <i class="fa-solid fa-file"></i>
            </button>
            <button class="icon-edit" @click="goToEdit(data.id)">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="icon-delete" @click="clickModalDelete(data.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style></style>
