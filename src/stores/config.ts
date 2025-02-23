import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
  state: () => ({
    host: "http://192.168.1.5:11434",
    model: "deepseek-r1:8b",
    mid: 0,
  }),
  getters: {
    //
  },
  actions: {
    incr() {
      return this.mid++;
    },
    save() {
      localStorage.setItem("config", JSON.stringify(this.$state));
    },
    load() {
      try {
        const config = JSON.parse(localStorage.getItem("config") || "{}");
        Object.assign(this.$state, config);
      } catch (e) {
        console.error(e);
      }
    },
  },
});
