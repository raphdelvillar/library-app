<template>
  <div id="addAdmin">
    <v-layout>
      <v-flex xs12 sm7 offset-sm1>
        <v-card class="lcard" height="450px">
          <v-toolbar class="indigo">
            <v-toolbar-title>Add User</v-toolbar-title>
          </v-toolbar>
          <div class="pa-2">
            <v-stepper v-model="e1" class="white">
              <v-stepper-header>
                <v-stepper-step step="1" :complete="e1 > 1">Account Creation</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="e1 > 2">Personal Details</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">Confirmation</v-stepper-step>
              </v-stepper-header>
              <v-stepper-content step="1" fluid style="overflow-y:scroll; height:250px">
                <v-form v-model="valid1" ref="form1">
                  <v-layout row>
                    <v-flex xs5>
                      <v-text-field
                        label="Username"
                        v-model="id"
                        value=""
                        class="input-group--focused"
                        disabled
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs5>
                      <v-text-field
                        label="Password"
                        v-model="password"
                        value=""
                        type="password"
                        class="input-group--focused"
                        :rules="passwordRules"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs5><br/>
                      <p><b>Please select user role:</b></p>
                      <v-radio-group v-model="role" :mandatory="true" :rules="roleRules">
                        <v-radio label="Admin" value="Admin"></v-radio>
                        <v-radio label="Librarian" value="Librarian"></v-radio>
                        <v-radio label="Reader" value="Reader"></v-radio>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex sm2>
                      <v-btn @click="check(1)" outline class="green--text">Continue
                      </v-btn>
                    </v-flex>
                    <!--
                    <v-flex sm2 offset-sm8>
                      <v-btn disabled outline class="red--text">
                      Back
                      </v-btn>
                    </v-flex>
                    -->
                  </v-layout>
                </v-form>
              </v-stepper-content>
              <v-stepper-content step="2" fluid style="overflow-y:scroll; height:250px">
                <v-form v-model="valid2" ref="form2">
                  <v-layout row>
                    <v-flex xs5>
                      <v-text-field
                        label="First Name"
                        v-model="firstname"
                        value=""
                        class="input-group--focused"
                        :rules="firstnameRules"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs5 offset-xs1>
                      <v-text-field
                        label="Last Name"
                        v-model="lastname"
                        value=""
                        class="input-group--focused"
                        :rules="lastnameRules"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs11>
                      <v-text-field
                        label="Email"
                        v-model="email"
                        value=""
                        class="input-group--focused"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                      </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs11>
                      <v-text-field
                        label="Phone"
                        v-model="phone"
                        value=""
                        class="input-group--focused"
                        :rules="phoneRules"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex sm2>
                      <v-btn @click="check(2)" outline class="green--text">Continue
                      </v-btn>
                    </v-flex>
                    <v-flex sm2 offset-sm8>
                      <v-btn @click="back(1)" outline class="red--text">
                      Back
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-stepper-content>
              <v-stepper-content step="3" fluid style="overflow-y:scroll; height:250px">
                <v-alert
                  icon="check_circle"
                  v-if="alert === 'success'"
                  :value="message"
                  transition="scale-transition"
                  style="background-color: green"
                >
                  User have been successfully registered! You'll be redirected to admin page after 3 seconds.
                </v-alert>
                <v-alert
                  icon="warning"
                  v-if="alert === 'failure'"
                  :value="message"
                  transition="scale-transition"
                  style="background-color: red"
                >
                  Sorry! We have encountered an error. Try again later. You'll be redirected to admin page after 3 seconds.
                </v-alert>
                <div v-if="alert === ''">
                  <p><i class="material-icons">chat</i> Are the details below correct?</p>
                </div>
                <br/>
                <p>
                  <b>Name:</b> {{firstname}} {{lastname}}<br/>
                  <b>Email:</b> {{email}} <br/>
                  <b>Phone:</b> {{phone}} <br/>
                  <b>Role:</b> {{role}} <br/>
                  <br/><br/>
                </p>
                <v-layout v-if="alert === ''">
                  <v-flex sm2>
                    <v-btn @click="submit()" outline class="green--text">Finish
                    </v-btn>
                  </v-flex>
                  <v-flex sm2 offset-sm8>
                    <v-btn @click="back(2)" outline class="red--text">
                    Back
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
            </v-stepper>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 sm3>
        <v-card class="rcard" height="450px">
        </v-card>
      </v-flex>
      <v-flex xs12 sm1>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      e1: 0,
      alert: '',
      message: false,
      valid1: false,
      valid2: false,
      id: '',
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      firstname: '',
      firstnameRules: [
        v => !!v || 'Firstname is required'
      ],
      lastname: '',
      lastnameRules: [
        v => !!v || 'Lastname is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'Phone is required'
      ],
      role: '',
      roleRules: [
        v => !!v || 'Please pick a role'
      ],
      status: 'Active'
    }
  },
  methods: {
    init () {
      this.e1 = 1
      this.alert = ''
      this.message = false
      this.valid1 = false
      this.valid2 = false
      this.id = ''
      this.password = ''
      this.firstname = ''
      this.lastname = ''
      this.email = ''
      this.phone = ''
      this.role = ''
      this.status = 'Active'
      this.getUser()
    },
    async getUser () {
      var container = []
      const response = await AuthenticationService.getUserID({})
      response.data.forEach(function (v, k) {
        container.push(parseInt(v['id']))
      })

      for (var a = 1; this.id === ''; a++) {
        if (container.includes(a) === false) {
          this.id = '' + a
        }
      }
    },
    async submit () {
      const response = await AuthenticationService.register({
        _id: this.id,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
        role: this.role,
        status: this.status
      })
      var self = this
      if (response.data.message === 'success') {
        this.alert = 'success'
        this.message = true
        setTimeout(function () { self.$parent.$data.pager = ''; self.$parent.$data.e2 = 0; self.$parent.getUser(); self.init() }, 3000)
      } else {
        this.alert = 'failure'
        this.message = true
        setTimeout(function () { self.$parent.$data.pager = ''; self.$parent.$data.e2 = 0; self.$parent.getUser(); self.init() }, 3000)
      }
    },
    check (val) {
      if (this.$refs.form1.validate() && val === 1) {
        this.e1 = val + 1
      } else if (this.$refs.form2.validate() && val === 2) {
        this.e1 = val + 1
      }
    },
    back (val) {
      this.e1 = val
    }
  },
  async created () {
    this.getUser()
  }
}
</script>

<style scoped>
.lcard {
  background-color: gray;
}

.rcard {
  background-image: url('../assets/register.jpg');
  background-color: #FFFFFF;
}

.indigo {
  color: #FFFFFF;
}

.divider {
  border: 0.5px solid lightgray;
}
</style>