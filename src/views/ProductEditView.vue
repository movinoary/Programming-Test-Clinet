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
      beforeBarang: "",
      previewImg: Image_balnk,
    };
  },
  methods: {
    setData(data) {
      this.data = {
        nama_item: data.nama_item,
        unit: data.unit,
        stok: data.stok,
        harga_satuan: data.harga_satuan,
        barang: `http://localhost:5020/public/${data.barang}`,
      };
      (this.beforeBarang = `http://localhost:5020/public/${data.barang}`),
        (this.previewImg = `http://localhost:5020/public/${data.barang}`);
    },
    upload: function (e) {
      this.previewImg = URL.createObjectURL(e.target.files[0]);
      this.data = {
        ...this.data,
        barang: e.target.files[0],
      };
    },
    async getData() {
      const response = await axios.get(
        `http://localhost:5020/api/item/${this.userId}`
      );
      const data = response.data.data;
      this.setData(data);
    },
    async handleEdit() {
      try {
        let body = this.data;
        const formData = new FormData();

        if (body.barang !== this.beforeBarang) {
          formData.set("barang", body.barang, body.barang.name);
          formData.set("nama_item", body.nama_item);
          formData.set("unit", body.unit);
          formData.set("stok", body.stok);
          formData.set("harga_satuan", body.harga_satuan);

          const setting = {
            method: "PATCH",
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Basic ",
            },
          };

          await axios.patch(
            `http://localhost:5020/api/item/image/${this.userId}`,
            formData,
            setting
          );
        } else {
          body = {
            nama_item: this.data.nama_item,
            unit: this.data.unit,
            stok: this.data.stok,
            harga_satuan: this.data.harga_satuan,
          };
          const setting = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              Authorization: "Basic ",
            },
          };
          await axios.patch(
            `http://localhost:5020/api/item/${this.userId}`,
            body,
            setting
          );
        }

        this.$router.push("/product");
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
      <button @click="handleEdit()" class="btn-primary mt-4">Save</button>
    </section>
  </main>
</template>
