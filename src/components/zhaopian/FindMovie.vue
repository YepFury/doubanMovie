<template>
  <div class="h100">
    <x-button link="/search">
      <icon type="search"></icon>
      电影/电视剧/影人
    </x-button>
    <h5>
      <div class="left-arrow" @click="toggleIndex()"></div>
      {{titleList[currentIndex]}}
      <div class="right-arrow" @click="toggleIndex()"></div>
    </h5>
    <div class="swiper-container">
      <swiper v-model="currentIndex" :show-dots="false" height="100%">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <scroller lock-x height="100%" @on-pulldown-loading="pageNo = 1;getArticleList(1, catId)" ref="scrollerBottom" :scroll-bottom-offst="200">
            <div class="box2">
              <div class="tab-swiper vux-center">
                <ul>
                  <li class="movie-item" v-for="(movie,i) in item" :key="movie.id" @click="handleSendParams(movie.id)">
                    <i>{{i + 1}}</i>
                    <img :src="movie.images.small" alt="">
                    <div>
                      <h6>{{movie.title}}</h6>
                      <p v-if="movie.rating.average !== 0">
                        <rater v-model="movie.rating.average/2" :font-size="15" disabled></rater>
                        {{movie.rating.average}}分
                    <br>
                        {{movie.collect_count}}人评价



                      </p>
                      <p v-else>暂无评分</p>
                    </div>
                  </li>
                </ul>
              </div>
              <load-more tip="loading"></load-more>
            </div>
          </scroller>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
  import {Swiper, SwiperItem, XButton, Rater, Icon, Scroller, LoadMore, TransferDom} from 'vux'
  export default {
    components: {
      Swiper,
      SwiperItem,
      XButton,
      Rater,
      Icon,
      Scroller,
      LoadMore
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        titleList: ['豆瓣 Top250', '北美票房榜'],
        swiperList: [[], []],
        currentIndex: 0,
        showList1: true,
        scrollTop: 0,
        onFetching: false,
        bottomCount: 20,
        pullConfig:{upContent:'上拉加载更多', downContent: '释放后加载'}
      }
    },
    methods: {
      onIndexChange (index) {
        this.currentIndex = index
      },
      toggleIndex() {
        this.currentIndex == 1 ? 0 : 1;
      },
      handleSendParams(id) {
        this.$router.push({
          path: '/movie-detail',
          name: 'detail',
          params: {
            id: id
          }
        })
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            this.bottomCount += 10
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      },
    },
    created() {
      this.$ajax.get('/top250').then(res => {
        this.swiperList[0] = res.data.subjects
      })
      this.$ajax.get('/us_box').then(res => {
        console.log(res.data);
        res.data.subjects.forEach((item, index) => {
          this.swiperList[1].push(item.subject)
        })
      })
    }
  }
</script>

<style lang="less" scoped>
  h5 {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
  }

  .left-arrow {
    position: relative;
    width: 40px;
    height: 100%;
    float: left;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 10px;
      left: 10px;
      width: 20px;
      height: 20px;
      background: url(../../assets/images/left.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .right-arrow {
    position: relative;
    width: 40px;
    height: 100%;
    float: right;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 10px;
      left: 10px;
      width: 20px;
      height: 20px;
      background: url(../../assets/images/right.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .swiper-container {
    height: calc(~"100% - 82px") !important;
  }

  .vux-swiper, .vux-slider, .vux-swiper-item {
    height: 100% !important;
  }

  .vux-swiper-item {
    overflow-y: scroll;
  }

  .weui-loadmore {
    width: 100%;
    margin: 0;
  }

  .movie-item {
    height: 80px;
    display: flex;
    padding: 0 10px 10px;
    i {
      flex: 1;
      font-size: 14px;
      font-style: normal;
      text-align: center;
    }
    img {
      flex: 1;
      height: 70px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
    }
    & > div {
      flex: 4;
      margin-left: 15px;
      border-bottom: 1px solid #ececec;
      h6 {
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      p {
        font-size: 12px;
      }
    }
  }

</style>
