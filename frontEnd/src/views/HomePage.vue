<template>
  <div class="flex flex-col pt-24 ease-in-out duration-1000">
    <!--用 v-for 可以迭代-->
    <h1 class="text-3xl article-title self-center">所有文章</h1>

    <div v-for="post in posts" v-bind:key="post.ID" class="group">
      <div class="wrap-collabsible ease-in-out duration-1000">
        <input id="collapsible" class="toggle" type="checkbox" />
        <label for="collapsible" class="lbl-toggle text-center">
          <div class="card mb-0">
            <div class="card-body">
              <div class="article-desc mb-2">
                {{ post.ID }}
              </div>
              <hr />
              <h2 class="article-title">
                {{ post.Title }}
              </h2>
              <div class="text-sm text-slate-400 text-muted mb-2">
                {{ post.Author }}
              </div>
            </div>
          </div>
        </label>
        <div
          class="collapsible-content transition transform hidden group-hover:block ease-in-out duration-1000"
        >
          <div class="content-inner">
            {{ post.Detail }}
          </div>
          <div class="control">
            <p class="btn">
              <a :href="frontEndUrl + '/post/' + post.ID">View Comments</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref, reactive } from "vue";
const baseUrl = "http://localhost:3000/api/";
const frontEndUrl = "http://localhost:5173";
export default {
  setup() {
    // 雖然是陣列，但這裡用ref因為內容不會改變
    const posts = ref([]);
    // 這裡用reactive因為內容會改變
    const showModal = reactive([100]);
    // some functions
    const toggleModal = (id) => {
      //console.log("toggle Modal", id);
      showModal[id] = !showModal[id];
    };
    const getPosts = async () => {
      const response = await axios.get(baseUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      posts.value = response.data;
      //console.log(response.data);
      //console.log(posts.value);
    };
    getPosts();
    return { posts, showModal, toggleModal, frontEndUrl };
  },
};
</script>
