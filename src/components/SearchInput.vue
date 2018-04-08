<template>
  <div class="search">
    <div class="input-box">
      <input type="text" autofocus placeholder="电影/电视剧/影人" v-model="value">
      <router-link class="cancel" to="/">取消</router-link>
    </div>
    <div class="result-list">
      <div class="top-10" v-show="top10Show">
        <p>TOP10</p>
        <ul>
          <li v-for="(movie,index) in topList" :key="movie.id" @click="handleSendParams(movie.id)">
            <span><i>{{(index + 1)}}</i>{{movie.title}}</span>
          </li>
        </ul>
      </div>
      <div class="search-result" v-show="!top10Show">
        <div class="result" @click="handleSendParams(movie.id)"
             v-for="(movie,index) in searchResults" :key="movie.id">
          <img :src="movie.images.small">
          <div class="info">
            <h6 v-html="movie.title"></h6>
            <p>{{movie.rating.average}}分/{{movie.year}}</p>
            <p>演员：<span v-for="(cast,i) in movie.casts" :key="cast.id">{{cast.name}}/</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    data () {
      return {
        topList: [],
        searchResults: [],
        value: '',
        top10Show: true
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
      }
    },
    beforeCreate(){
      this.$ajax.get('/top250?count=10').then(res => {
        this.topList = res.data.subjects;
      })
    },
    watch: {
      value(newV, oldV) {
        if (newV == '') {
          this.top10Show = true;
          this.$vux.loading.hide();
        }
        else {
          this.top10Show = false;
          this.$vux.loading.show({
            text: 'Loading'
          })
          this.$ajax.get('/search?&q=' + newV).then(res => {
            this.$vux.loading.hide();
            this.searchResults = [];
            res.data.subjects.forEach((item, index) => {
              if (item.title.indexOf(newV) != -1) {
                item.title = item.title.replace(new RegExp(newV, 'g'), '<span style="color:#04BE02;">' + newV + '</span>');
                this.searchResults.push(item);
              }
            })
          })
        }
      }
    }
  }

</script>
<style lang="less" scoped>
  .search {
    height: 100%;
  }

  .input-box {
    background-color: #04BE02;
    height: 44px;
    padding: 7px;
    display: flex;
    input {
      flex: 4;
      height: 30px;
      line-height: 30px;
      border: 0 none;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      padding-left: 10px;
    }
    .cancel {
      display: inline-block;
      flex: 1;
      text-align: center;
      line-height: 30px;
      color: #fff;
    }
  }

  .result-list {
    height: calc(~"100% - 44px");
    .top-10 {
      height: 100%;
      p {
        height: 44px;
        line-height: 44px;
        font-size: 12px;
        color: #888;
        background-color: #ececec;
        padding-left: 10px;
      }
      ul {
        height: calc(~"100% - 44px");
        display: flex;
        flex-direction: column;
        li {
          flex: 1;
          padding-left: 10px;
          display: flex;
          flex-direction: column;
          align-content: center;
          justify-content: center;
          i {
            display: inline-block;
            text-align: center;
            width: 14px;
            line-height: 14px;
            height: 14px;
            margin-right: 10px;
            color: #888;
            font-size: 12px;
            font-style: normal;
          }
          &:first-child {
            i {
              background-color: #efcc01;
              color: #fff;
            }
          }
          &:nth-child(2) {
            i {
              background-color: #788793;
              color: #fff;
            }
          }
          &:nth-child(3) {
            i {
              background-color: #ff4d35;
              color: #fff;
            }
          }
        }
      }
    }
    .search-result {
      height: 100%;
      overflow: scroll;
      .result {
        display: block;
        height: 100px;
        padding: 8px;
        display: flex;
        img {
          width: 60px;
          height: 100%;
        }
        .info {
          padding: 0 10px;
          h6 {
            font-size: 14px;
            color: #171717;
          }
          p {
            font-size: 12px;
            color: #888;
          }
        }
      }
    }
  }
</style>
