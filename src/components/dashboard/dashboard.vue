<template>
  <div id="dashboard">
    <div>
    <h1>That's the dashboard.</h1>
    <h2 v-if="auth && fullName != ''" class="auth">Your are logged in! ({{ fullName }})</h2>
    <h2 v-if="!auth" class="gest">Your are not logged in!</h2>
    </div>
    <div class="user-list" v-if="auth">
      <h4>Active user List</h4>
      <hr>
      <div>
        <ul>
          <li v-for="(user, index) in users" :key="index">
            <div class="user-card">
              <img :src="user.avatar">
              <strong>{{ user.name }}</strong>
            </div>
          </li>
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
        axios.post('auth/me', {
          token: this.$store.getters.token,
          _id: this.$store.getters.uId
        })
        .then((res) => {
          const data = res.data
          if(res.status === 200) {
            const user = data.me
            this.fullName = user.name
          }
        })
        .catch((error) => {
          this.$store.dispatch('logout')
          console.log(error.response)
        }) 

        axios.post('users', {
          token: this.$store.getters.token
        })
        .then((res) => {
          const data = res.data
          if(res.status == 200) {
            const users = data.users
            this.users = users
          }
        })
        .catch((error) => {
          this.$store.dispatch('logout')
          console.log(error)
        }) 
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
    padding: 0;
  }
  .user-list li {
    margin: .8rem auto;
  }
  .user-list hr {
    width: 75%;
  }
  .user-card {
    padding: 0;
    display: inline-flex;
    min-width: 280px;
    box-shadow: 0px 2px 4px #bbbbbb
  }
  .user-card img {
    width: 50px;
    height: 50px;
  }
  .user-card strong {
    margin: auto;
  }
</style>