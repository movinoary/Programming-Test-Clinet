<script>
import axios from "axios";
import Image_balnk from "../assets/images_blank.png";

export default {
  data() {
    return {
      userId: this.$route.params.id,
      data: {
        nama: "",
        contact: "",
        email: "",
        alamat: "",
        diskon: "",
        tipe_diskon: "select diskon",
        ktp: "",
      },
      previewImg: Image_balnk,
    };
  },
  methods: {
    upload: function (e) {
      this.previewImg = URL.createObjectURL(e.target.files[0]);
      this.data = {
        ...this.data,
        ktp: e.target.files[0],
      };
    },
    async handleAdd() {
      try {
        const body = this.data;
        const formData = new FormData();

        formData.set("ktp", body.ktp, body.ktp.name);
        formData.set("nama", body.nama);
        formData.set("contact", body.contact);
        formData.set("email", body.email);
        formData.set("alamat", body.alamat);
        formData.set("diskon", body.diskon);
        formData.set("tipe_diskon", body.tipe_diskon);

        const setting = {
          method: "POST",
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Basic ",
          },
        };

        await axios.post(
          `http://localhost:5020/api/customer/`,
          formData,
          setting
        );

        this.$router.push("/customer");
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
        <p>Name</p>
        <input
          class="input"
          type="text"
          v-model="data.nama"
          placeholder="nama"
        />
      </div>
      <div class="flex flex-col gap-2">
        <p>Contact</p>
        <input
          class="input"
          type="number"
          v-model="data.contact"
          placeholder="contact"
        />
      </div>
      <div class="flex flex-col gap-2">
        <p>Email</p>
        <input
          class="input"
          type="email"
          v-model="data.email"
          placeholder="email"
        />
      </div>
      <div class="flex flex-col gap-2">
        <p>Address</p>
        <input
          class="input"
          type="text"
          v-model="data.alamat"
          placeholder="address"
        />
      </div>
      <div class="flex flex-col gap-2">
        <p>Total Discount</p>
        <input
          class="input"
          type="number"
          v-model="data.diskon"
          placeholder="diskon"
        />
      </div>
      <div class="flex flex-col gap-2">
        <p>Type Discount</p>
        <select
          class="input"
          v-model="data.tipe_diskon"
          placeholder="tipe_disk"
        >
          <option hidden>select diskon</option>
          <option>persentase</option>
          <option>fix diskon</option>
        </select>
      </div>
      <div class="flex flex-col gap-2">
        <label for="img">
          <p>Input KTP</p>
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
