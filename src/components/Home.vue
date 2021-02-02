<template>
  <el-container class="home-container">
    <!--头部布局-->
    <el-header>
      <div>
        <img src="../assets/logo.jpg" alt class="logo_img" />
        <span>设备管理平台</span>
      </div>
      <el-button type="info" @click="logout">安全退出</el-button>
    </el-header>
    <el-container>
      <!--侧边布局-->
      <el-aside :width="isCollapse ?'64px':'200px'">
        <!--伸缩按钮-->
        <div class="toggle-button" @click="toggleCollapase">|||</div>
        <!--侧边栏菜单区 unique-opened="true" 只保持一个菜单展开 router开启路由 active-text-color 颜色-->
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" unique-opened :collapse="isCollapse" 
          :collapse-transition="false"  :router="true" :default-active="activePath">
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconsObject[item.id]"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item  :index="it.path+''" v-for="it in item.slist" :key="it.id"  @click="saveNavState(it.path+'')">
              <template slot="title" >
                <i :class="iconsObject[it.id]"></i>
                <span>{{it.title}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--主体布局-->
      <el-main>
          <!--路由占位符-->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
    data() {
        return {
            // 左侧菜单
            menuList: [],
            iconsObject: {
              // '100':'iconfont iconguanliyuan',
              // '200':'iconfont iconsport',
              // '101':'iconfont icondenglu',
              // '102':'iconfont iconmima',
              // '103':'iconfont iconsport',
              // '104':'iconfont iconshangpin',
              // '201':'iconfont iconshu',
              // '202':'iconfont iconkaluli',
              // '203':'iconfont iconshiwu',
              // '204':'iconfont icondenglu',

              //写到数据库中？
              '100':'el-icon-scissors',
              '200':'el-icon-umbrella',
              '300':'el-icon-headset',
              '400':'el-icon-brush',
              '500':'el-icon-coordinate',
              '600':'el-icon-magic-stick',
              '700':'el-icon-reading',
              '800':'el-icon-data-line',
              '900':'el-icon-data-board',
              '101':'el-icon-pie-chart',
              '102':'el-icon-data-analysis',
              '201':'el-icon-collection-tag',
              '202':'el-icon-film',
              '301':'el-icon-suitcase',
              '302':'el-icon-suitcase-1',
              '401':'el-icon-receiving',
              '402':'el-icon-collection',
              '403':'el-icon-files',
              '404':'el-icon-news',
              '405':'el-icon-guide',
              '406':'el-icon-orange',
              '501':'el-icon-connection',
              '601':'el-icon-open',
              '701':'el-icon-postcard',
              '801':'el-icon-bangzhu',
              '901':'el-icon-copy-document',

            },
            isCollapse:false,
            // 被激活的连接
            activePath:'',
        }
    },
  // 类似onload
  created() {
      this.getMenuList();
      this.activePath = window.sessionStorage.getItem('activePath');// 取出session里的访问路径
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有的导航菜单
    async getMenuList(){
      const {data:res} = await this.$http.get("menus");
      var resObj = JSON.parse(res)
      if( resObj.status != 200) return this.$message.error("操作失败！！！");
      this.menuList = resObj.data;
    },
    // 切换菜单折叠与展开
    toggleCollapase(){
      this.isCollapse = !this.isCollapse;
    },
    // 保存二级菜单的路径
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath);// 存放点击的二级菜单
      this.activePath = activePath;// 给点击的菜单添加高亮
    },
  }
};
</script>
<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;// 左右贴边
  padding-left: 0%;// 左边界
  align-items: center;// 水平
  color: #fff;
  font-size: 20px;
  > div { //左侧div加布局
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: none;// 对其右边框
  }
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
.logo_img {
  width: 20%;
  height: 100%;
}
.iconfont{
  margin-right: 10px;
}
.toggle-button{
  background-color:#4A5064;
  font-size: 10px;
  line-height: 24px;
  color:#fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;// 显示鼠标指针为：小手
}
</style>