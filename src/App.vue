<template>
  <div id="app" class="container relative flex flex-col  font-Roboto  items-center p-4 rounded-lg bg-todo-main shadow-[0_0_35px_rgb(72,67,67,0.5)]">
    <ToDoList  />
    <ToDoImput />
  </div>
</template>

<script>
import ToDoImput from './components/ToDoImput.vue';
import ToDoList from './components/ToDoList.vue';

export default {
  name: 'App',
  components: {
    ToDoImput,
    ToDoList
}
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
