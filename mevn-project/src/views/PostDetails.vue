<template>
  <v-container class="mt-16">
    <v-card class="md:d-flex align-center pb-10">
      <div class="max-w-25">
        <v-btn
          color="success"
          variant="plain"
          prepend-icon="mdi-arrow-left"
          @click="router.push('/')"
          >Back</v-btn
        >
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-text>
          <p>{{ post.content }}</p>
          <span class="mt-4 d-block text-grey">{{
            formateDate(post.created)
          }}</span>
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="text"
            color="primary"
            prepend-icon="mdi-pencil"
            @click="router.push(`/posts/${post._id}/update`)"
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
      <div class="d-flex justify-center">
        <img
          class="img_rounded w-full"
          :src="'http://localhost:4000/' + post.image"
        />
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { formateDate } from "@/utils";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const appStore = useAppStore();
const { post } = storeToRefs(appStore);

const router = useRouter();
const route = useRoute();

appStore.getPost(route.params.id);
</script>

<style>
.img_rounded {
  border-radius: 30px !important;
  border: 3px #5db460 solid;
}
</style>
