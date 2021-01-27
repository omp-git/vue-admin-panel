<template>
  <div id="signin">
    <div class="signin-form">
      <h2 class="title">Login</h2>
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{ 'invalid': $v.mobile.$error }">
          <label for="mobile">Mobile Number</label>
          <input 
            type="text"
            id="mobile" 
            @blur="$v.mobile.$touch()"
            v-model.trim="mobile">
            <span class="error-msg" v-if="!$v.mobile.required && $v.mobile.$dirty">Mobile-Number field is requird.</span>
            <span class="error-msg" v-if="!$v.mobile.valid">Mobile-Number format is invalid.</span>
        </div> 
        <div class="input" :class="{ 'invalid': $v.password.$error }">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            @blur="$v.password.$touch()"
            v-model="password">
            <span class="error-msg" v-if="!$v.password.required && $v.password.$dirty">Password field is requird.</span>
            <span class="error-msg" v-if="!$v.password.minLen && $v.password.$dirty">Password field must at least {{ $v.password.$params.minLen.min }} characters.</span>
        </div>

        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, minLength, helpers } from 'vuelidate/lib/validators'
  const mobileCheck = helpers.regex("mobile", /^09(1[0-9]|3[1-9]|2[1-9])( |-)?[0-9]{3}( |-)?[0-9]{4}$/);
  export default {
    data () {
      return {
        mobile: '',
        password: '',
        connd: true,
        serverErrors: {
          mobile: null,
          password: null
        }
      }
    },
    validations: {
      mobile: {
        required, 
        valid: mobileCheck
      },
      password: {
        required, 
        minLen: minLength(6)
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          mobile: this.mobile,
          password: this.password,
        }
        this.$v.$touch()
        if(!this.$v.$invalid && this.$v.$anyDirty) {
          this.$store.dispatch('login', { mobile: formData.mobile, password: formData.password })
          .then((res) => {
            if(res.status === 200)
            {
              this.$toast.success('You logged in successfully !', 'Back-End')
              this.password = ''
            }
          })
          .catch(err => {
            
            let res = err.response
            if(res.status === 422)
            {
              for(let key in res.data) {
                this.$toast.error(res.data[key][0], 'Back-End')
              }
            } else if(res.status === 401) {
                this.$toast.error(res.data.message, 'Back-End')
            }
          })
        }else {
          console.log('not sumbit')
        }
      
      },
    }
  }
</script>

<style scoped>
  .signin-form {
    width: 400px;
    margin: 60px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 4px 4px #ccc;
  }
  .signin-form .title {
    margin-top: 30px;
    margin-bottom: 60px;
    font-weight: bold;
    text-align: center;
    color: #521751
  }
  .input {
    margin: 15px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }
  @keyframes shakeError {
    0% {
      transform: translateX(0); }
    15% {
      transform: translateX(0.375rem); }
    30% {
      transform: translateX(-0.375rem); }
    45% {
      transform: translateX(0.375rem); }
    60% {
      transform: translateX(-0.375rem); }
    75% {
      transform: translateX(0.375rem); }
    90% {
      transform: translateX(-0.375rem); }
    100% {
      transform: translateX(0); } 
    }
  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .submit {
    text-align: right;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
    border-radius: 5px;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
  span.error-msg {
    font-size: 12px;
    margin-right: 4px;
    margin-left: 4px;
    font-weight: lighter;
  }
  .invalid label, .invalid span {
    color: #f04124
  }
  .invalid input {
    border: 1px solid #f04324ab;
    background-color: #FDD;
  }
  .invalid input:focus {
    border: 2px solid #f043246c;
  }
  .invalid input, .invalid label {
    animation-name: shakeError;
    animation-fill-mode: forwards;
    animation-duration: .6s;
    animation-timing-function: ease-in-out;
  }

</style>