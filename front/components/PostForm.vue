<template>
  <v-card style="margin-bottom: 20px">
      <v-container> 
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitEvent">
            <v-text-field
                v-model="content"
                label="남길말"
                auto-grow
                clearable
                outlined
                :hide-details="hideDetails"
                :success-messages="successMessages"
                :success="success"
                :rules="[v => !!v.trim() || '내용을 입력하세요.']"
                @input="onChangeTextarea"
            ></v-text-field>
            <v-btn type="submit" color="green" :disabled="!valid" absolute right>입력</v-btn>
            <v-btn>이미지 업로드</v-btn>
        </v-form>
      </v-container>
      
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            valid : false,
            content :'',
            hideDetails: true,
            successMessages: '',
            success: false,
        }
    },
    computed: {
        ...mapState('users',['user'])
    },

    methods: {
        onSubmitEvent(){
            if (this.$refs.form.validate()) {
                this.$store.dispatch('post/addPost',{
                    content : this.content
                })
            }            
        },
        onChangeTextarea(val){
            if(val.length){
                this.hideDetails = true;
                this.success = false
            }
        }
    },
    

}
</script>

<style>

</style>