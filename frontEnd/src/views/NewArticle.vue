<template>
    <form-field :url="url"/>
</template>
<script>
//@ is an alias to /src
import formField from "@/components/formField.vue";

export default {
  name: "HomeView",
  components: {
    formField,
  },
  setup() {
    const url = "http://localhost:3000/api/post/add";
    return { url };
  },
};
</script>
