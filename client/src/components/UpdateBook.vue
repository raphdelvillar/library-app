<template>
  <div id="updateBook">
    <v-layout>
      <v-flex xs12 sm7 offset-sm1>
        <v-card class="lcard" height="450px">
          <v-toolbar class="indigo">
            <v-toolbar-title>Update Book</v-toolbar-title>
          </v-toolbar>
          <div class="pa-2">
            <v-stepper v-model="e1" class="white">
              <v-stepper-header>
                <v-stepper-step step="1" :complete="e1 > 1">Book Details</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2">Confirmation</v-stepper-step>
              </v-stepper-header>
              <v-stepper-content step="1" fluid style="overflow-y:scroll; height:250px">
                <v-form v-model="valid1" ref="form1">
                  <v-layout row>
                    <v-flex xs5>
                      <v-text-field
                        label="ISBN"
                        v-model="isbn"
                        :rules="isbnRules"
                        value=""
                        class="input-group--focused"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs5>
                      <v-text-field
                        label="Name"
                        v-model="name"
                        value=""
                        class="input-group--focused"
                        :rules="nameRules"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs5>
                      <v-text-field
                        label="Genre"
                        v-model="genre"
                        value=""
                        class="input-group--focused"
                        :rules="genreRules"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs5 offset-sm1>
                      <v-text-field
                        label="Category"
                        v-model="category"
                        value=""
                        class="input-group--focused"
                        :rules="categoryRules"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs5>
                      <v-text-field
                        label="Author"
                        v-model="author"
                        value=""
                        class="input-group--focused"
                        :rules="authorRules"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs5>
                      <v-text-field
                        label="Published Date"
                        v-model="published_date"
                        value=""
                        class="input-group--focused"
                        :rules="publishedDateRules"
                        required
                        type="date"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex sm2>
                      <v-btn @click="check(1)" outline class="green--text">Continue
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-stepper-content>
              <v-stepper-content step="2" fluid style="overflow-y:scroll; height:250px">
                <v-alert
                  icon="check_circle"
                  v-if="alert === 'success'"
                  :value="message"
                  transition="scale-transition"
                  style="background-color: green"
                >
                  Book has been updated! You'll be redirected to book page after 3 seconds.
                </v-alert>
                <v-alert
                  icon="warning"
                  v-if="alert === 'failure'"
                  :value="message"
                  transition="scale-transition"
                  style="background-color: red"
                >
                  Sorry! We have encountered an error. Try again later. You'll be redirected to the book page after 3 seconds.
                </v-alert>
                <div v-if="alert === ''">
                  <p><i class="material-icons">chat</i> Are the details below correct?</p>
                </div>
                <p>
                  <b>ID:</b> {{category}}-{{isbn}} <br/>
                  <b>Name:</b> {{name}} <br/>
                  <b>Genre/Category:</b> {{genre}}/{{category}} <br/>
                  <b>Author:</b> {{author}} <br/>
                  <b>Published Date:</b> {{published_date}} <br/>
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
  props: ['updateBookData'],
  data () {
    return {
      e1: 0,
      alert: '',
      message: false,
      valid1: false,
      valid2: false,
      isbn: '',
      name: '',
      genre: '',
      category: '',
      author: '',
      published_date: '',
      rev: '',
      isbnRules: [
        v => !!v || 'ISBN is required'
      ],
      nameRules: [
        v => !!v || 'Name is required'
      ],
      genreRules: [
        v => !!v || 'Genre is required'
      ],
      categoryRules: [
        v => !!v || 'Category is required'
      ],
      authorRules: [
        v => !!v || 'Author is required'
      ],
      publishedDateRules: [
        v => !!v || 'Published Date is required'
      ]
    }
  },
  watch: {
    updateBookData: function () {
      console.log(this.updateBookData)
      this.isbn = this.updateBookData.isbn
      this.name = this.updateBookData.name
      this.genre = this.updateBookData.genre
      this.category = this.updateBookData.category
      this.author = this.updateBookData.author
      this.published_date = this.updateBookData.published_date
      this.rev = this.updateBookData.rev
      this.reader = this.updateBookData.reader
      this.comments = this.updateBookData.comments
    }
  },
  methods: {
    init () {
      this.e1 = 1
      this.alert = ''
      this.message = false
      this.valid1 = false
      this.valid2 = false
      this.isbn = ''
      this.name = ''
      this.genre = ''
      this.category = ''
      this.author = ''
      this.published_date = ''
    },
    async submit () {
      const response = await AuthenticationService.updateBook({
        _id: this.category + '-' + this.isbn,
        _rev: this.rev,
        name: this.name,
        isbn: this.isbn,
        gencat: this.genre + '/' + this.category,
        genre: this.genre,
        category: this.category,
        author: this.author,
        published_date: this.published_date,
        reader: this.reader,
        comments: this.comments
      })
      var self = this
      if (response.data.message === 'success') {
        this.alert = 'success'
        this.message = true
        setTimeout(function () {
          self.$parent.$data.pager = ''
          self.$parent.$parent.$data.pager = ''
          if (self.$parent.$parent.allow_book === 'Admin') {
            self.$parent.$parent.$data.e2 = 1
          } else {
            self.$parent.$parent.$data.e2 = 0
          }
          self.$parent.getBook()
          self.init()
        }, 3000)
      } else {
        this.alert = 'failure'
        this.message = true
        setTimeout(function () {
          self.$parent.$data.pager = ''
          self.$parent.$parent.$data.pager = ''
          if (self.$parent.$parent.allow_book === 'Admin') {
            self.$parent.$parent.$data.e2 = 1
          } else {
            self.$parent.$parent.$data.e2 = 0
          }
          self.init()
        }, 3000)
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
  }
}
</script>

<style scoped>
.lcard {
  background-color: gray;
}

.rcard {
  background-image: url('../assets/library.jpg');
  background-color: #FFFFFF;
}

.indigo {
  color: #FFFFFF;
}

.divider {
  border: 0.5px solid lightgray;
}
</style>