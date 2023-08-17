<script>
import axios from "axios";

export default {
  data() {
    return {
      data_product: [],
      isModal: false,
      cart: [],
      data_customer: [],
      idCustomer: "Select Customer",
    };
  },
  methods: {
    setData(data_product, data_customer) {
      this.data_product = data_product;
      this.data_customer = data_customer;
    },
    async getData() {
      const response_item = await axios.get(`http://localhost:5020/api/item`);
      const response_customer = await axios.get(
        `http://localhost:5020/api/customer`
      );
      const data_product = response_item.data.data;
      const data_customer = response_customer.data.data;
      this.setData(data_product, data_customer);
    },
    addProduct: function (data) {
      let body = this.cart;
      const findData = body?.find((d) => d.id === data.id);
      const item = {
        ...data,
        qty: 1,
      };
      if (findData === undefined) {
        body.push(item);
      }
      this.cart = body;
    },
    async handleSaveSales() {
      const getDate = new Date();
      const month = getDate.getMonth();
      const year = getDate.getFullYear();
      const date = getDate.getDate();

      const item_cart = this.cart.map((d) => {
        return {
          id_item: d.id,
          qty: d.qty > d.stok ? d.stok : d.qty,
        };
      });

      let body = {
        tanggal_transaksi: `${year}-${month}-${date}`,
        customer: this.idCustomer,
        item: item_cart,
      };

      const setting = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic ",
        },
      };
      await axios.post(`http://localhost:5020/api/sales`, body, setting);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<template>
  <main class="flex flex-wrap">
    <section class="w-[70%]">
      <h1 class="title">Product</h1>
      <div class="w-full flex gap-4 flex-wrap">
        <div
          v-for="(data, index) in data_product"
          :key="index"
          class="w-[300px] h-[350px] flex flex-col justify-between gap-2 shadow-2xl rounded-lg p-4"
        >
          <p class="sub-title">{{ data.nama_item }}</p>
          <img
            class="w-full h-[150px] rounded-md"
            :src="'http://localhost:5020/public/' + data.barang"
            :alt="data.nama_item"
          />
          <div class="flex w-full justify-between">
            <p>Unit : {{ data.unit }}</p>
            <p>Stock: {{ data.stok }}</p>
          </div>
          <p>Price : {{ data.harga_satuan }}</p>
          <button @click="addProduct(data)" class="btn-primary">Add</button>
        </div>
      </div>
    </section>
    <section
      class="w-[30%] h-[50%] shadow-xl p-4 rounded-xl flex flex-col gap-4"
    >
      <h1 class="title">Cart</h1>
      <div class="h-[200px] overflow-auto flex flex-col gap-2">
        <div
          v-for="(data, index) in cart"
          :key="index"
          class="bg-slate-300 p-2 rounded-md"
        >
          <p class="flex justify-between">
            Name Product:
            <span>
              {{ data.nama_item }}
            </span>
          </p>
          <p class="flex justify-between">
            Stock Product:
            <span>
              {{ data.stok }}
            </span>
          </p>
          <p class="flex justify-between">
            QTY :
            <input
              class="bg-slate-300 border-solid border-2 border-slate-600 w-10 text-center"
              type="number"
              v-model="data.qty"
              :max="data.stok"
            />
          </p>
          <p>
            {{ data.qty > data.stok ? "Purchase Exceeding quantity " : null }}
          </p>
        </div>
      </div>
      <select class="input w-full" v-model="idCustomer">
        <option>Select Customer</option>
        <option
          v-for="(data, index) in data_customer"
          :key="index"
          :value="data.id"
        >
          {{ data.nama }}
        </option>
      </select>
      <button @click="handleSaveSales()" class="btn-primary">
        Save to Sales
      </button>
    </section>
  </main>
</template>
