<template>
    <div class="signup">
   <div class="container">
 <div class="column is-8 is-offset-one-quarter">
        <div class="box">
            <h1 class="title">Sign up</h1>
            <div class="column is-8" >
                          <div class="field">
            <div class="control has-icons-left">
  <input class="input " type="username" placeholder="Username" v-model="Username">
  <span class="icon is-small is-left">
    <i class="fas fa-user"></i>
  </span>
</div>
</div>
                <div class="field">
            <div class="control has-icons-left">
  <input class="input " type="email" placeholder="Email" v-model="Email">
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
<div class="field">
  <p class="control has-icons-left">
    <input class="input" type="password" placeholder="RE-Password" v-model="RePass">
    <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
  </p>
</div>
<div class="notification is-danger" v-if="errors.length">
  <p v-for="error in errors" v-bind:key="error">{{error}}</p>
</div>
<div class="field">
      <button class="button is-primary" @click="submitForm" >Sign up</button>

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
    name: "signup",
    data() {
      return {
        Username:"",
        Email:"",
        Pass:"",
        RePass:"",
        errors:[],
      }
    },
    methods: {
      async submitForm () {
         this.$store.commit("setLoading",true)
          this.errors=[]
          if (this.Username === ''){
              this.errors.push("Username Must Enter and be unique")
          }
          if (this.Email === '') {
              this.errors.push("The Email is Missing")
          }
            if (this.Pass === '') {
              this.errors.push("The password is too short")
          }
           if (this.Pass !== this.RePass) {
              this.errors.push("The passwords are not the same")
          }
          if(!this.errors.length){
            const formData = {
              username:this.Username,
              password:this.Pass,
              email:this.Email
            }
         
           await axios.post('api/v1/users/', formData)
            .then(res => {
              console.log(res)
              toast({
                message: "Account was created , please Login",
                type: "is-success",
                dismissible:true,
                pauseOnHover:true,
                duration: 2000,
                position: 'bottom-center',
              })
              this.$router.push("/log-in")
            }).catch(err => {
              if(err.response){
                for (const property in err.response.data){
                  this.errors.push(`${property}: ${err.response.data[property]}`)
                }
              }else if (err.message) {
                   this.errors.push('somthing went wrong try again')
                }
             
            })
             this.$store.commit("setLoading",false)
          }
      }
    },
}
</script>