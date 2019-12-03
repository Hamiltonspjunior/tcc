<template>
  <div class="wrapper">
    <side-bar>
      <!-- Controla os links do menu lateral -->
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel"/>
        <sidebar-link to="/stats" name="Perfil" icon="ti-user"/>
        <sidebar-link to="/table-list" name="Relatório" icon="ti-view-list-alt"/>
        <sidebar-link to="/occurrence" name="Ocorrência" icon="ti-view-list-alt"/>
        <sidebar-link to="/admin" name="Administração" icon="ti-view-list-alt"/>
        <div class="flex">
          <button-sair @click.native="exit()"> Sair </button-sair>
        </div>
      </template>
      <mobile-menu>
        <!--<li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>-->
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
import ButtonSair from "../../components/Button.vue";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
    ButtonSair
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    exit: function(){
      window.sessionStorage.removeItem('tokenUser');
      this.$router.push('/login');
    }
  }
};
</script>
<style lang="scss">
.flex {
  width: 100%;
  padding: 25px;
}
</style>
