<template>
  <div class="h100">
    <x-button link="/search">
      <icon type="search"></icon>
      电影/电视剧/影人

    </x-button>
    <tab>
      <tab-item :class="{color:currentIndex === n}" @on-item-click="handleGetData(tab.id,n)"
                v-for="(tab,n) in tabLists" :key="tab.id">{{tab.name}}
      </tab-item>
    </tab>
    <div class="container">
      <div class="movie-item" v-for="(movie,index) in moveLists" :key="movie.id" @click="handleSendParams(movie.id)">
        <img :src="movie.images.medium" alt="">
        <div class="movie-info">
          <h5>{{movie.title}}</h5>
          <rater v-model="movie.rating.average/2" :font-size="15" disabled></rater>
          <p>
            导演：<span v-for="(director,i) in movie.directors">{{director.name}}</span>
          </p>
          <p>
            演员：<span v-for="(cast,m) in movie.casts">{{cast.name}}/</span>
          </p>
        </div>
        <div class="watch">
          <span style="color: #04BE02;" v-show="currentIndex === 0">{{movie.collect_count | fix}}人<br>看过</span>
          <span style="color: #ff8900;" v-show="currentIndex === 1">{{movie.collect_count | fix}}人<br>想看</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Tab,
    TabItem,
    Rater,
    Loading,
    XButton,
    Icon,
    TransferDomDirective as TransferDom
  }from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Tab,
      TabItem,
      Rater,
      Loading,
      XButton,
      Icon
    },
    data () {
      return {
        currentIndex: 0,
        tabLists: [
          {
            id: 'in_theaters',
            name: '正在热映'
          },
          {
            id: 'coming_soon',
            name: '即将上映'
          }
        ],
        moveLists: [],
        loading: true
      }
    },
    methods: {
      handleSendParams(id) {
        this.$router.push({
          path: '/movie-detail',
          name: 'detail',
          params: {
            id: id
          }
        })
      },
      handleGetData(id, index) {
        if (index === 0) {
          this.currentIndex = 0
        }
        else {
          this.currentIndex = 1
        }
        this.$vux.loading.show({
          text: 'Loading'
        })
        this.moveLists = [];
        this.$ajax.get('/' + id).then(res => {
          this.moveLists = res.data.subjects;
          this.$vux.loading.hide()
        })
      }
    },
    mounted() {
      this.handleGetData('in_theaters', 0)
    },
    filters: {
      fix(value) {
        return value > 10000 ? ((value / 10000).toFixed(1) + '万') : value;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';

  .vux-tab .vux-tab-item {
    background-color: #fff !important;
  }

  .color {
    color: #04BE02 !important;
    border-bottom: 3px solid #04BE02 !important;
  }

  .container {
    height: calc(~"100% - 136px");
    overflow: scroll;
  }

  .movie-item {
    width: 100%;
    height: 146px;
    padding: 15px;
    border-bottom: 1px solid #ccc;
    display: flex;
    img {
      height: 100%;
      flex: 3;
    }
    .movie-info {
      flex: 6;
      padding: 0 15px;
      h5 {
        font-size: 15px;
      }
      p {
        font-size: 12px;
        color: #888;
      }
    }
    .watch {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      font-size: 12px;
    }
  }

</style>
