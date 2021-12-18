<template>
    <div class="login">
        <div class="container">
 <div class="column is-8 is-offset-one-quarter">
        <div class="box">
            <h1 class="title">Login</h1>
            <div class="column is-8">
                <div class="field">
            <div class="control has-icons-left">
  <input class="input " type="text" placeholder="Username"  v-model="Username">
  <span class="icon is-small is-left">
    <i class="fas fa-envelope"></i>
  </span>
</div>
</div>

<div class="field">
  <p class="control has-icons-left">
    <input class="input" type="password" placeholder="Password" v-model="Pass">
    <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
  </p>
</div>
<div class="notification is-danger" v-if="errors.length">
  <p v-for="error in errors" v-bind:key="error">{{error}}</p>
</div>
<div class="field">
      <button class="button is-primary" @click="submitForm">Login</button>

</div>
        </div>
        </div>
 </div>
</div>
    </div>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
import {toast} from 'bulma-toast'
export default {
    name: "login",
    data() {
      return {
        Username:"",
        Pass:"",
        errors:[],
      }
    },
    methods: {
     async submitForm () {
       this.$store.commit("setLoading",true)
          axios.defaults.headers.common['Authorization']=''
          localStorage.removeItem('token');
           const formData = {
              password:this.Pass,
              username:this.Username
            }
            await axios.post('api/v1/token/login/',formData)
            .then(res=> {
            console.log(res)
            const token=res.data.auth_token
            this.$store.commit("setToken",token)
            axios.defaults.headers.common['Authorization']='Token '+token
            localStorage.setItem('token', token);
              toast({
                message: "Login is successfully Done",
                type: "is-success",
                dismissible:true,
                pauseOnHover:true,
                duration: 2000,
                position: 'bottom-center',
              })
             this.$router.push("/profile")
            }).catch(err=>{
               if (err.response) {
                for (const property in err.response.data) {
                  this.errors.push(`${property}: ${err.response.data[property]}`)
                }
              }else if (err.message) {
                   this.errors.push('somthing went wrong try again')
                }
            })
             this.$store.commit("setLoading",false)
      }
    },
}
</script>