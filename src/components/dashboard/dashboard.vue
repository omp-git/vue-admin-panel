<template>
  <div id="dashboard">
    <div>
    <h1>That's the dashboard.</h1>
    <h2 v-if="auth && fullName != ''" class="auth">Your are logged in! ({{ fullName }})</h2>
    <h2 v-if="!auth" class="gest">Your are not logged in!</h2>
    </div>
    <div class="user-list" v-if="auth">
      <h4>User List</h4>
      <hr>
      <div>
        <ul>
          <li v-for="(user, index) in users" :key="index">{{ (index+1) + ' - ' + user.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from '../../axios'
  export default {
    data() {
      return { 
        fullName: '',
        users: []
      }
    },
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated
      }
    },
    created() {
      if(this.auth) {
        axios.post('auth/vue-login-user', {
          token: this.$store.getters.token,
          _id: this.$store.getters.uId
        })
        .then((res) => {
          const data = res.data
          if(data.status) {
            const user = data.user
            this.fullName = user.fname + ' ' + user.lname
          } else {
              this.$store.dispatch('logout')
          }
        })
        .catch((error) => console.log(error)) 

        axios.post('auth/vue-user-list', {
          token: this.$store.getters.token
        })
        .then((res) => {
          const data = res.data
          if(data.status) {
            const users = data.users
            this.users = users
          } else {
              this.$store.dispatch('logout')
          }
        })
        .catch((error) => console.log(error)) 
      }

    }
  }
</script>
<style scoped>
  #dashboard {
    margin-top: 6rem;
  }
  h1, h2 {
    text-align: center;
  }
  .gest {
    color: red
  }
  .auth {
    color: green
  }
  .user-list {
    margin-top: 30px;
    text-align: center;
  }
  .user-list ul {
    list-style: none;
  }
  .user-list li {
    margin: .8rem auto;
  }
  .user-list hr {
    width: 75%;
  }
</style>