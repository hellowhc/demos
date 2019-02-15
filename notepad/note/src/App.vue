<template>
  <div id="app">
    <note-change></note-change>
    <note-list></note-list>
    <note-write></note-write>
    
    
  </div>
</template>

<script>

  import noteWrite from './components/noteWriteArt';
  import noteChange from './components/noteChangeArt';
  import noteList from './components/noteListArt';


  export default {
    name: 'App',
    components: {
    noteWrite,
    noteChange,
    noteList
    }
  }
</script>

<style>
*{
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
html,body{
  width: 100%;
  height: 100%;
  position: relative;
}
#app{
  width: 100%;
  height: 100%;

}

</style>
