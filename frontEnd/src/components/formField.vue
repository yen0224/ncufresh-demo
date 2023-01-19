<template>
  <div class="subcontainer flex flex-col self-center align-center">
    <div class="form-group flex flex-row w-full m-4">
      <div class="w-1/5 border-0 border-blue">
        <label for="title">Title</label>
      </div>
      <div class="w-4/5">
        <input
          required
          type="text"
          name="title"
          id="title"
          class="form-control w-11/12"
        />
      </div>
    </div>
    <div class="form-group flex flex-row w-full m-4">
      <div class="w-1/5 border-0 border-blue">
        <label for="description">Description</label>
      </div>
      <div class="w-4/5">
        <textarea
          name="description"
          id="description"
          class="form-control w-11/12 h-28"
        ></textarea>
      </div>
    </div>
    <div class="form-group flex flex-row w-full m-4">
      <div class="w-1/5 border-0 border-blue">
        <label for="markdown">Markdown</label>
      </div>
      <div class="w-4/5">
        <textarea
          required
          name="markdown"
          id="markdown"
          class="form-control w-11/12 lg:h-96 md:h-64 sm:h-48"
        ></textarea>
      </div>
    </div>
    <div class="control">
      <a href="/" class="btn btn-secondary">Cancel</a>
      <button type="submit" class="btn btn-primary">Save</button>
    </div>
  </div>
</template>

