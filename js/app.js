(function (window) {
	// 'use strict';

	// Your starting point. Enjoy the ride!
	
	new Vue({
		el:".todoapp",
		created() {
			// 发送ajax  查询页面
			this.render()
		},
		data:{
			list:[],
			now:-1,
			msg:""
		},
		methods:{

			render() {
				axios({
					method:"get",
					url:" http://localhost:3000/todos",
	
				}).then(res=>{
					// console.log(res.data);
					this.list=res.data
				})
			},
			changeFlag(id,flag) {
				// 发送ajax
				axios({
					method:"patch",
					url:` http://localhost:3000/todos/${id}`,
					data:{
						flag:!flag
					}
				}).then(res=>{
					
					this.render()
				})
			},
			delTodo(id) {
				// 发送ajax
				axios({
					method:"delete",
					url:`http://localhost:3000/todos/${id}`


				}).then(()=>{
					this.render()
				})
			},
			changeTodo(id) {
				this.now=id
				console.log(1);
				
			},
			editedTodo(id,name) {
				// v-model实现的 把对象中的name改变了?
				this.now=-1
				axios({
					method:"patch",
					url:` http://localhost:3000/todos/${id}`,
					data:{
						name
					}

				}).then(()=>{
					this.render()
				})
			},
			addTodo() {
				if (this.msg.trim()==="") return
				var obj = {
					id:+new Date,
					name:this.msg,
					flag:false
				}
				this.msg=""
				// 发送ajax
				axios({
					method:"post",
					url:"http://localhost:3000/todos",
					data:obj
				}).then(()=>this.render())
			},
			clearTodo() {
				this.list.filter(e=>e.flag).forEach(e=>{
					this.delTodo(e.id)
				})
			}

		},
		computed: {
			left() {
				return this.list.filter(e=>!e.flag).length
			},
			isAllCheck: {
					get() {
						return this.list.every(e=>e.flag)
					},
					set(v) {
						console.log(v);
						
						return this.list.forEach (e=>{
								this.changeFlag(e.id,!v)
						})
					}
			},
			isFooterShow() {
				return this.list.length>0	
			}
		}



	})

})(window);
