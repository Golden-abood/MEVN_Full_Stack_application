// Utilities
import { defineStore } from "pinia";
import { ref } from "vue";
type Post = {
  _id: any;
  title: String;
  category: String;
  image: String;
  content: String;
  created: Date;
};
const defaultPost = {
  _id: -1,
  title: "",
  category: "",
  image: "",
  content: "",
  created: "",
};
const baseuri = "http://localhost:4000";

export const useAppStore = defineStore("app", () => {
  const posts = ref<Post[]>([]);
  const post = ref<Post>({ ...defaultPost });

  const list = async () => {
    const res = await fetch(`${baseuri}/api/posts`);
    const data = await res.json();
    posts.value = data;
  };
  const getPost = async (id: any) => {
    const res = await fetch(`${baseuri}/api/posts/` + id);
    const data = await res.json();
    post.value = data;
  };

  const deletePost = async (id: any) => {
    await fetch(`${baseuri}/api/posts/` + id, {
      method: "DELETE",
    });
    await list();
  };

  const reset = () => {
    post.value = { ...post };
  };

  return {
    posts,
    post,
    defaultPost,
    list,
    reset,
    getPost,
    deletePost,
  };
});
