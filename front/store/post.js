export const state = () => ({
    mainPosts: [],
    hasMorePost: true,
});

export const mutations = {
    addPost(state , payload) {
        state.mainPosts.unshift(payload);
    }
}

export const actions = {
    addPost({commit} , payload){
        this.$axios.post('http://localhost:3001/post', {
            content: payload.content,
        }, {
            withCredentials: true,
        })
        .then((res) => {
            commit('addPost', res.data);
        }).catch((error) => {
            console.error(error);
        });
       
    }
}