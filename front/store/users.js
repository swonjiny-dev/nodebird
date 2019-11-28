export const state = () => ({
    user : null,
});

export const mutations = {
    setUser(state , payload){
        state.user = payload
    }
}

export const actions = {
    signUp({commit , state} , payload){
        this.$axios.post('http://localhost:3001/user',{
            email : payload.email,
            password : payload.password,
            nickname : payload.nickname
        },{
            withCredentials: true, 
        })
        .then((res)=>{
            commit('setUser' , res.data);
        })
        .catch((error)=>{
            console.error(error);
            
        })
        ;
    }
}