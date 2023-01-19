<template>
  <form>
    <div class="subcontainer flex flex-col self-center align-center">
      <div class="form-group flex flex-row w-full m-4">
        <div class="w-1/5 border-0 border-blue">
          <label for="title">Title</label>
        </div>
        <div class="w-4/5">
          <input required type="text" name="title" id="title" class="form-control w-11/12" v-model="title"/>
        </div>
      </div>
      <div class="form-group flex flex-row w-full m-4">
        <div class="w-1/5 border-0 border-blue">
          <label for="detail">Description</label>
        </div>
        <div class="w-4/5">
          <textarea v-model="detail" name="detail" id="detail" class="form-control w-11/12 h-28" ></textarea>
        </div>
      </div>
      <div class="form-group flex flex-row w-full m-4">
        <div class="w-1/5 border-0 border-blue">
          <label for="markdown">Markdown</label>
        </div>
        <div class="w-4/5">
          <textarea required name="markdown" id="markdown" class="form-control w-11/12 lg:h-96 md:h-64 sm:h-48"></textarea>
        </div>
      </div>
      <div class="control">
        <a href="/" class="btn btn-secondary">Cancel</a>
        <button type="button" class="btn btn-primary" @click="post">Save</button>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import { ref} from "vue";
import Cookies from "js-cookie";
export default{
  props: {
    url: {
      type: String,
      required: true,
    }
  },
  setup(props){
    const title = ref("");
    const detail = ref("");
    const markdown = ref("");
    let url = props.url;
    //use props to set url to post
    const post = async () => {
      try {
        const res = await axios.post(url, {
          title: title.value,
          detail: detail.value,
        },{
          headers: {
            "Content-Type": "application/json",
            'authorization': "Bearer " + Cookies.get("jwt"),
          },
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    return { title, detail, markdown, post };
  }
}
</script>
