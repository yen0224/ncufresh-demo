<template>
  <form action="http://localhost:3000/api" method="POST">
    <form-field />
  </form>
</template>
<script>
//@ is an alias to /src
import formField from "@/components/formField.vue";

export default {
  name: "HomeView",
  components: {
    formField,
  },
};
</script>
