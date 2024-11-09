<template>
  <v-container>
    <v-card>
      <v-card-title class="font-weight-bold mt-5 px-16">Add Post</v-card-title>

      <v-card-text>
        <form @submit.prevent="submit" class="px-10 py-10">
          <v-text-field
            v-model="post.title"
            variant="underlined"
            prepend-icon="mdi-account"
            :counter="10"
            label="title"
          ></v-text-field>

          <v-text-field
            v-model="post.category"
            variant="underlined"
            prepend-icon="mdi-menu"
            label="Category"
          ></v-text-field>

          <v-textarea
            v-model="post.content"
            variant="underlined"
            prepend-icon="mdi-message"
            label="Content"
          ></v-textarea>

          <v-file-input v-model="post.image"></v-file-input>

          <v-btn class="me-4" type="submit"> submit </v-btn>

          <v-btn @click="resetData"> clear </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
import router from "@/router";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
const appStore = useAppStore();
const { post } = storeToRefs(appStore);
const resetData = async () => {
  await appStore.reset();
};
resetData();

const submit = async () => {
  const formData = new FormData();
  formData.append("title", post.value.title);
  formData.append("category", post.value.category);
  formData.append("content", post.value.content);
  formData.append("image", post.value.image[0]);
  try {
    const res = await fetch(`http://localhost:4000/api/posts`, {
      method: "post",
      body: formData,
    });
    const data = res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    router.push("/");
  }
};
</script>
