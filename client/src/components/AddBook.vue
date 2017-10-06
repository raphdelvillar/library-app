<template>
  <div id="addBook">
    <v-layout>
      <v-flex xs12 sm7 offset-sm1>
        <v-card class="lcard" height="450px">
          <v-toolbar class="indigo">
            <v-toolbar-title>Add Book</v-toolbar-title>
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
                      <v-menu
                        lazy
                        :close-on-content-click="false"
                        v-model="menu"
                        transition="scale-transition"
                        offset-y
                        full-width
                        :nudge-right="40"
                        max-width="290px"
                        max-height="290px"
                      >
                        <v-text-field
                          slot="activator"
                          label="Published Date"
                          v-model="published_date"
                          class="input-group--focused"
                          :rules="publishedDateRules"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="published_date" no-title scrollable actions>
                          <template scope="{ save, cancel }">
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn flat primary @click="cancel">Cancel</v-btn>
                              <v-btn flat primary @click="save">Ok</v-btn>
                            </v-card-actions>
                          </template>
                        </v-date-picker>
                      </v-menu>
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
              <v-stepper-content step="2" fluid>
                <p><i class="material-icons">chat</i> Are the details below correct?</p>
                <br/>
                <p>
                  <b>ID:</b> {{category}}-{{isbn}} <br/>
                  <b>Name:</b> {{name}} <br/>
                  <b>Genre/Category:</b> {{genre}}/{{category}} <br/>
                  <b>Author:</b> {{author}} <br/>
                  <b>Published Date:</b> {{published_date}} <br/>
                  <br/><br/>
                </p>
                <v-layout>
                  <v-flex sm2>
                    <v-btn @click="submit()" outline class="green--text">Finish
                    </v-btn>
                  </v-flex>
                  <v-flex sm2 offset-sm8>
                    <v-btn @click="back(1)" outline class="red--text">
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
// import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      menu: false,
      modal: false,
      e1: 0,
      valid1: false,
      valid2: false,
      isbn: '',
      isbnRules: [
        v => !!v || 'ISBN is required'
      ],
      name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      genre: '',
      genreRules: [
        v => !!v || 'Genre is required'
      ],
      category: '',
      categoryRules: [
        v => !!v || 'Category is required'
      ],
      author: '',
      authorRules: [
        v => !!v || 'Author is required'
      ],
      published_date: '',
      publishedDateRules: [
        v => !!v || 'Published Date is required'
      ]
    }
  },
  methods: {
    async register () {
      /*
      const response = await AuthenticationService.register({
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
        role: this.role,
        status: this.status
      })
      */
    },
    submit () {

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