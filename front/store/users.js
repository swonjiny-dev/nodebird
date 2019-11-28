export const state = () => ({
    user : null,
});

export const mutations = {
    setUser(state , payload){
        console.log('aaaaaa');
        console.log(payload);
        
        state.user = payload;
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
            
        });
    },
    login({commit} , payload){
        this.$axios.post('http://localhost:3001/user/login',{
            email : payload.email, 
            password : payload.password,
        },{
            withCredentials: true, 
        })
        .then((res)=>{
            commit('setUser' , res.data);
        })
        .catch((error)=>{   
            console.error(error);
        });
    },
    logout({commit}, payload){
        this.$axios.post('http://localhost:3001/user/logout',{},{
            withCredentials: true, 
        })
        .then((res)=>{
            commit('setUser' , null);
        })
        .catch((error)=>{
            console.error(error);
        });
    }

}