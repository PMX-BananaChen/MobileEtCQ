<template>
	<form ref="form" model="form">
		<div class="van-divider--center" v-show="showT">
			暂无数据
		</div>
		<div>
			<van-nav-bar left-arrow @click-left="backHome" />
		</div>
		<div>
			<loading v-model="showLoading" :text="loadText"></loading>
		</div>
		<!-- 待签核清单列表 -->
		<group class="formItem" v-for="(item, index) in opinionsLists" :key="index" id="listId">
			<form-preview :header-label="titles" :header-value="titlesv" style="color:#1989fa;"
				:body-items="opinionsLists[0]" :name="opinionsList.id" />
		</group>
		<van-field v-model="form.startimea" :error-message="errorMsg.resulta" :border="false" />
		<van-tabbar v-model="active" active-color="#ff4c7f" class="weui-tabbar">
			<van-tabbar-item :to="(item.name)" @click="tabIndex(index)" v-for="(item,index) in tabbars"
				:key="'tabbar' + index">
				<span>{{item.title}}</span>
				<template #icon="props">
					<img style="width:20px;height:20px;" :src="props.active ? item.active : item.normal" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</form>
</template>

<script>
	//:header-label="sss" :header-value="opinionsList[index].id"
	import {
		getReleaseapply
	} from "@/api/relapply";
	import Conversion from "@/utils/Conversion";
	import {
		FormPreview,
		Group
	} from 'vux';
	import {
		getEmployee
	} from "@/api/user";
	import {
		getCode
	} from "@/api/login";
	export default {
		data() {
			return {
				id: '',
				titles: '状态',
				titlesv: '已签核',
				showT:false,
				opinShow: false,
				opinionsList: [],
				opinionsLists: [],
				// 第一：错误信息
				errorMsg: {
					resulta: '',
				},
				showLoading: true,
				loadText: '加载中...',
				// 表单参数
				form: {
					startimea: '',
				},
				active: false,
				// 第一：错误信息
				tabbars: [{
						name: "/apply",
						title: "申请",
						normal: require('./images/pass.png'),
						active: require('./images/passa.png')
					},
					{
						name: "/login",
						title: "工作台",
						normal: require('./images/deska.png'),
						active: require('./images/desk.png')
					},
					{
						name: "/mynavigation",
						title: "我的",
						normal: require('./images/my.png'),
						active: require('./images/mya.png')
					},
				]
			};
		},
		created() { //查询数据
			// console.log('url===>' + window.location.href)
			this.id = window.location.href.split('?id=')[1]
			if (this.id == null) {
				this.id = this.$store.state.userNo;
			}
			if (this.$store.state.userId === null || this.$store.state.userId === "") {
				this.setUser(); //从网络进来的重新拿账号
			} else {
				getReleaseapply(this.id).then(response => {
					if (response.code === 200) {
						this.opinionsList = response.data;
						this.processOpinion();
						this.showLoading = false;
					} else {
						this.errorMsg.resulta = "新增失败!";
					}
				});
			}
			//测试账号
			// this.$store.commit('setUserId', 16097)
			// this.setUserName(this.$store.state.userId)
		},
		onLoad() {},
		methods: {
			tabIndex(index) {
				index = Number(index)
				this.active = index;
				// 记录当前tab页
				// sessionStorage.setItem('tabIndex', index)
				let val = this.tabbars[index].name
				console.log(val);
				this.$router.push(val);
			},
			// 处理传入的数据集 意见
			processOpinion() {
				let arr = [];
				let self = this;
				let a = {
					label: "申请员工",
					value: self.opinionsList.empname,
				};
				let b = {
					label: "所在部门",
					value: self.opinionsList.factory,
				};
				let c = {
					label: "出行日期",
					value: Conversion.formatDate(self.opinionsList.date),
				};
				let d = {
					label: "出行时段",
					value: self.opinionsList.startime + '~' + self.opinionsList.endtime,
				};
				let e = {
					label: "申请理由",
					value: self.opinionsList.remark,
				};
				let f = {
					label: "申请日期",
					value: Conversion.formatDate(self.opinionsList.createdate),
				};
				let g = {
					label: "签 核 人",
					value: self.opinionsList.auditusername,
				};
				let h = {
					label: "签核时间",
					value: Conversion.formatDate(
						self.opinionsList.auditdate
					),
				};
				let arrs = new Array(a, b, c, d, e, f, g, h);
				arr.push(arrs);
				self.opinionsLists = [...arr];
			},
			backHome() {
				this.$router.push(this.$store.state.tableIndex);
			},
			setUser() {
				if (
					this.$store.state.userId === '' ||
					this.$store.state.userId === null
				) {
					const code = Conversion.getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
					console.log('code===>' + code)
					if (code) {
						// 通过code获取 openId等用户信息
						getCode(code)
							.then((data) => {
								if (data.code === 1) {
									console.log('授权成功')
									let userId = data.data.empNo.trim()
									this.$store.commit('setUserId', userId)
									this.setUserName(this.$store.state.userId)
									// Toast.clear()
								}
							})
							.catch((err) => {
								console.log(err)
							})
					} else {
						console.log('a' + code)
						Conversion.getCodeApi('a')
					}
				}
			},
			// 获取当前登录人名称
			setUserName(userId) {
				if (userId === null || userId === '') return
				getEmployee(userId)
					.then((data) => {
						if (data.msg === "操作成功") {
							this.$store.commit('setUserName', data.data.empName);
							this.$store.commit('setSex', data.data.empSex);
							getReleaseapply(this.id).then(response => {
								if (response.code === 200) {
									this.opinionsList = response.data;
									this.processOpinion();
									this.showLoading = false;
									// this.$store.commit('setUserId', this.opinionsList.managerno.replace(
									// 	/\b(0+)/gi, ""))
									this.showLoading = false;
									if (this.opinionsList.length === 0) {
										this.errorMsg.resulta = "数据异常!";
									}
								}
							});
						} else {
							console.log(err);
						}
					})
					.catch((err) => {
						console.log(err)
					});
			},
		},
	};
</script>

<style>
	.demo-checkbox-group {
		margin: 10px 0 0 20px;
	}

	.demo-checkbox {
		margin: 100px 0 0 20px;
	}

	.value-class {
		flex: none !important;
	}

	.icon {
		width: 20px;
	}

	.weui-tabbar {
		display: flex;
		position: fixed;
		z-index: 500;
		bottom: 0;
		width: 100%;
		background-color: #f7f7fa;
	}

	.van-tabbar-item--active {
		color: #e10f02;
	}

	.vux-form-preview>>>.weui-form-preview__value {
		font-size: 0.8em;
	}

	.gridCell>>>.van-icon {
		font-size: 50px;
	}
	.vant-nav-bar-index >>>.van-icon-arrow-left:before {
	    color: #999999;
		block-size:30px;
	}
</style>
