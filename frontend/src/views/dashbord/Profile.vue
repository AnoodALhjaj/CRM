<template>
<div class="profile">
    <div class="columns is-multiline">
        <div class="column is-12">
<div class="title">Profile</div>
        </div>
        <div class="column is-12">
            <div class="button" @click="Logout">Logout</div>
        </div>
    </div>
    </div>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
export default {
    name: 'profile',
    methods:{
        Logout () {
 axios.defaults.headers.common['Authorization']=''
          localStorage.removeItem('token');
          this.$store.commit("removeToken");
axios.post("api/v1/token/logout/")
 this.$router.push("/log-in")
.then(res=> {
    console.log(res)
   
    
}).catch(err=> {
    console.log(JSON.stringify(err))
})

        },
    }
}
</script>