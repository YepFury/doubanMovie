<template>
  <div id="app">
    <router-view class="h100"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'app',
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    background-color: #fff;
    #app {
      height: 100%;
    }
    .view-container {
      height: 100%;
    }
    .h100 {
      height: 100%;
    }
  }
  .vux-header {
    background-color: rgb(4, 190, 2) !important;
    position: fixed;
    top: 0;
    height: 46px;
    width: 100%;
    a {
      color: #fff !important;
    }
  }
</style>
