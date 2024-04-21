<template>
  <v-container class="mt-16">
    <v-row cols="3">
      <v-col v-for="post in posts" sm="4" :key="post?._id">
        <v-card
          class="pb-5 rounded-md px-1 pt-1"
          @click="router.push('/posts/' + post._id)"
        >
          <v-img
            :src="`http://localhost:4000/${post.image}`"
            class="rounded-md"
          >
          </v-img>
          <v-card-actions>
            <v-chip class="mt-4 border-2 rounded-lg" variant="outlined">{{
              post.category.toUpperCase()
            }}</v-chip>
          </v-card-actions>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text class="">{{ post.content }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from "../store/app";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const appStore = useAppStore();
const { posts } = storeToRefs(appStore);
const router = useRouter();
</script>
