<template>
  <div>
    <router-view class="view-container"></router-view>
    <tabbar class="tab-bar">
      <tabbar-item selected link="/" show-dot>
        <img slot="icon" src="../assets/images/video.png">
        <span slot="label">热映</span>
      </tabbar-item>
      <tabbar-item link="/find">
        <img slot="icon" src="../assets/images/remind.png">
        <span slot="label">找片</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../assets/images/personal-center.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem, Group, Cell} from 'vux'

  export default {
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    }
  }
</script>
<style lang="less" scoped>

</style>

