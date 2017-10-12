<template>
  <div id="reader">
    <v-flex xs12 sm12>
      <div id="header">
        <br/><h5>{{ this.$cookie.get('name') }} - {{ this.$cookie.get('role') }}</h5>
      </div>
    </v-flex>

    <my-library></my-library>
    <v-card height="50px">
      <v-bottom-nav
        absolute
        shift
        :value="true"
        :active.sync="e2"
        :class="{
          'yellow lighten-1': e2 === 0,
          'red lighten-1' : e2 === 1,
          'gray lighten-1' : e2 === 2
        }"
      >
        <v-btn @click="deactivate(0)" dark>
          <span>Library</span>
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
import Library from '@/components/Library'

export default {
  data () {
    return {
      allow_book: 'Reader',
      pager: '',
      e2: 0
    }
  },
  components: {
    'my-library': Library
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
    deactivate (val) {
      this.pager = ''
      this.e2 = val
    }
  },
  created () {
    this.isLoggedIn()
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
</style>