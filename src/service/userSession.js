
import axios from 'axios';

import GaeAPI from '../apis/gaeAPI'


var isLoggedMixin = {
   
    methods: {
      checkIfLogged(){
          var vm = this;
          console.log("initiate log");
          return new Promise((resolve, reject) => {
            var token = vm.$cookies.get('USER_TOKEN')
            console.log('token');
            console.log(token);
            if (!token){
               return reject("Usuario não esta logado")
            }
            GaeAPI.get('/usuarios', {
               headers:{
                  Authorization: token
               }
            })
               .then(response => {
                  resolve(response.data);
               })
               .catch(error => {
                  
                  this.$cookies.remove("USER_TOKEN")
                  reject(error.response.data);
               })
               .finally(res=>{
                  console.log("_____________________");
               })
          })
          
      }
    }
  }
  
  export default isLoggedMixin;