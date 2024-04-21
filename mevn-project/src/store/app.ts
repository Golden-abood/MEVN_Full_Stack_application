// Utilities
import { defineStore } from "pinia";
import { ref } from "vue";
type posts = {
  _id: any;
  title: String;
  category: String;
  image: String;
  content: String;
};

export const useAppStore = defineStore("app", () => {
  const posts = ref<posts[]>([]);
  const post = ref<posts>({});
  const list = async () => {
    const res = await fetch("http://localhost:4000/api/posts");
    const data = await res.json();
    posts.value = data;
    console.log(posts.value);
  };
  list();

  const getPost = async (id: any) => {
    const res = await fetch("http://localhost:4000/api/posts/" + id);
    const data = await res.json();
    post.value = data;
    console.log(post.value);
  };

  const deletePost = async (id: any) => {
    await fetch("http://localhost:4000/api/posts/" + id, {
      method: "DELETE",
    });
    await list();
  };

  return {
    posts,
    post,
    list,
    getPost,
    deletePost,
  };
});
