<script>
import axios from "axios";

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
        tipe_diskon: "",
        ktp: "",
      },
      beforeKtp: "",
      previewImg: "",
    };
  },
  methods: {
    setData(data) {
      this.data = {
        nama: data.nama,
        contact: data.contact,
        email: data.email,
        alamat: data.alamat,
        diskon: data.diskon,
        tipe_diskon: data.tipe_diskon,
        ktp: `http://localhost:5020/public/${data.ktp}`,
      };
      (this.beforeKtp = `http://localhost:5020/public/${data.ktp}`),
        (this.previewImg = `http://localhost:5020/public/${data.ktp}`);
    },
    upload: function (e) {
      this.previewImg = URL.createObjectURL(e.target.files[0]);
      this.data = {
        ...this.data,
        ktp: e.target.files[0],
      };
    },
    async getData() {
      const response = await axios.get(
        `http://localhost:5020/api/customer/${this.userId}`
      );
      const data = response.data.data;
      this.setData(data);
    },
    async handleEdit() {
      try {
        let body = this.data;
        const formData = new FormData();

        if (body.ktp !== this.beforeKtp) {
          formData.set("ktp", body.ktp, body.ktp.name);
          formData.set("nama", body.nama);
          formData.set("contact", body.contact);
          formData.set("email", body.email);
          formData.set("alamat", body.alamat);
          formData.set("diskon", body.diskon);
          formData.set("tipe_diskon", body.tipe_diskon);

          const setting = {
            method: "PATCH",
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Basic ",
            },
          };

          await axios.patch(
            `http://localhost:5020/api/customer/image/${this.userId}`,
            formData,
            setting
          );
        } else {
          body = {
            nama: this.data.nama,
            contact: this.data.contact,
            email: this.data.email,
            alamat: this.data.alamat,
            diskon: this.data.diskon,
            tipe_diskon: this.data.tipe_diskon,
          };
          const setting = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              Authorization: "Basic ",
            },
          };
          await axios.patch(
            `http://localhost:5020/api/customer/${this.userId}`,
            body,
            setting
          );
        }

        this.$router.push("/customer");
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getData();
  },
  updated() {
    console.log(this.previewImg);
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
      <button @click="handleEdit()" class="btn-primary mt-4">Save</button>
    </section>
  </main>
</template>
