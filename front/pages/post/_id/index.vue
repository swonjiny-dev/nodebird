<template>
    <v-container v-if="post">
        <post-card :post="post"></post-card>
    </v-container>
    <div v-else>
        등록한 게시글이 없습니다.
    </div>
</template>

<script>
import PostCard  from "~/components/PostCard";
export default {
    components : {
        PostCard,
    },
    computed: {
        post(){
            return this.$store.state.post.mainPosts.find(v=>v.id=== parseInt(this.$route.params.id,10 ))
        }
    },
}
</script>

<style>


</style>