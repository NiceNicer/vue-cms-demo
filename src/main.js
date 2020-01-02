//入口文件
import Vue from 'vue'
//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2启用路由模块
Vue.use(VueRouter)

//导入格式化时间的插件
import moment from 'moment'

//定义全局的过滤器
Vue.filter('dateFormat',function (dataStr, pattern="YYYY-MM-DD HH-mm-ss") {
	return moment(dataStr).format(pattern)
})


//2.1导入 vue-resource
import VueResource from 'vue-resource'
//2.2安装 vue-resource
Vue.use(VueResource)

//注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)


//每次刚进入网站，肯定会调用main.js,每次调用的时候先把本地存储的购物车数据读出来，放在store中
var car = JSON.parse(localStorage.getItem('car') || '[]')




var store = new Vuex.Store({
	state:{ //this.$store.state.***
		car: car //购物车中商品的数据,商品对象：{id:商品的id, count: 要购买的数量, price: 商品的单价, selected:false}


	},
	mutations:{//this.$store.commit('方法的名称','按需传递唯一的参数')
		addToCar(state, goodsinfo){

			//假设购物车中没有找到对应的商品
			var  flag = false
			//点击加入购物车，把商品信息保存到 store 中的 car 上
			state.car.some(item=>{
				if(item.id == goodsinfo.id){
					item.count += parseInt(goodsinfo.count)
					flag = true
					return true
				}

			})
			//如果最终循环完毕得到的flag还是 false，则把商品数据直接 push 到购物车中

			if(!flag){
				state.car.push(goodsinfo)
			}
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsInfo(state,goodsinfo){
			//修改购物车中的商品的数量值
			state.car.some(item=>{
				if(item.id == goodsinfo.id){
					item.count = parseInt(goodsinfo.count)
					return true
				}
			})
			//当修改完商品的数量，把最新的购物车数据保存到本地
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		removeFormCar(state,id){
			//根据id从store中的购物车中删除对应的那条删除数据
			state.car.some((item,i)=>{
				if(item.id ==id){
					state.car.splice(i,1)
					return true

				}
			})
			localStorage.setItem('car', JSON.stringify(state.car))

		},
		updateGoodsSelected(state,info){
			state.car.some(item=>{
				if(item.id == info.id){
					item.selected = info.selected
				}

			})
			//把最新的购物车商品状态保存到 store 中去
			localStorage.setItem('car', JSON.stringify(state.car))

		}

	},
	getters:{//this.$store.getters.***
		//相当于计算属性，也相当于过滤器
		getAllCount(state){
			var c = 0;
			state.car.forEach(item=>{
				c += item.count
			})
			return c
		},
		getGoodsCount(state){
			var o = {}
			state.car.forEach(item =>{
				o[item.id] = item.count
			})
			return o

		},
		getGoodsSelected(state){
			var o = {}
			state.car.forEach(item=>{
				o[item.id] = item.selected
			})
			return o
		},
		getGoodsCountAndAmount(state){
			var o = {
				count:0,
				amount: 0
			}
			state.car.forEach(item=>{
				if(item.selected){
					o.count += item.count
					o.amount += item.price * item.count

				}

			})
			return o
		}


	}
})



//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/'
//全局设置 post 时候表单数据格式组织形式
Vue.http.options.emulateJSON = true;

// 1导入 mui 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 引入vant
import { Tab, Tabs } from 'vant'
Vue.use(Tab).use(Tabs)


//按需导入 Mint-UI中的组件,按需导入的话不显示懒加载的小图片
// import { Header , Swipe, SwipeItem ,Button , Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)


import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'  //可以显示出按需加载的小图片

//安装图片预览插件
import  VuePreview from 'vue-preview'
Vue.use(VuePreview)




//1.3 导入自己的 router.js路由模块
import router from './router.js'

//导入 App 根组件
import app from './App.vue' 

var vm = new Vue({
	el: "#app",
	render: c => c(app),
	router, //1.4挂载路由对象到 vm实例
	store   //挂载store 状态管理对象
})