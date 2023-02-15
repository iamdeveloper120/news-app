import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
// As mentioned in the requirements, Your application has to use Vuetify.
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(store).use(router).use(vuetify).mount("#app");
