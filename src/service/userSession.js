
import axios from 'axios';

import GaeAPI from '../apis/gaeAPI'



var isLoggedMixin = {
    methods: {
      checkIfLogged(){
          var vm = this;
          console.log("initiate log");
          return new Promise((resolve, reject) => {
            var token = document.cookie
            console.log(token);
            GaeAPI.get('/usuarios', {
               headers:{
                  Authorization: token
               }
            })
               .then(response => {
                  resolve(response.data);
               })
               .catch(error => {
                  reject(error.response.data);
               });
          })
          
      }
    }
  }
  
  export default isLoggedMixin;