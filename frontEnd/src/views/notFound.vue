<template>
  <!-- a checkbox controls the style-->
  <input id="checkbox" type="checkbox" />
  <div class="card checkbox?black:white">
    <div class="card-body">
      <h2 class="article-title">
        test
        <!-- <router-link :to="'/articles/' + post.slug">
      {{ post.title }}
    </router-link> -->
      </h2>
      <div class="text-sm text-slate-400 text-muted mb-2">123</div>
    </div>
  </div>
</template>
<style scoped>
.black {
  background-color: black;
}
.white {
  background-color: red;
}
</style>