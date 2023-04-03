<template>
  <div>
    <div>
      <h1>Get Waste Data</h1>
      <button style="margin: 5px" @click="downloadWasteData">Download Waste Data</button>
      <div></div>
      <button style="margin: 5px" @click="downloadMetalAndPlasticStats">
        Download Metal and Plastic Statistics
      </button>
    </div>
    <div>
      <h1>Change Waste Data / translations</h1>
      <button style="margin: 5px" @click="downloadTranslationsExcel">
        Download Waste Data
      </button>
      <div></div>
      <div>
        <input type="file" ref="fileInputRef" @change="handleFileInputChange" />
        <button @click="uploadTranslationsExcel">Upload</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const fileInputRef = ref(null);
    const selectedFile = ref(null);
    const axios = require("axios");
    const base64 = require("base-64");

    const downloadWasteData = async () => {
      try {
        const res = await fetch(process.env.VUE_APP_DOWNLOAD_WASTE_DATA);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "waste-data.xlsx");
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        console.error(err);
      }
    };

    const downloadMetalAndPlasticStats = async () => {
      try {
        const res = await fetch(process.env.VUE_APP_DOWNLOAD_MP_STATS);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "metal-and-plastic-stats.xlsx");
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        console.error(err);
      }
    };

    const downloadTranslationsExcel = async () => {};

    const uploadTranslationsExcel = async () => {
      let token = process.env.VUE_APP_GITHUB_TOKEN;
      let file = selectedFile.value;
      console.log(file);
      var content = base64.encode(file);
      console.log(content);
      uploadFileApi(token, content);
    };

    const uploadFileApi = (token, content) => {
      var data = JSON.stringify({
        message: "txt file",
        content: `${content}`,
      });

      var config = {
        method: "put",
        url: process.env.VUE_APP_GITHUB_LINK,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const handleFileInputChange = () => {
      selectedFile.value = fileInputRef.value.files[0];
    };

    return {
      fileInputRef,
      selectedFile,
      downloadWasteData,
      downloadMetalAndPlasticStats,
      downloadTranslationsExcel,
      uploadTranslationsExcel,
      handleFileInputChange,
    };
  },
};
</script>
