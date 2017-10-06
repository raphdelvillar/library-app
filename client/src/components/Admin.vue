<template>
  <div id="admin">
    <v-flex xs12 sm12>
      <div style="height:80px"></div>
    </v-flex>

    <add-admin v-show="pager == 'add-admin'"></add-admin>
    <add-book v-show="pager == 'add-book'"></add-book>

    <v-layout v-show="e2 == 0">
      <v-flex xs12 sm10 offset-sm1>
        <v-card class="rcard" height="450px" style="overflow-y:scroll">
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
                <v-btn class="yellow lighten-1" title="Update User" icon>
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

    <v-layout v-show="e2 == 1">
      <my-library></my-library>
    </v-layout>
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
import AddBook from '@/components/AddBook'
import Library from '@/components/Library'

export default {
  data () {
    return {
      alert: '',
      message: '',
      status: false,
      allow_book: true,
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
    'add-book': AddBook
  },
  methods: {
    logout () {
      this.$router.push('/')
    },
    addUser () {
      this.pager = 'add-admin'
      this.e2 = 999
    },
    async deleteUser (id, rev) {
      var r = confirm('Are you sure you want to delete?')
      if (r === true) {
        const response = await AuthenticationService.deleteUser({
          id: id,
          rev: rev
        })
        var self = this
        if (response.data.message === 'success') {
          this.alert = 'success'
          this.message = 'User has been successfully deleted!'
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
      var container = []
      const response = await AuthenticationService.getAdmin({})
      response.data.forEach(function (v, k) {
        var list = {}
        list.value = false
        list.id = v['key']['_id']
        list.rev = v['key']['_rev']
        list.name = v['key']['firstname'] + ' ' + v['key']['lastname']
        list.email = v['key']['email']
        list.phone = v['key']['phone']
        list.role = v['key']['role']
        list.status = v['key']['status']
        container.push(list)
      })
      this.items = container
    },
    deactivate (val) {
      this.pager = ''
      this.e2 = val
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style scoped>
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