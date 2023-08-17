<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      dataDetail: {},
      idDelete: "",
      isModalDelete: false,
      isModalDetail: false,
    };
  },
  methods: {
    setData(data) {
      this.data = data;
    },
    goToAdd() {
      this.$router.push("sales/add");
    },
    goToEdit(id) {
      this.$router.push(`sales/edit/${id}`);
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
      const response = await axios.get(`http://localhost:5020/api/sales`);
      const data = response.data.data;
      this.setData(data);
    },
    async handleDelete() {
      try {
        await axios.delete(`http://localhost:5020/api/sales/${this.idDelete}`);
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
      <h1 class="title">{{ dataDetail.code_transaksi }}</h1>
      <p class="flex justify-between w-full">
        Total Diskon:
        <span>
          {{ dataDetail.total_diskon }}
        </span>
      </p>
      <p class="flex justify-between w-full">
        Total Price:
        <span>
          {{ dataDetail.total_harga }}
        </span>
      </p>
      <p class="flex justify-between w-full">
        Total Payment:
        <span>
          {{ dataDetail.total_bayar }}
        </span>
      </p>
      <div class="h-[250px] w-full overflow-auto flex flex-col gap-2">
        <div
          v-for="(data, index) in dataDetail.item"
          :key="index"
          class="bg-slate-300 p-2 rounded-md w-full"
        >
          <p class="flex justify-between">
            Name Product:
            <span>
              {{ data.item.nama_item }}
            </span>
          </p>
          <p class="flex justify-between">
            Item Price:
            <span>
              {{ data.item.harga_satuan }}
            </span>
          </p>
          <p class="flex justify-between">
            QTY :
            <span>
              {{ data.qty }}
            </span>
          </p>
          <p class="flex justify-between">
            Total Price:
            <span>
              {{ data.total_harga }}
            </span>
          </p>
        </div>
      </div>

      <button @click="clickModalDetail()" class="btn-secondary">close</button>
    </div>
  </section>

  <main class="flex flex-col justify-end items-end gap-8 mt-8">
    <table class="w-full bg-slate-100 shadow-md rounded overflow-hidden">
      <thead class="text-xl text-center bg-slate-400 text-white">
        <tr>
          <th class="p-4 w-[5%]">No</th>
          <th class="p-4 w-[10%]">Code Transaksi</th>
          <th class="p-4 w-[10%]">Name Customers</th>
          <th class="p-4 w-[10%]">Total Pembelian Produk</th>
          <th class="p-4 w-[10%]">Total Harga Diskon</th>
          <th class="p-4 w-[10%]">Total Harga</th>
          <th class="p-4 w-[10%]">Total bayar</th>
          <th class="p-4 w-[10%]">Action</th>
        </tr>
      </thead>
      <tbody class="text-md text-center">
        <tr v-for="(data, index) in data" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ data.code_transaksi }}</td>
          <td>{{ data.name_customers.nama }}</td>
          <td>{{ data.qty }} Produk</td>
          <td>{{ data.total_diskon }}</td>
          <td>{{ data.total_harga }}</td>
          <td>{{ data.total_bayar }}</td>
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
