<!-- Login form start -->
<v-form novalidate="novalidate" @submit.prevent="login" class="loginform" :class="{ active: loginActive }">
<v-container fluid grid-list-md>
  <center class="or">Or</center>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12 lg12 xl12>
      <v-text-field tabindex="0" min="6" class="mobilenumber" browser-autocomplete="off" name="loginphone" type="number" v-model="loginphone" :error-messages="LoginPhoneErrors" :counter="10" label="Mobile Number" required></v-text-field>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-text-field tabindex="0" browser-autocomplete="off" name="loginpassword" v-model="loginpassword" :error-messages="LoginPasswordErrors" :append-icon="show ? 'visibility_off' : 'visibility'" @click:append="show = !show"
                    :type="show ? 'text' : 'password'" label="Password*" required>
      </v-text-field>
    </v-flex>
  </v-layout>
  <p class="ol-getin">
    <span @click="gotoforgot">Forgot password?</span>
    <a @click="gotologinotp">Log in with OTP</a>
  </p>
  <v-btn dark depressed ripple class="red" type="submit">Log in</v-btn>
</v-container>
</v-form>
<!-- Login form end -->
</div>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email, helpers } from 'vuelidate/lib/validators'

const numeric = value => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[6-9]\d{9}$/.test(value)
}

export default {
  mixins: [validationMixin],

  validations: {
    loginphone: { required, numeric, minLength: minLength(10) },
    loginpassword: { required, minLength: minLength(6) }
  },
  data: () => ({
    loginphone: "",
    loginpassword: "",
  }),
  computed: {
    status () {
      if(this.$store.getters.userStatus == "NO_USERNAME_OR_PASSWORD_FOUND") {
        this.snackbar = true;
        this.color = "red accent-2";
        this.$store.state.userStatus = '';
        return "Mobile number not registered. Please sign up";
      }
      if(this.$store.getters.userStatus == "LOGIN_FAILED") {
        this.snackbar = true;
        this.color = "red accent-2";
        this.$store.state.userStatus = '';
        return "Invalid login details. Please try again!";
      }
    },
    LoginPhoneErrors () {
      const errors = []
      if (!this.$v.loginphone.$dirty) return errors
      !this.$v.loginphone.numeric && errors.push('Invalid Mobile number')
      !this.$v.loginphone.minLength && errors.push('Invalid Mobile number')
      !this.$v.loginphone.required && errors.push('Mobile Number is required')
      return errors
    },
    LoginPasswordErrors () {
      const errors = []
      if (!this.$v.loginpassword.$dirty) return errors
      !this.$v.loginpassword.minLength && errors.push('Password should not be less than 6 characters')
      !this.$v.loginpassword.required && errors.push('Password is required')
      return errors
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout', this.$store.state.authTokenId)
      this.$router.push({ path: '/'})
    },
    async login () {
      if(!this.$v.loginphone.$invalid && !this.$v.loginpassword.$invalid) {
        await this.$store.dispatch('login', { username: this.loginphone, password: this.loginpassword })
        if(this.$store.state.authUser !== null){
          this.loginphone = '',
              this.loginpassword = '',
              this.userdialog = false;
        }
        if(this.$store.state.userStatus === "" && this.$store.state.authUser === null){
          this.userdialog = true;
        }
      }
      else if(this.$v.loginphone.$invalid && this.$v.loginpassword.$invalid) {
        this.$v.$touch()
      }
    }
  }
};
</script>