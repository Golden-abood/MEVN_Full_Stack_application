<template>
  <v-container class="mt-16">
    <v-row>
      <v-col v-for="post in posts" sm="3" :key="post?._id">
        <v-card
          class="pb-5 rounded-xl px-1 pt-1"
          @click="router.push('/posts/' + post._id)"
        >
          <v-img
            :src="`http://localhost:4000/${post.image}`"
            class="rounded-xl"
          >
          </v-img>
          <v-card-actions>
            <v-chip
              class="mt-4 border-2 rounded-lg text-uppercase"
              variant="outlined"
              >{{ post.category }}</v-chip
            >
          </v-card-actions>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text class="desc">{{ post.content }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div>
      <div v-if="loading">Loading</div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAppStore } from "../store/app";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const appStore = useAppStore();
const { posts } = storeToRefs(appStore);
const router = useRouter();
const loading = ref(false);
const list = async () => {
  loading.value = true;
  const res = await fetch(`http://localhost:4000/api/posts`);
  const data = await res.json();
  posts.value = data;
  loading.value = false;
};
list();
</script>

<style>
.desc {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
}
</style>
