<template>
  <div id="library">
    <add-book v-show="this.$parent.$data.pager === 'add-book'"></add-book>
    <update-book v-show="this.$parent.$data.pager === 'update-book'" :updateBookData="updateBookData"></update-book>

    <comment-box v-show="this.$parent.$data.pager === 'comment-box'" :viewCommentData="viewCommentData"></comment-box>
    <add-comment v-show="this.$parent.$data.pager === 'add-comment'"></add-comment>
    <v-flex xs12 sm12 v-show="(this.$parent.$data.e2 === 1 && this.$parent.allow_book === 'Admin') || (this.$parent.$data.e2 === 0 && this.$parent.allow_book === 'Librarian') || (this.$parent.$data.e2 === 0 && this.$parent.allow_book === 'Reader')">
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
          <b v-if="this.$parent.$data.allow_book != 'Reader'">Book Management</b>
          <b v-if="this.$parent.$data.allow_book === 'Reader'">Library</b>
          <v-flex offset-sm1>
            <v-btn v-if="this.$parent.$data.allow_book != 'Reader'" @click="addBook" outline class="indigo--text">Add Book</v-btn>
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
          v-bind:allow_book="this.$parent.$data.allow_book"
        >
          <template slot="items" scope="props">
            <td>{{ props.item.isbn }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.gencat }}</td>
            <td>{{ props.item.author }}</td>
            <td>{{ props.item.published_date }}</td>
            <td>{{ props.item.reader.name }}</td>
            <td v-if="allow_book != 'Reader'">
              <v-btn @click="updateBook(props.item)" class="yellow lighten-1" title="Update Book" icon>
                <v-icon>mode_edit</v-icon>
              </v-btn>
              <v-btn @click="deleteBook(props.item.id, props.item.rev)" class="red lighten-1" title="Delete Book" icon>
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
            <td v-if="allow_book === 'Reader'">
              <v-btn @click="viewComment(props.item)" class="blue lighten-2" title="View Comments" icon>
                <v-icon>reorder</v-icon>
              </v-btn>
              <v-btn @click="returnBook(props.item)" v-if="props.item.reader.id === user" class="yellow lighten-1" title="Return" icon>
                <v-icon>file_upload</v-icon>
              </v-btn>
              <v-btn @click="checkoutBook(props.item)" v-if="props.item.reader.id === ''" class="yellow lighten-1" title="Checkout" icon>
                <v-icon>file_download</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import AddBook from '@/components/AddBook'
import UpdateBook from '@/components/UpdateBook'
import Comment from '@/components/Comment'
import AddComment from '@/components/AddComment'

export default {
  components: {
    'add-book': AddBook,
    'update-book': UpdateBook,
    'comment-box': Comment,
    'add-comment': AddComment
  },
  data () {
    return {
      alert: '',
      allow_book: '',
      user: this.$cookie.get('username'),
      book: {
        'id': '',
        'title': '',
        'comments': '',
        '_rev': ''
      },
      message: '',
      pager: '',
      updateBookData: '',
      viewCommentData: '',
      search: '',
      pagination: {},
      headers: [
        {
          text: 'ISBN',
          align: 'left',
          value: 'isbn'
        },
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
          text: 'Published Date',
          align: 'left',
          value: 'publish'
        },
        {
          text: 'Reader',
          align: 'left',
          value: 'owner'
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
  methods: {
    addBook () {
      this.pager = 'add-book'
      this.$parent.$data.pager = 'add-book'
      this.$parent.$data.e2 = 999
    },
    updateBook (data) {
      this.updateBookData = data
      this.$parent.$data.pager = 'update-book'
      this.$parent.$data.e2 = 999
    },
    viewComment (data) {
      this.viewCommentData = data
      this.$parent.$data.pager = 'comment-box'
      this.$parent.$data.e2 = 999
    },
    async returnBook (data) {
      var r = confirm('Do you want to return this book?')
      if (r === true) {
        var reader = {}
        reader.id = ''
        reader.name = ''
        const response = await AuthenticationService.returnBook({
          _id: data.category + '-' + data.isbn,
          _rev: data.rev,
          name: data.name,
          isbn: data.isbn,
          gencat: data.genre + '/' + data.category,
          genre: data.genre,
          category: data.category,
          author: data.author,
          published_date: data.published_date,
          reader: reader,
          comments: data.comments
        })
        var self = this
        if (response.data.message === 'success') {
          this.alert = 'success'
          this.message = 'Book has been successfully returned! Data will refresh in 5 seconds.'
          this.status = true
          setTimeout(function () { self.alert = ''; self.message = ''; self.status = false; self.getBook() }, 5000)
        } else {
          this.alert = 'failure'
          this.status = true
          setTimeout(function () { self.alert = ''; self.message = ''; self.status = false }, 5000)
        }
      }
    },
    async checkoutBook (data) {
      var r = confirm('Do you want to checkout this book?')
      if (r === true) {
        var reader = {}
        reader.id = this.$cookie.get('username')
        reader.name = this.$cookie.get('name')
        const response = await AuthenticationService.checkoutBook({
          _id: data.category + '-' + data.isbn,
          _rev: data.rev,
          name: data.name,
          isbn: data.isbn,
          gencat: data.genre + '/' + data.category,
          genre: data.genre,
          category: data.category,
          author: data.author,
          published_date: data.published_date,
          reader: reader,
          comments: data.comments
        })
        var self = this
        if (response.data.message === 'success') {
          this.alert = 'success'
          this.message = 'Book has been successfully checkout! Data will refresh in 5 seconds.'
          this.status = true
          setTimeout(function () { self.alert = ''; self.message = ''; self.status = false; self.getBook() }, 5000)
        } else {
          this.alert = 'failure'
          this.status = true
          setTimeout(function () { self.alert = ''; self.message = ''; self.status = false }, 5000)
        }
      }
    },
    async deleteBook (id, rev) {
      var r = confirm('Are you sure you want to delete?')
      if (r === true) {
        const response = await AuthenticationService.deleteBook({
          _id: id,
          _rev: rev
        })
        var self = this
        if (response.data.message === 'success') {
          this.alert = 'success'
          this.message = 'Book has been successfully deleted! Data will refresh in 5 seconds.'
          this.status = true
          setTimeout(function () { self.alert = ''; self.message = ''; self.status = false; self.getBook() }, 5000)
        } else {
          this.alert = 'failure'
          this.status = true
          setTimeout(function () { self.alert = ''; self.message = ''; self.status = false }, 5000)
        }
      }
    },
    async getBook () {
      const response = await AuthenticationService.getBook({})
      this.items = response.data
    }
  },
  async created () {
    this.allow_book = this.$parent.allow_book
    this.getBook()
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