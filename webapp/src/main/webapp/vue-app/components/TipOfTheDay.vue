<template>
  <v-app 
    v-show="show" 
    id="tipoftheday" 
    class="VuetifyApp">
    <h1>Tip of the day</h1>

    <!-- Another way to show/hide main tip pannel
    "{ display }" in this case defined inside data-->
    <!-- <form :style="{ display }"> -->
    <v-form v-show="!addTip" class="form-tip form-tip-view">
      <i class="btn-tip">?</i>
      <v-tooltip 
        bottom>
        <template v-slot:activator="{ on, attr }">
          <v-textarea
            v-model="tipInfo.text"
            v-bind="attr"
            readonly="true"
            rows="1"
            wrap="off"
            single-line="true"
            dense="true"
            outlined="true"
            solo-inverted="true"
            flat="true"
            hide-details="true"
            placeholder="Tip text..."
            v-on="on"/>
        </template>
        <span class="tip-hint">{{ tipInfo.text }}</span>
      </v-tooltip>
      <v-textarea
        v-show="showTipData" 
        v-model="tipInfo.poster" 
        rows="1" 
        wrap="off" 
        dense="true"
        outlined="true"
        hide-details="true"
        solo-inverted="true" 
        readonly="true"/>
      <v-textarea
        v-show="showTipData" 
        v-model="tipInfo.posted" 
        name="date" 
        rows="1" 
        wrap="off" 
        dense="true"
        hide-details="true"
        outlined="true"
        solo-inverted="true" 
        readonly="true"/>
      <div :class="{btnContainerShow: showTipData}" class="btn-container">
        <button 
          class="btn-tip" 
          type="button" 
          @click="getTipInfo">></button>
        <button 
          class="btn-tip" 
          type="button" 
          @click="showAddTipForm">+</button>
        <button 
          class="btn-tip" 
          type="button" 
          @click="closeTipForm">x</button>
      </div>
    </v-form>
    <v-form
      v-show="addTip"
      class="form-tip form-tip-post"
      enctype="multipart/form-data"
      method="post"
      name="text">
      <i class="btn-tip">?</i>
      <v-textarea 
        v-model="tipInfo.text" 
        rows="2" 
        wrap="off" 
        placeholder="Tip text..."
        dense="true"
        hide-details="true"
        auto-grow
        filled
        solo-inverted="true"/>
      <button 
        class="btn-tip" 
        type="button" 
        @click="saveAndCloseAddTipForm">Save</button>
      <button 
        class="btn-tip" 
        type="button" 
        @click="closeAddTipForm">x</button>
    </v-form>
  </v-app>
</template>

<script>
import { getRandomTip, postTip, url } from "../utils";

export default {
  data() {
    return {
      tipInfo: {
        id: null,
        posted: null,
        poster: null,
        text: ""
      },
      showTipData: false,
      addTip: false,
      show: true
    };
  },
  async created() {
        await this.getTipInfo()
    },
  methods: {

    /**
     * Write a recived value to data
     * check if tip creator is "system"
     * set a local date format
     * @function getTipInfo
     */

    getTipInfo: async function() {
      const tipInfo = await getRandomTip(`${url}/random/`);
      this.showTipData = tipInfo.poster !== "system";
      tipInfo.posted = new Date(tipInfo.posted).toLocaleDateString();
      this.tipInfo = tipInfo;
    },

    /** Shows the addTipForm and hides main form
     * cleanes up the input field
     * @function showAddTipForm
     */

    showAddTipForm: function() {
      this.addTip = true;
      this.tipInfo.text = "";
    },

    /** Close the addTipForm and open main form
     * set up the input field a new value
     * @function closeAddTipForm
     */

    closeAddTipForm: function() {
      this.addTip = false;
      this.tipInfo.text = "Let's find a tip for you";
    },

    /** Save a custom tip and close the addTipForm 
     * and open main form
     * @function saveAndCloseAddTipForm
     */

    saveAndCloseAddTipForm: function() {
      postTip(`${url}/tip/`, this.tipInfo.text);
      this.addTip = false;
    },

    /** Close the main tipForm 
     * @function closeTipForm
     */

    closeTipForm: function() {
      this.show = false;
    }
  }
};
</script>

<style>
#tipoftheday {
  box-sizing: border-box;
  color: red;
}
.form-tip {
  display: flex;
  flex-flow: row wrap;
  color: black;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  min-width: 155px;
}
textarea {
  resize: none !important;
  height: 100% !important;
  box-shadow: none;
  overflow: hidden !important;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-wrap: break-word;
 }
 textarea:focus {
   box-shadow: none;
   outline: none;
   height: 100%;
 }
.v-input__control {
  margin: 0 8px 8px;
}
.form-tip-post > .v-input > .v-input__control > .v-input__slot > .v-text-field__slot > textarea {
  white-space: break-spaces;
}
.form-tip-view > .v-input:nth-of-type(3) > .v-input__control > .v-input__slot > .v-text-field__slot {
  flex: 1;
  min-width: 95px;
  max-width: fit-content;
  }
.form-tip-view > .v-input:nth-of-type(2) > .v-input__control > .v-input__slot > .v-text-field__slot {
  flex: 1;
  min-width: 95px;
  max-width: fit-content;
  }
.form-tip-view > .v-input:first-of-type > .v-input__control > .v-input__slot > .v-text-field__slot {
  flex: 6;
  min-width: 150px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  content: "";
  position: relative;
}
.form-tip-view > .v-input:first-of-type > .v-input__control > .v-input__slot > .v-text-field__slot:before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(to right, transparent 80%, white);
} 
.btn-container {
  display: inline-flex;
  margin: auto;
  max-width: 120px;
}
.btnContainerShow {
  flex: 2;
}
.btn-tip {
  margin: 0 3px;
  padding: 0 3px;
  height: 28px;
  min-width: 28px;
  border: 1px solid black !important;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}
</style>