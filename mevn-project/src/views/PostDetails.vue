<template>
  <v-container class="mt-16">
    <v-card class="d-flex justify-space-between align-center">
      <div class="max-w-25">
        <v-btn
          color="success"
          variant="plain"
          prepend-icon="mdi-arrow-left"
          @click="router.push('/')"
          >Back</v-btn
        >
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-text class="text-lg">{{ post.content }}</v-card-text>
        <v-card-actions>
          <v-btn variant="text" color="primary" prepend-icon="mdi-pencil"
            >Edit</v-btn
          >
          <v-btn
            variant="text"
            color="error"
            prepend-icon="mdi-delete"
            @click="appStore.deletePost(post._id), router.push('/')"
            >Delete</v-btn
          >
        </v-card-actions>
      </div>
      <img :src="'http://localhost:4000/' + post.image" />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const appStore = useAppStore();
const { post } = storeToRefs(appStore);

const router = useRouter();
const route = useRoute();

appStore.getPost(route.params.id);
</script>

<style scoped></style>
