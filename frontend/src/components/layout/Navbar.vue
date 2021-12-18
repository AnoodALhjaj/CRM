
<template>
    <nav class="navbar is-dark">
        <div class="navbar-brand">
            <router-link to="/dashbord" class="navbar-item"><strong>CRM</strong></router-link>
        </div>
        <div class="navbar-menu">
            <div class="navbar-end">
   <div class="navbar-item">
            <router-link to="sign-up" class="button is-primary"><strong>Sign up</strong></router-link>
            </div>
               <div class="navbar-item">
            <router-link to="log-in" class="button"><strong>Login in</strong></router-link>
       </div>
   </div>
            </div>
    </nav>
</template>
<script>
/*eslint-disable */

import axios from "axios";

export default {
 name: 'Navbar',
 beforeCreate() {
     this.$store.commit('initStorage');
     if (this.$store.state.token) {
         axios.defaults.headers.common['Authorization']="Token "+this.$store.state.token
     }else{
         axios.defaults.headers.common['Authorization']=''
     }
 },
}
</script>