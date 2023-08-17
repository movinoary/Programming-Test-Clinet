<script>
import axios from "axios";
import Image_balnk from "../assets/images_blank.png";

export default {
  data() {
    return {
      userId: this.$route.params.id,
      data: {
        nama_item: "",
        unit: "",
        stok: "",
        harga_satuan: "",
        barang: "",
      },
      previewImg: Image_balnk,
    };
  },
  methods: {
    upload: function (e) {
      this.previewImg = URL.createObjectURL(e.target.files[0]);
      this.data = {
        ...this.data,
        barang: e.target.files[0],
      };
    },
    async handleAdd() {
      try {
        const body = this.data;
        const formData = new FormData();

        formData.set("barang", body.barang, body.barang.name);
        formData.set("nama_item", body.nama_item);
        formData.set("unit", body.unit);
        formData.set("stok", body.stok);
        formData.set("harga_satuan", body.harga_satuan);

        const setting = {
          method: "POST",
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Basic ",
          },
        };

        await axios.post(`http://localhost:5020/api/item/`, formData, setting);

        this.$router.push("/product");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <main class="flex flex-col gap-4 justify-center items-center">
    <section class="w-[50%]">
      <div class="flex flex-col gap-2">
        <p>Name Product</p>
        <input
          class="input"
          type="text"
          v-model="data.nama_item"
          placeholder="nama_item"
        />
      </div>
      <div class="flex flex-col gap-2">
        <p>Unit</p>
        <input
          class="input"
          type="number"
          v-model="data.unit"
          placeholder="unit"
        />
      </div>
      <div class="flex flex-col gap-2">
        <p>Stok</p>
        <input
          t
          class="input"
          ype="number"
          v-model="data.stok"
          placeholder="stok"
        />
      </div>
      <div class="flex flex-col gap-2">
        <p>Price</p>
        <input
          class="input"
          type="number"
          v-model="data.harga_satuan"
          placeholder="harga_satuan"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="img">
          <p>Input Product</p>
          <img
            class="h-[100px] w-[100px]"
            :src="previewImg"
            alt="previewImg"
            @if="previewImg"
          />
        </label>
        <input type="file" @change="upload" class="hidden" id="img" />
      </div>
      <button @click="handleAdd()" class="btn-primary mt-4">Save</button>
    </section>
  </main>
</template>
