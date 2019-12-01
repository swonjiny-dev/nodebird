<template>
    <v-container>
        <post-form v-if="user" />
        <div>
            <post-card v-for="p in mainPost" :key="p.id" :post="p" />
        </div>
    </v-container>
</template>

<script>
import PostCard from '~/components/PostCard';
import PostForm from '~/components/PostForm';

export default {
    components: {
      PostCard,
      PostForm,
    },
    computed: {
        mainPost(){
            return this.$store.state.post.mainPosts;
        },
        user(){
            return this.$store.state.users.user;
        }
    },
}
</script>

<style>

</style>