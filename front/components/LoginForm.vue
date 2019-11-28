<template>
    <v-container v-if="!user">
        <v-card>
            <v-form ref="form" v-model="valid" @submit.prevent="sumitEvent" >
                <v-container>
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="이메일"
                        type="email"
                        required
                    />
                    <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        label="비밀번호"
                        type="password"
                        required
                    />
                    <v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
                    <v-btn nuxt to="/signup">회원가입</v-btn>
                </v-container>
            </v-form>
        </v-card>
            
    </v-container>
    <v-container v-else>
        <v-card>
            <v-container>
                {{user.nickname}} 님 로그인!
                <v-btn color="success" @click="logoutEvent" >로그아웃</v-btn>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            valid : false,
            email : '',
            password :'',
            emailRules : [
                v=> !!v ||  '이메일은 필수 입니다.',
                v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
            ],
            passwordRules : [
                v=>!!v || '비밀번호는 필수입니다.'
            ]
        }
    },
    computed : {
        user(){
            return this.$store.state.users.user;
        }
    },
    methods: {
        sumitEvent(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('users/login',{
                    email : this.email,
                    password : this.password
                })
                .then(()=>{
                    console.log('로그인 성공');
                    this.$router.push({
                        path :'/'
                    });

                }).catch((error)=>{
                    console.log('로그인실패');
                    console.error(error);
                    
                });
            }
        },
        logoutEvent(){
            console.log('로그아웃함');
            this.$store.dispatch('users/logout')
            .then(()=>{
                console.log('로그아웃됨');
                
            })
            .catch((error)=>{
                console.error(error);
                
            })
        }
    },
    
}
</script>

<style>

</style>