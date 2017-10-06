<template>
  <div id="reader">
    <v-flex xs12 sm12>
      <div style="height:80px"></div>
    </v-flex>

    <v-layout v-show="e2 == 0">
      <my-library></my-library>
    </v-layout>
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
      allow_book: false,
      pager: '',
      e2: 0
    }
  },
  components: {
    'my-library': Library
  },
  methods: {
    logout () {
      this.$router.push('/')
    },
    deactivate (val) {
      this.pager = ''
      this.e2 = val
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