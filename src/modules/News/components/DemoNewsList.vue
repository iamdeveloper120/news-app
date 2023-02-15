<template>
  <div class="d-flex justify-space-evenly flex-wrap">
    <h3 class="my-auto">Headlines</h3>

    <div class="filter">
      <v-form ref="form">
        <v-text-field
          v-model="search"
          :rules="[(v) => (v && v.length > 0) || 'Item is required']"
          label="Search"
          required
          @update:model-value="getHeadlines"
        ></v-text-field>
      </v-form>
    </div>

    <div class="filter">
      <v-select
        v-model="selectedSource"
        :items="sourcesList"
        label="Filter"
        @update:model-value="filterHeadlines"
      />
    </div>
  </div>
  <div class="d-flex justify-space-evenly flex-wrap">
    <v-card
      v-for="(news, i) in filteredHeadlines"
      :key="i"
      class="ma-3"
      max-width="344"
      variant="outlined"
    >
      <v-img
        class="align-end text-white"
        height="200"
        :src="news.urlToImage"
        cover
      >
        <v-card-actions>
          <v-col cols="auto">
            <v-dialog
              transition="dialog-top-transition"
              width="auto"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                >Edit</v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-toolbar
                    color="primary"
                    :title="Edit - "
                  ></v-toolbar>
                  <v-card-text>
                    <div class="text-h2 pa-12">Hello world!</div>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn
                      variant="text"
                      @click="isActive.value = false"
                    >Close</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
          <v-spacer></v-spacer>
          <v-btn @click="redirectToNews(i, news)">View</v-btn>
        </v-card-actions>
        <v-card-subtitle class="pt-4"> {{ news.publishedAt }} </v-card-subtitle>
        <v-card-title>{{ news.title }}</v-card-title>
        <v-card-text>
          <p class="description">{{ news.description }}</p>
        </v-card-text>
      </v-img>
    </v-card>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { NewsService } from "../helpers/NewsService";

const search = ref();
const sources = ref();
const headlines = ref();
const store = useStore();
const sourcesList = ref();
const router = useRouter();
const selectedSource = ref();
const filteredHeadlines = ref();

const redirectToNews = (id, news) => {
  store.dispatch("setHeadline", news);
  console.log(store, news);
  router.push({
    name: "News",
    params: {
      id,
    },
  });
  // keep visited headlines in history
  visitedHeadlines(news);
};

const visitedHeadlines = (news) => {
  console
  localStorage.setItem('visitedHeadlines',JSON.stringify(news.title))
  if (localStorage.getItem("visitedHeadlines")){
    console.log(JSON.parse(localStorage.getItem("visitedHeadlines")))
  }
};

const getHeadlines = async (search) => {
  headlines.value = await NewsService.getHeadlines(search ? search : null);
  filteredHeadlines.value = headlines.value;
};

const filterHeadlines = (selectedSource) => {
  filteredHeadlines.value = headlines.value.filter(
    (news) => news.source.name === selectedSource
  );
};

const getSources = async () => {
  sources.value = await NewsService.getSourceList();
  sourcesList.value = sources.value.map((source) => source.name);
};

onMounted(() => {
  getSources();
  getHeadlines();
});
</script>

<style>
.description {
  line-clamp: 2;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.filter,
.filter .v-input__control {
  width: 250px;
}
</style>
