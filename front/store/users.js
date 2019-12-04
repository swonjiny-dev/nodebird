export const state = () => ({
    user : null,
    followerList : [],
    followingList : [],
});

export const mutations = {
    setUser(state , payload){
        state.user = payload;
    },
    setNickname(state , payload){
        state.user.nickname = payload.nickname;
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
    },
    changeNickname({ commit }, payload) {
        this.$axios.patch('http://localhost:3001/user/nickname', {
            nickname : payload.nickname,
        },{
            withCredentials: true,  
        })
        .then((res)=>{
            commit('setNickname' , payload);
        }).catch((error)=>{
            console.error(error);
        });
      
    }
}