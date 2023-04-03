<template>
  <div>
    <h1>Get Waste Data</h1>
    <button style="margin:5px" @click="downloadWasteData">Download Waste Data</button>
    <div></div>
    <button style="margin:5px" @click="downloadMetalAndPlasticStats">Download Metal and Plastic Statistics</button>
  </div>
</template>

<script>
export default {
  methods: {
    async downloadWasteData() {
      try {
        const res = await fetch(process.env.VUE_APP_DOWNLOAD_WASTE_DATA);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'waste-data.xlsx');
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        console.error(err);
      }
    },

    async downloadMetalAndPlasticStats() {
      try {
        const res = await fetch(process.env.VUE_APP_DOWNLOAD_MP_STATS);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'metal-and-plastic-stats.xlsx');
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>