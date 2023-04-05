<template>
  <div style="padding: 10px">
    <div>
      <h1>Get Waste Data</h1>
      <button style="margin: 5px" @click="downloadWasteData">Download Waste Data</button>
      <div></div>
      <button style="margin: 5px" @click="downloadMetalAndPlasticStats">
        Download Metal and Plastic Statistics
      </button>
    </div>
    <!-- <div>
      <h1>Change Waste Items / translations</h1>
      <button style="margin: 5px" @click="downloadTranslationsExcel">
        Download Waste Data
      </button>
      <div></div>
      <div>
        <input type="file" ref="fileInputRef" @change="handleFileInputChange" />
        <button @click="uploadTranslationsExcel">Upload</button>
      </div>
    </div> -->
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

    const uploadTranslationsExcel = async () => {
      let token = process.env.VUE_APP_GITHUB_TOKEN;
      let file = selectedFile.value;
      console.log(file);
      var content = base64.encode(file);
      console.log(content);
      uploadFileApi(token, content);
    };

    const uploadFileApi = (token, content) => {
      const data = JSON.stringify({
        message: "txt file",
        content: `${content}`,
      });

      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: data,
      };

      fetch(process.env.VUE_APP_GITHUB_LINK, requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(JSON.stringify(data)))
        .catch((error) => console.log(error));
    };

    const downloadTranslationsExcel = async () => {
      const file = await getFileApi(process.env.VUE_APP_GITHUB_TOKEN, process.env.VUE_APP_GITHUB_LINK);
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = this.filepath;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const getFileApi = (token, filepath) => {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      return fetch(
        `${process.env.VUE_APP_GITHUB_LINK}/contents/${filepath}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          const content = atob(data.content);
          return new Blob([content], { type: data.encoding });
        })
        .catch((error) => console.log(error));
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
