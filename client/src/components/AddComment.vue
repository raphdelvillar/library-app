<template>
  <div id="addComment">
    <v-layout>
      <v-flex xs12 sm7 offset-sm1>
        <v-card class="lcard" height="450px">
          <v-toolbar class="indigo">
            <v-toolbar-title>Add Comment</v-toolbar-title>
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
                      <p><b>Please select book rating:</b></p>
                      <v-radio-group v-model="rate" :rules="rateRules" column>
                        <v-radio label="1" value="1"></v-radio>
                        <v-radio label="2" value="2"></v-radio>
                        <v-radio label="3" value="3"></v-radio>
                        <v-radio label="4" value="4"></v-radio>
                        <v-radio label="5" value="5"></v-radio>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs10>
                      <v-text-field
                        label="Comment"
                        v-model="comment"
                        value=""
                        class="input-group--focused"
                        :rules="commentRules"
                        multi-line
                        required
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
                  Your comment has been posted! You'll be redirected to the book page after 3 seconds.
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
                  <b>Rate: </b> {{rate}}/5 <br/>
                  <b>Comment: </b> {{comment}} <br/>
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
      rate: '',
      rateRules: [
        v => !!v || 'Rate is required'
      ],
      comment: '',
      commentRules: [
        v => !!v || 'Comment is required'
      ]
    }
  },
  methods: {
    init () {
      this.e1 = 1
      this.alert = ''
      this.message = false
      this.valid1 = false
      this.valid2 = false
      this.rate = ''
      this.comment = ''
    },
    check (val) {
      if (this.$refs.form1.validate() && val === 1) {
        this.e1 = val + 1
      } else if (this.$refs.form2.validate() && val === 2) {
        this.e1 = val + 1
      }
    },
    async submit () {
      var book = this.$parent.book
      var list = {}
      list.reader = {}
      list.reader.name = this.$cookie.get('name')
      list.rate = this.rate
      list.comment = this.comment
      var comments = book.comments
      if (this.$parent.book.comments === '') {
        comments = []
        comments.push(list)
      } else comments.push(list)
      const response = await AuthenticationService.createComment({
        _id: book.category + '-' + book.isbn,
        _rev: book.rev,
        name: book.name,
        isbn: book.isbn,
        gencat: book.genre + '/' + book.category,
        genre: book.genre,
        category: book.category,
        author: book.author,
        published_date: book.published_date,
        reader: book.reader,
        comments: comments
      })
      var self = this
      if (response.data.message === 'success') {
        this.alert = 'success'
        this.message = true
        setTimeout(function () {
          self.$parent.$data.pager = ''
          self.$parent.$parent.$data.pager = ''
          self.$parent.$parent.$data.e2 = 0
          self.$parent.getBook()
          self.init()
        }, 3000)
      } else {
        this.alert = 'failure'
        this.message = true
        setTimeout(function () {
          self.$parent.$data.pager = ''
          self.$parent.$parent.$data.pager = ''
          self.$parent.$parent.$data.e2 = 0
          self.init()
        }, 3000)
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