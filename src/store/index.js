import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    // data
    state:{
        username: '',
    },
    // 计算属性
    getters:{

    },
    // methods
    mutations:{

    },
    // 异步方法
    actions:{
        login(state,value){
            return new Promise(function(resolve,reject){
                state.username = value;
                window.localStorage.setItem('user',value);
                resolve();
            })
        }
    },
    // 模块
    modules:{

    }
})

export default store;