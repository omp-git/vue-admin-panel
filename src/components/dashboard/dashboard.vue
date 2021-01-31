<template>
  <div id="dashboard">
    <div>
    <h1>That's the dashboard.</h1>
    <h2 v-if="auth && fullName != ''" class="auth">Your are logged in! ({{ fullName }})</h2>
    <h2 v-if="!auth" class="gest">Your are not logged in!</h2>
    </div>
    <div v-if="auth">
      <h4 style="text-align: center">Active user List</h4>
      <hr>
      <div class="pagination">
        <paginate
          :page-count="pageCount"
          :click-handler="paginateUsers"
          :margin-pages="2"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'paginate-container'" 
          :page-link-class="'paginate-link'"
          :disabled-class="'paginate-disabled'"
          :next-link-class="'paginate-next'" 
          :prev-link-class="'paginate-prev'" 
          :page-class="'paginate-item'"
          :active-class="'paginate-acitve-item'"
          :break-view-link-class="'paginate-break-item'">
            <span slot="breakViewContent">
              <svg width="16" height="4" viewBox="0 0 16 4">
                <circle fill="#521751" cx="2" cy="2" r="2" />
                <circle fill="#521751" cx="8" cy="2" r="2" />
                <circle fill="#521751" cx="14" cy="2" r="2" />
              </svg>
            </span>
        </paginate>
        <div class="user-list">
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
  </div>
  
</template>
<script>
  import axios from '../../axios'

 export default {
    data() {
      return { 
        fullName: '',
        users: [],
        pageCount: 3,
        pageOffset: 4
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
            this.paginateUsers(1)
          }
        })
        .catch((error) => {
          if(error.response == 401)
          {
            this.$store.commit('clearUser')
          }
          console.log(error.response)
        })
      }
    },
    methods: {
      paginateUsers(page) {
      const offset = this.pageOffset
        this.getUsers(page, offset)
      },
      getUsers(page, offset) {
        axios.post('users', {
          token: this.$store.getters.token,
          page: page,
          offset: offset
        })
        .then((res) => {
          const data = res.data.data
          if(res.status == 200) {
            const users = data.users
            this.users = users
            this.pageCount = data.meta.last_page
          }
        })
        .catch((error) => {
          if(error.response == 401)
          {
            this.$store.commit('clearUser')
          }
        }) 
      }
    }
  }
</script>
<style lang="css">
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
  .paginate-container {
    list-style: none;
    text-align: center;
    padding: 0;
    margin-top: 30px;
  }

   .paginate-container a {
    outline: none;
  }
  .paginate-container>li {
    display: inline;
  }

  .paginate-link, .paginate-next, .paginate-prev {
    border-radius: 3px;
    padding: 5px 6px;
    border: 2px solid #521751;
    color: #521751;
  }

  .paginate-link {
    margin: 3px
  }
  .paginate-link:hover, .paginate-next:hover, .paginate-prev:hover {
    background-color: #521751;
    color: white;
  }
  
  .paginate-disabled a, .paginate-acitve-item a {
    cursor: default !important;
    background-color: #52175133;
    color: gray;
    border: 2px solid #dcd1dc;
  }

  .paginate-disabled a:hover, .paginate-acitve-item a:hover {
    background-color: #dcd1dc;
    color: gray;
  }
  .paginate-disabled a.paginate-break-item  {
    background-color: white;
    border: 2px solid white;
  }
</style>