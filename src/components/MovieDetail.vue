<template>
  <div class="h100">
    <x-header class="header" :right-options="{showMore: true}" @on-click-more="showMenus = true">电影</x-header>
    <div class="movie">
      <div class="poster">
        <img :src="movieData.images.small" alt="">
      </div>
      <div class="movie-info">
        <div class="base-info">
          <h4>{{movieData.title}}</h4>
          <p>{{movieData.year}} <span v-for="(genre,i) in movieData.genres" :key="i"> / {{genre}}</span></p>
          <p>{{movieData.countries[0]}} / <span v-if="movieData.subtype === 'tv'">共{{movieData.episodes_count}}集</span>
          </p>
          <p>演员：<span v-for="(cast,m) in movieData.casts" :key="cast.id">{{cast.name}} / </span></p>
        </div>
        <div class="rate-info">
          <h6>豆瓣评分</h6>
          <div class="rating">{{movieData.rating.average}}</div>
          <rater v-model="movieData.rating.average/2" :font-size="15" disabled></rater>
          <p>{{movieData.ratings_count}}人</p>
        </div>
      </div>
      <div class="introduce">
        <div class="label">简介</div>
        <div class="intro" ref="introduce">{{movieData.summary}}</div>
        <p @click="toggleIntro">{{isOpenText}}</p>
      </div>
      <div class="people">
        <div class="label">影人</div>
        <ul>
          <li v-for="(director,index) in directors" :key="director.id">
            <img :src="director.avatars.small" alt="">
            <p>{{director.name}}</p>
            <p>{{director.name_en}}</p>
          </li>
          <li v-for="(cast,index) in casts" :key="cast.id">
            <img :src="cast.avatars.small" alt="">
            <p>{{cast.name}}</p>
            <p>{{cast.name_en}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Rater, TransferDom} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Rater
    },
    data () {
      return {
        menus: {
          menu1: 'Take Photo',
          menu2: 'Choose from photos'
        },
        showMenus: false,
        movieData: null,
        isOpen: false,
        isOpenText: '展开',
        directors: [],
        casts: [],
      }
    },
    methods: {
      toggleIntro() {
        if (this.isOpen) {
          this.isOpenText = '展开';
          this.$refs.introduce.style.height = "88px";
          this.isOpen = false;
        }
        else {
          this.isOpenText = '收起';
          this.$refs.introduce.style.height = "auto";
          this.isOpen = true;
        }
      }
    },
    mounted(){
      this.$vux.loading.show({
        text: 'Loading'
      })
      this.$ajax.get('/subject/' + this.$route.params.id).then(res => {
        this.movieData = res.data;
        this.$vux.loading.hide();
        this.movieData.casts.forEach((item, value) => {
          this.$ajax.get('/celebrity/' + item.id).then(res => {
            this.casts.push(res.data)
          });
        })
        this.movieData.directors.forEach((item, value) => {
          this.$ajax.get('/celebrity/' + item.id).then(res => {
            this.directors.push(res.data)
          });
        })
      })
    }
  }
</script>

<style lang="less" scoped>


  .movie {
    height: calc(~"100% - 40px");
    overflow: scroll;
  }

  .poster {
    width: 100%;
    height: 300px;
    background-color: rgba(4, 190, 2, 0.46);
    padding: 30px 0;
    text-align: center;
    img {
      width: 50%;
      height: 240px;
    }
  }

  .movie-info {
    padding: 20px;
    border-bottom: 1px solid #ececec;
    position: relative;
    display: flex;
    .base-info {
      flex:2;
      h4 {
        font-size: 20px;
        margin-bottom: 15px;
      }
      p {
        font-size: 12px;
        color: #888;
      }
    }
    .rate-info {
      float: 1;
      width: 100px;
      height: 100px;
      text-align: center;
      padding: 10px 0;
      -webkit-box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
      line-height: 1;
      h6 {
        font-style: normal;
        font-size: 12px;
        color: #9f9f9f;
      }
      .rating {
        font-weight: 900;
        font-size: 14px;
        line-height: 2;
      }
      p {
        color: #666;
        font-size: 12px;
      }
    }
  }
  .label {
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    color: #888;
  }
  .introduce {
    border: 15px solid #fff;
    font-size: 14px;
    position: relative;
    .intro {
      height: 88px;
      overflow: hidden;
    }

    p {
      width: 100%;
      position: absolute;
      bottom: 0;
      right: 8px;
      background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)); /* Safari 5.1 - 6 */
      background: -o-linear-gradient(right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)); /* Opera 11.1 - 12*/
      background: -moz-linear-gradient(right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)); /* Firefox 3.6 - 15*/
      background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)); /* 标准的语法 */
      height: 20px;
      line-height: 20px;
      color: rgb(4, 190, 2);
      text-align: right;
    }
  }

  .people {
    padding: 15px;
    height: 180px;
    width: 100%;
    ul {
      overflow-x: scroll;
      height: 150px;
      display: flex;
      flex-wrap: nowrap;
      padding: 0;
      li {
        list-style: none;
        width: 90px;
        height: 100%;
        font-size: 12px;
        img {
          display: block;
          width: 90px !important;
          height: 100px !important;
        }
        p {
          width: 100%;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
</style>
