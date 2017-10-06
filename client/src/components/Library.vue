<template>
  <v-flex xs12 sm10 offset-sm1>
    <v-card class="rcard" height="450px">
      <div style="height:2%"></div>
      <v-card-title>
        <b v-if="allow_book">Book Management</b>
        <b v-if="!allow_book">Library</b>
        <v-flex v-if="allow_book" offset-sm1>
          <v-btn @click="addBook" outline class="indigo--text">Add Book</v-btn>
        </v-flex>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        v-bind:headers="headers"
        v-bind:search="search"
        v-bind:items="items"
      >
        <template slot="items" scope="props">
          <td>{{ props.items.name }}</td>
          <td>{{ props.items.gencat }}</td>
          <td>{{ props.items.author }}</td>
          <td>{{ props.items.publish_date }}</td>
          <td>
            <v-btn class="yellow lighten-1" title="Update Book" icon>
              <v-icon>mode_edit</v-icon>
            </v-btn>
            <v-btn class="red lighten-1" title="Delete Book" icon>
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-flex>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      allow_book: true,
      search: '',
      pagination: {},
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Genre/Category',
          align: 'left',
          value: 'gencat'
        },
        {
          text: 'Author',
          align: 'left',
          value: 'author'
        },
        {
          text: 'Publish Date',
          align: 'left',
          value: 'publish'
        }
      ],
      items: []
    }
  },
  methods: {
    addBook () {
      this.$parent.$data.pager = 'add-book'
      console.log(this.$parent.$data)
      this.$parent.$data.e2 = 999
    }
  },
  async created () {
    this.allow_book = this.$parent.$data.allow_book

    var container = []
    const response = await AuthenticationService.getBook({})
    response.data.forEach(function (v, k) {
      var list = {}
      list.value = false
      list.id = v['key']['id']
      list.name = v['key']['name']
      list.gencat = v['key']['genre'] + '/' + v['key']['category']
      list.author = v['key']['author']
      list.publish_date = v['key']['publish_date']
      container.push(list)
    })
    this.items = container
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
</style>