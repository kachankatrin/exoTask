<template>
  <v-app 
    v-show="show" 
    id="tipoftheday" 
    class="VuetifyApp">

    <!-- Another way to show/hide main tip pannel
    "{ display }" in this case defined inside data-->
    <!-- <form :style="{ display }"> -->
    <v-form v-show="!addTip" class="form-tip form-tip-view">
      <button 
        id="ComposerHintCloseBtn"
        class="btn-tip" 
        type="button">
        <i class="uiIconQuestion uiIconLightGray"></i>
      </button>
      <v-tooltip 
        top>
        <template 
          v-slot:activator="{ on, attr }">
          <v-text-field
            v-model="tipInfo.text"
            v-bind="attr"
            readonly="true"
            single-line="true"
            dense="true"
            outlined
            background-color="#f3f3f3"
            hide-details="true"
            placeholder="Tip text..."
            class="custom-text-field"
            v-on="on"/>
        </template>
        <span class="tip-hint">{{ tipInfo.text }}</span>
      </v-tooltip>
      <v-text-field
        v-show="showTipData" 
        v-model="tipInfo.poster"
        background-color="#f3f3f3" 
        wrap="off" 
        dense="true"
        outlined
        hide-details="true"
        class="custom-text-field"
        readonly="true"/>
      <v-text-field
        v-show="showTipData" 
        v-model="tipInfo.posted" 
        background-color="#f3f3f3"
        name="date" 
        wrap="off" 
        dense="true"
        hide-details="true"
        outlined
        class="custom-text-field"
        readonly="true" />
      <div :class="{btnContainerShow: showTipData}" class="btn-container">
        <button 
          id="ComposerHintCloseBtn"
          class="btn-tip" 
          type="button" 
          @click="getTipInfo"><i class="uiIconNextArrow uiIconLightGray"></i></button>
        <button 
          id="ComposerHintCloseBtn"
          class="btn-tip" 
          type="button" 
          @click="showAddTipForm"><i class="uiIconSimplePlusMini uiIconLightGray"></i></button>
        <button 
          id="ComposerHintCloseBtn"
          class="btn-tip" 
          type="button" 
          @click="closeTipForm"><i class="uiIconClose uiIconLightGray"></i></button>
      </div>
    </v-form>
    <v-form
      v-show="addTip"
      class="form-tip form-tip-post"
      enctype="multipart/form-data"
      method="post"
      name="text">
      <button 
        id="ComposerHintCloseBtn"
        class="btn-tip" 
        type="button">
        <i class="uiIconQuestion uiIconLightGray"></i>
      </button>
      <v-textarea
        v-model="tipInfo.text" 
        background-color="#f3f3f3"
        no-resize
        auto-grow
        rows="2"
        dense
        placeholder="Tip text..."
        hide-details="true"
        outlined
        class="custom-text-field"/>
      <div class="share-buttons-down button-group clearfix btn-tip">
        <button 
          id="ShareButton"
          class="share-button btn btn-primary" 
          type="button" 
          @click="saveAndCloseAddTipForm">Save</button>
      </div>
      <button 
        id="ComposerHintCloseBtn"
        class="btn-tip" 
        type="button" 
        @click="closeAddTipForm"><i class="uiIconClose uiIconLightGray"></i></button>
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

<style scoped>
#tipoftheday {
  box-sizing: border-box;
}
.form-tip {
  display: flex;
  flex-flow: row wrap;
  color: black;
  background-color: white;
  border: 1px solid #b6b6b6;
  padding: 10px;
  min-width: 155px;

}
 .custom-text-field.v-text-field--outlined >>> fieldset {
  border-color: #b6b6b6 !important;
  top: 0px;
  padding-left: 0;
}
.custom-text-field.v-text-field--outlined >>> legend {
  display: none;
}
.custom-text-field.v-text-field--outlined >>> input[type="text"] {
  margin-bottom: 0;
  box-shadow: none;
  padding-left: 8px;
  padding-right: 1px;
  height: fit-content;
}
.custom-text-field.v-text-field--outlined >>> input[type="text"]::placeholder {
  overflow: hidden;
}
.form-tip-view > .v-input:first-of-type >>> input[type="text"]:focus {
  box-shadow: none;
  border: 0px solid transparent !important;
  outline: none;
}
.form-tip-view > .v-input:first-of-type >>> .v-text-field__slot::before:active {
  box-shadow: none;
   border: none !important;
}
.custom-text-field.v-text-field--outlined >>> .v-input__slot {
    align-items: center;
    min-height: fit-content;
}
.custom-text-field.v-text-field.v-text-field--enclosed >>> .v-input__slot {
  padding: 0 0;
}
.custom-text-field.v-textarea >>> textarea {
  resize: none;
  box-shadow: none;
  padding: 4px 0px 4px 8px !important;
  padding-right: 0px;
  margin-bottom: 0px;
  border-radius: inherit;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: break-spaces;
  overflow-wrap: anywhere;
  max-width: calc(100% - 12px);
}
.custom-text-field.v-textarea {
  margin: 0 4px;
}
.custom-text-field.v-text-field__slot {
  margin-right: 0;
  border-radius: inherit;
}
.form-tip-post > .v-input > .v-input__control > .v-input__slot > .v-text-field__slot > .v-text-field__slot {
  white-space: break-spaces;
  overflow-wrap: break-word;
}
.form-tip-view > .v-input:nth-of-type(3) {
  flex: 2;
  min-width: 95px;
  max-width: fit-content;
  margin: 0 4px 4px;
  }
