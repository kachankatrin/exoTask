<template>
  <v-app id="tipoftheday" class="VuetifyApp">
    <!-- TODO app markup here -->
    <!-- <h1>{{ tipInfo.text }}</h1> -->
    <form>
      <i>?</i>
      <textarea v-model="tipInfo.text" placeholder="Tip text..."></textarea>
      <textarea v-show="show" v-model="tipInfo.poster" disabled></textarea>
      <textarea v-show="show" v-model="tipInfo.posted" disabled></textarea>
      <button type="button" @click="getTipInfo">></button>
      <button type="button" @click="showAddTipForm">+</button>
      <button type="button" @click="closeAddTipForm">x</button>
    </form>
    <form v-show="addTip" id="post" enctype="multipart/form-data" method="post" name="text">
      <i>?</i>
      <textarea v-model="tipInfo.text" placeholder="Tip text..."></textarea>
      <button type="button" @click="postTip(tipInfo.text)">Save</button>
      <button type="button" @click="closeAddTipForm">x</button>
    </form>
  </v-app>
</template>

<script>
// TODO app scripts here
import { getRandomTip, postTip } from "../utils";

export default {
  data() {
    return {
      tipInfo: {
        id: "",
        posted: "$DATETIME",
        poster: "via$USER",
        text: "Hello world! Here will be tip of the day :)"
      },
      show: true,
      addTip: false
    };
  },
  methods: {
    /**
     * Rite a recived value to data 
     * check if tip creator is "system"
     * set a local date format
     * @customFunction
     */

    getTipInfo: async function() {
      const tipInfo = await getRandomTip();
      this.show = tipInfo.poster !== "system" ? true : false;
      tipInfo.posted = new Date(tipInfo.posted).toLocaleDateString();
      this.tipInfo = tipInfo;
    },
    postTip,
    showAddTipForm: function() {
      this.addTip = true;
      this.tipInfo.text = "";
    },
    closeAddTipForm: function() {
      this.addTip = false;
    }
  }
};
</script>

<style>
/* TODO app scripts here */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#tipoftheday {
  color: red;
}
form {
  display: flex;
  color: black;
  align-items: center;
}
textarea {
  resize: none !important;
  width: 100%;
  height: min-content;
  background-color: rgb(168, 89, 89) !important;
  padding: 0;
  text-align: center;
}
textarea::placeholder {
  /* background-color: white; */
}
button {
  height: fit-content;
}
i {
  height: fit-content;
}
</style>
