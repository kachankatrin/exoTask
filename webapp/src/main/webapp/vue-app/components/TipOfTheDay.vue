<template>
  <v-app id="tipoftheday" class="VuetifyApp">
    <!-- TODO app markup here -->
    <h1>{{ tip }}</h1>
    <form>
      <i>?</i>
      <textarea placeholder="Tip text..."></textarea>
      <select>
        <option value>--Please choose user--</option>
        <option value="system">System</option>
        <option value="viaUser">User</option>
      </select>
      <input type="date">
      <button type="button" @click="getRandomTip">></button>
      <button type="button">+</button>
      <button type="button">x</button>
    </form>
  </v-app>
</template>

<script>
// TODO app scripts here
import { getRandomTip } from "../utils";

export default {
  data() {
    return {
      tip: "Hello world! Here will be tip of the day :)"
    };
  },
  methods: {
    getRandomTip
  }
};
</script>

<style>
/* TODO app scripts here */
#tipoftheday {
  color: red;
}
form {
  display: flex;
  color: black;
}
</style>