.form-tip-view > .v-input:nth-of-type(2) {
  flex: 1;
  min-width: 55px;
  max-width: fit-content;
  margin: 0 4px 4px;
  }
.form-tip-view > .v-input:first-of-type {
  flex: 6;
  min-width: 150px;
  max-width: 100%; 
  margin: 0 4px 4px;
}
.form-tip-view > .v-input:first-of-type >>> .v-text-field__slot {
  overflow: hidden;
  text-overflow: ellipsis;
  content: "";
  position: relative;
  border-radius: inherit;
}
.form-tip-view > .v-input:first-of-type >>> .v-text-field__slot::before {
  content: attr(tooltip);
  width: calc(100% - 1px);
  height: calc(100% - 2px);
  position: absolute;
  left: 0;
  top: 1px;
  background: linear-gradient(to right, transparent 80%, #f3f3f3);
  border-radius: inherit;
  pointer-events: none;
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
  margin: 0 4px 4px;
  padding: 3px;
  height: 28px;
  flex: 1;
  min-width: 28px;
  max-width: fit-content;
  border: 1px solid #b6b6b6 !important;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}
.form-tip-view > .btn-tip:first-of-type {
  margin: 2px;
}
.form-tip-post > div.btn-tip {
  border: none !important;
  padding: 0;
}
.btn-tip:hover [class^="uiIcon"]{
  color: #2f5e92;
}
.form-tip-post > .btn-tip > .btn-primary {
  color: white;
  font-weight: bold;
}
.btn-primary:hover {
  background-color: #2f5e92 !important;
}
[class^="uiIcon"] {
  opacity: 0.5;
  color: #626262;
}
[class^="uiIcon"]:hover {
    opacity: 1;
    filter: alpha(opacity=100);
    color: #999999 !important;
}
/* [class^="uiIcon"]:hover {
  color: #2f5e92;
} */
@media only screen and (max-width: 530px) {
  .form-tip {
    display: grid;
  }
  .form-tip-view > .btn-tip:first-of-type {
    grid-row-start: 5;
    justify-self: end;
    margin-top: 0px;
  }
  .form-tip-view > .v-input:first-of-type  {
    grid-column: 1 / span 2;
  }
  .form-tip-view > .v-input:nth-of-type(2) {
    grid-row: 3;
    grid-column: 1 / span 2;
    max-width: 100%;
    
  }
  .form-tip-view > .v-input:nth-of-type(3) {
    grid-row: 4;
    grid-column: 1 / span 2;
    max-width: 100%;
  }
  .btn-container {
    grid-row-start: 5;
    margin: 0;
  }
  .form-tip-post > .btn-tip{
    grid-row: 2 / span 1;
  }
  .form-tip-post >>> .custom-text-field.v-textarea {
    margin-bottom: 10px;
    grid-column: 1 / span 3;
  }
  .form-tip-post > div.btn-tip:nth-of-type(2){
    grid-row: 2 / span 1;
    max-width: 100%;
  }
  .form-tip-post > .btn-tip:nth-of-type(2) > .btn-primary {
    width: 100%;
  }
  .form-tip-post > .btn:nth-of-type(3) {
    grid-row: 2 / span 1;
  }
  .form-tip-post > .btn-tip:first-of-type {
    justify-self: end;
  }
}
</style>