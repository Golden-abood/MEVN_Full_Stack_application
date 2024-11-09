<template>
  <div>
    <div class="text-center py-2 border-b-md border-b-grey border-b-solid">
      <p class="font-weight-bold">Golden Developer</p>
      <p class="text-grey">MEVN FULL STACK APP</p>
    </div>

    <v-list density="compact">
      <v-list-item
        v-for="(item, i) in items"
        :to="item.link"
        :key="i"
        color="primary"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title class="py-4">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
type itemsType = {
  icon: string;
  title: string;
  link: string;
};

const items: itemsType[] = [
  {
    icon: "mdi-home",
    title: "Home",
    link: "/",
  },
  {
    icon: "mdi-archive-plus",
    title: "Add Post",
    link: "/add-post",
  },
  // {
  //   icon: "mdi-heart-flash",
  //   title: "About",
  //   link: "/About",
  // },
];
</script>

<style scoped></style>
