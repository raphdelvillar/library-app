<template>
  <div id="comment">
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
          <b>{{title}}</b>
          <v-flex offset-sm1>
            <v-btn @click="addComment()" outline class="indigo--text">Add Comment</v-btn>
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
            <td><i class="material-icons" style="color:#CCCC00" v-for="n in parseInt(props.item.rate)">grade</i></td>
            <td>{{ props.item.comment }}</td>
            <td>{{ props.item.reader.name }}</td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  props: ['viewCommentData'],
  data () {
    return {
      alert: '',
      title: '',
      allow_book: '',
      user: this.$cookie.get('username'),
      message: '',
      search: '',
      pagination: {},
      headers: [
        {
          text: 'Rating',
          align: 'left',
          value: 'rate'
        },
        {
          text: 'Comment',
          align: 'left',
          value: 'comment'
        },
        {
          text: 'By',
          align: 'left',
          value: 'rate'
        }
      ],
      items: []
    }
  },
  watch: {
    viewCommentData: function () {
      this.title = this.viewCommentData.isbn + ' - ' + this.viewCommentData.name + ' by: ' + this.viewCommentData.author
      this.$parent.book = this.viewCommentData
      this.getComment(this.viewCommentData._id)
    }
  },
  methods: {
    async getComment (id) {
      const response = await AuthenticationService.getComment({ id: id })
      this.$parent.book.comments = response.data
      this.items = response.data
    },
    addComment () {
      console.log(this.$parent.$parent.pager)
      this.$parent.$parent.pager = 'add-comment'
    }
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