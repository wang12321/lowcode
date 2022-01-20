<template>
  <div class="navbar" :style="{'background':navbarBackground }">
    <div class="logo">
            <logo />
    </div>
    <div class="navbarLogo">
<!--      <Sidebar />-->
      <div class="right-menu">
        <template v-if="device!=='mobile'">
          <screenfull id="screenfull" class="right-menu-item hover-effect" :style="{'color':navbarColor }" />
        </template>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper" :style="{'color':navbarColor }">
            <span>{{ name }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown" style="width: 200px">
            <div style="padding: 10px 20px;color: #333">
              <span>{{ name }} -- {{ userID }}</span>
            </div>
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block;"> <i class="el-icon-switch-button" />退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import variables from '@/styles/variables.scss'
import logo from './Sidebar/Logo'
// import userSearch from './common/userSearch'
import projectSelectMixin from './common/projectSelect.js'

export default {
  components: {
    Screenfull,
    logo
  },
  mixins: [projectSelectMixin],
  data() {
    return {
      activeIndex2: 1
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'device'
    ]),
    userID() {
      return this.$store.state.user.userID
    },
    routes() {
      return this.$store.state.permission.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, name } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return name
    },
    navbarBackground() {
      return variables.navbarBackground
    },
    navbarColor() {
      return variables.navbarColor
    }
  },
  methods: {
    projectBtnPush() {
      this.$router.push(`/system/projectManage`)
    },
    systemBtnPush() {
      this.$router.push(`/system/systemConfig`)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";

.logo {
  position: absolute;
  width: 250px;

  .logo_svg {
    width: 22px;
    height: 16px;
    margin: 18px;
    color: #fff;
    vertical-align: middle;
  }
}

.select {

  ::v-deep .el-input--suffix .el-input__inner {
    height: 33px;
    padding-right: 30px;
    line-height: 33px;
  }
}

.navbarLogo {
  padding-left: $sideBarWidth;
}

.navbar {
  position: relative;
  height: 55px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 46px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    .user_search {
      font-size: 14px !important;
    }

    .user_search:focus,
    .user_search:hover {
      font-size: 14px !important;
      color: #fff !important;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        margin-top: 5px;

        .user-avatar {
          width: 40px;
          height: 40px;
          cursor: pointer;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}

</style>
