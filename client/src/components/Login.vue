<template>
	<div id="login">
		<v-flex xs12 sm12>
			<div style="height:80px"></div>
		</v-flex>
		<v-layout>
			<v-flex xs12 sm7 offset-sm1>
				<v-card class="lcard">
					<img src="../assets/library.jpg" height="450px"/>
				</v-card>
			</v-flex>
			<v-flex xs12 sm3>
				<v-card class="rcard" height="450px">
					<div style="height:2%"></div>
					<center>
						<v-avatar size="75px">
							<img src="../assets/logo.jpg" alt="avatar">
						</v-avatar><br/><br/>
						<b>HCG Library App</b>
					</center>
					<v-form v-model="valid" ref="form">
						<v-card-title primary-title>
							<p>Enter your username and password below:</p>
							<v-container fluid>
								<v-text-field
								v-model="username"
								label="Username"
								value=""
								prepend-icon="person"
								class="input-group--focused"
								single-line
								:rules="usernameRules"
								required
								></v-text-field>
								<v-text-field
								v-model="password"
								label="Password"
								value=""
								prepend-icon="security"
								class="input-group--focused"
								single-line
								type="password"
								:rules="passwordRules"
								required
								></v-text-field>
							</v-container>
						</v-card-title>
						<v-card-actions>
							<v-layout>
								<v-flex sm2 offset-sm1>
									<v-btn @click="submit" outline class="indigo--text">Login
									</v-btn>
								</v-flex>
								<v-flex sm2 offset-sm3>
									<v-btn v-bind:to="'/register'" outline class="indigo--text">
									Register
									</v-btn>
								</v-flex>
							</v-layout>
						</v-card-actions>
					</v-form>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      success: '',
      valid: false,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        })
        if (response.data.message === 'success' && response.data.role === 'Admin') {
          this.$router.push('/admin')
        } else if (response.data.message === 'success' && response.data.role === 'Librarian') {
          this.$router.push('/librarian')
        } else if (response.data.message === 'success' && response.data.role === 'Reader') {
          this.$router.push('/reader')
        } else if (response.data.message === 'failure') {

        }
      }
    }
  }
}
</script>

<style scoped>
.rcard {
	background-color: #FFFFFF;
}
</style>