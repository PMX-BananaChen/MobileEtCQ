<template>
	<form ref="form" model="form">
		<van-nav-bar left-arrow @click-left="backHome" />
		<!-- 无数据显示 -->
		<div class="van-divider--center" v-show="showT">
			暂无签核数据
		</div>
		<div>
			<loading v-model="showLoading" :text="loadText"></loading>
		</div>
		<van-field v-model="form.managerno" label="主管工号" v-show="false" />
		<van-field v-model="form.type" label="签核类型" v-show="false" />
		<van-field v-model="form.states" label="签核状态" v-show="false" />
		<!-- 待签核清单列表 -->
		<group class="formItem" v-for="(item, index) in opinionsLists" :key="index" id="listId">
			<form-preview :header-label="sss" :header-value="opinionsList[index].createdate" style="color:#1989fa;" 
			 :body-items="opinionsLists[index]" @click.native="goDetailOpin(opinionsList[index].id)"
				:name="opinionsList[index].id" />
		</group>
		
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
		listReleaseapply
	} from "@/api/relapply";
	import Conversion from "@/utils/Conversion";
	import {
		FormPreview,
		Group,
		Loading
	} from 'vux';
	export default {
		data() {
			return {
				id: '',
				sss: '申请时间',
				showT: false, //无数据显示
				opinShow: false,
				opinionsList: [],
				opinionsLists: [],
				// // 第一：错误信息
				// errorMsg: {
				// 	resulta: '',
				// },
				showLoading: true,
				loadText: '加载中...',
				// 表单参数
				form: {
					managerno: this.$store.state.userId,
					type: '正常申請',
					states: '1',
				},
				active: false,
				// 第一：错误信息
				tabbars: [{
						name: "/apply",
						title: "申请",
						normal: require('@/pages/images/pass.png'),
						active: require('@/pages/images/passa.png')
					},
					{
						name: "/login",
						title: "工作台",
						normal: require('@/pages/images/deska.png'),
						active: require('@/pages/images/desk.png')
					},
					{
						name: "/mynavigation",
						title: "我的",
						normal: require('@/pages/images/my.png'),
						active: require('@/pages/images/mya.png')
					},
				]
			};
		},
		created() { //查询数据
			listReleaseapply(this.form).then(response => {
				if (response.code === 200) {
					this.opinionsList = response.rows;
					this.processOpinion();
					this.showLoading = false;
					if (this.opinionsList.length === 0) {
						this.showT = true;
					}
				} else {
					this.showT = true;
				}
			});
		},
		onLoad() {},
		methods: {
			tabIndex(index) {
				index = Number(index)
				this.active = index;
				// 记录当前tab页
				this.$store.commit('setTableIndex', '/managercheck');
				let val = this.tabbars[index].name
				console.log(val);
				this.$router.push(val);
			},
			// 处理传入的数据集 意见
			processOpinion() {
				let arr = [];
				let self = this;
				for (let i = 0; i < self.opinionsList.length; i++) {
					let c = {
						label: "申请人",
						value: self.opinionsList[i].empname,
					};
					let d = {
						label: "日 期",
						value: Conversion.formatDate(self.opinionsList[i].date),
					};
					let e = {
						label: "时 段",
						value: self.opinionsList[i].startime + '~' + self.opinionsList[i].endtime,
					};
					let f = {
						label: "状 态",
						value: Conversion.getOpoinionStates(
							self.opinionsList[i].states
						),
					};
					let arrs = new Array(c, d, e, f);
					arr.push(arrs);
				}
				self.opinShow = arr.length === 0;
				self.opinionsLists = [...arr];
			},
			// 跳转处理意见单详情按钮
			goDetailOpin(value) {
				this.$store.commit('setTableIndex', '/managercheck');
				let val = "/actioncheck" + "?id=" + value
				this.$store.commit('setUserNo', value)
				this.$router.push(val);
			},
			backHome() {
				this.$router.push(this.$store.state.tableIndex);
				// this.onIndexChange(this.tabIndex)
			},
		},
		components: {
			Loading
		}
	};
</script>

<style>
	.van-divider--center
	{
	   text-align: center;
	   font-size: larger;
	   color:#007AFF;
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
	.vux-form-preview >>> .weui-form-preview__value
	{
	  font-size: 0.8em;
	}
	.gridCell >>> .van-icon {
	    font-size: 50px;
	}
	.vant-nav-bar-index >>>.van-icon-arrow-left:before {
	    color: #999999;
		block-size:30px;
	}
</style>
