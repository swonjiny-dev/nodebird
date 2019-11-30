<template>
    <div>
        <v-container>
            <v-card style="margin-bottom : 20px">
                <v-container>
                    <v-subheader>내 프로필</v-subheader>
                    <v-form ref="form" v-model="validate" @submit.prevent="onSubmitEvent">
                        <v-text-field
                            v-model="nickname"
                            name="nickname"
                            label="닉네임"
                            :rules="nickrules"
                            required
                        ></v-text-field>
                        <v-btn dark color="blue" :disabled="!validate">수정</v-btn>
                    </v-form>
                </v-container>
            </v-card>

        </v-container>
    </div>
</template>

<script>
export default {
    
    data() {
        return {
            validate : false,
            nickname : '',
            nickrules : [v=>!!v || '닉네임은 필수입니다.'],
        }
    },
    methods: {
        onSubmitEvent(){
            console.log('수정시도1');
            
            this.$store.dispatch('users/changeNickname' , {
                nickname : this.nickname,
            })
           
            
        },
    },
    head(){
        return {
            title : "프로필"
        }
    },
}
</script>

<style>

</style>