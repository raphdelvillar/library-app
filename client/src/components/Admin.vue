<template>
  <div id="admin">
    <v-flex xs12 sm12>
      <div id="header">
        <br/><h5>{{ this.$cookie.get('name') }} - {{ this.$cookie.get('role') }}</h5>
      </div>
    </v-flex>
    <add-admin v-show="pager == 'add-admin'"></add-admin>
    <update-admin v-show="pager == 'update-admin'" :updateUserData="updateUserData"></update-admin>
    <v-layout v-show="e2 == 0">
      <v-flex xs12 sm12>
        <v-card class="rcard" height="450px" style="overflow-y:scroll">
          <v-progress-linear v-if="alert === 'success'" v-bind:indeterminate="true"></v-progress-linear>
          <v-alert
                  icon="check_circle"
                  v-if="alert === 'success'"
                  :value="status"
                  transition="scale-transition"
                  style="background-color: green"
          >
            {{ message }}
          </v-alert>
          <v-alert
            icon="warning"
            v-if="alert === 'failure'"
            :value="status"
            transition="scale-transition"
            style="background-color: red"
          >
            Sorry! We have encountered an error. Try again later.
          </v-alert>
          <v-card-title>
            <b>User Management</b>
            <v-flex offset-sm1>
              <v-btn @click="addUser" outline class="indigo--text">Add User</v-btn>
            </v-flex>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              hide-details
              v-model="search"
              class="input-group--focused"
            ></v-text-field>
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            v-bind:headers="headers"
            v-bind:search="search"
            v-bind:items="items"
          >
            <template slot="items" scope="props">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.email }}</td>
              <td>{{ props.item.phone }}</td>
              <td>{{ props.item.role }}</td>
              <td>{{ props.item.status }}</td>
              <td>
                <v-btn @click="updateUser(props.item)" class="yellow lighten-1" title="Update User" icon>
                  <v-icon>mode_edit</v-icon>
                </v-btn>
                <v-btn @click="deleteUser(props.item.id, props.item.rev)" class="red lighten-1" title="Delete User" icon>
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>

    <my-library></my-library>
    <v-card height="50px">
      <v-bottom-nav
        absolute
        shift
        :value="true"
        :active.sync="e2"
        :class="{
          'red lighten-1': e2 === 2,
          'blue lighten-1': e2 === 1,
          'yellow lighten-1': e2 === 0,
          'gray lighten-1' : e2 === 3
        }"
      >
        <v-btn @click='deactivate(0)' dark>
          <span>User Management</span>
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-btn @click='deactivate(1)' dark>
          <span>Book Management</span>
          <v-icon>book</v-icon>
        </v-btn>
        <v-btn @click='logout'>
           <span>Logout</span>
           <v-icon>power_settings_new</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import AddAdmin from '@/components/AddAdmin'
import UpdateAdmin from '@/components/UpdateAdmin'
import Library from '@/components/Library'
import AddBook from '@/components/AddBook'
import UpdateBook from '@/components/UpdateBook'

export default {
  data () {
    return {
      updateUserData: '',
      alert: '',
      message: '',
      status: false,
      allow_book: 'Admin',
      pager: '',
      e2: 0,
      search: '',
      pagination: {},
      headers: [
        {
          text: 'ID',
          align: 'left',
          value: 'id'
        },
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Email',
          align: 'left',
          value: 'email'
        },
        {
          text: 'Phone',
          align: 'left',
          value: 'phone'
        },
        {
          text: 'Role',
          align: 'left',
          value: 'role'
        },
        {
          text: 'Status',
          align: 'left',
          value: 'status'
        },
        {
          text: 'Action',
          align: 'center',
          value: 'action'
        }
      ],
      items: []
    }
  },
  components: {
    'my-library': Library,
    'add-admin': AddAdmin,
    'update-admin': UpdateAdmin,
    'add-book': AddBook,
    'update-book': UpdateBook
  },
  methods: {
    isLoggedIn () {
      if (this.$cookie.get('role') === 'Reader') {
        this.$router.push('/reader')
      } else if (this.$cookie.get('role') === 'Admin') {
        this.$router.push('/admin')
      } else if (this.$cookie.get('role') === 'Librarian') {
        this.$router.push('/librarian')
      } else {
        this.$router.push('/')
      }
    },
    logout () {
      this.$cookie.delete('username')
      this.$cookie.delete('role')
      this.$router.push('/')
    },
    addUser () {
      this.pager = 'add-admin'
      this.e2 = 999
    },
    updateUser (data) {
      this.updateUserData = data
      this.pager = 'update-admin'
      this.e2 = 999
    },
    async deleteUser (id, rev) {
      var r = confirm('Are you sure you want to delete?')
      if (r === true) {
        const response = await AuthenticationService.deleteUser({
          _id: id,
          _rev: rev
        })
        var self = this
        if (response.data.message === 'success') {
          this.alert = 'success'
          this.message = 'User has been successfully deleted! Data will refresh in 5 seconds.'
          this.status = true
          setTimeout(function () { self.alert = ''; self.message = ''; self.status = false; self.getUser() }, 5000)
        } else {
          this.alert = 'failure'
          this.status = true
          setTimeout(function () { self.alert = ''; self.message = ''; self.status = false }, 5000)
        }
      }
    },
    async getUser () {
      const response = await AuthenticationService.getAdmin({})
      this.items = response.data
    },
    deactivate (val) {
      this.pager = ''
      this.e2 = val
    }
  },
  created () {
    this.isLoggedIn()
    this.getUser()
  }
}
</script>

<style scoped>
#header {
  height:80px;
  background-color:#42A5F5
}

#header h5 {
  margin-left: 2%;
  color: #FFFFFF
}

.rcard {
  background-color: #FFFFFF;
}

.divider {
  border: 0.5px solid lightgray;
}

.dialog {
  background-color: black;
}
</style>