<template>
  <div style="margin-bottom: 20px">
    <v-card>
      <v-image />
      <v-card-title>
        <h3>
          <nuxt-link :to="'/user/' + post.id">{{post.User.nickname}}</nuxt-link>
        </h3>
      </v-card-title>
      <v-card-text>
        <div>
          <div>{{post.content}}</div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="orange">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
  export default {
    props :{
      post :{
        type: Object,
        required: true,
      }
    }
  }
</script>
<style scoped>
  a {
    color: inherit;
    text-decoration: none;
  }
</style>