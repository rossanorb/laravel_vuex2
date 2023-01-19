// Component snackbar - Rossano Bavaresco - rossanorb@gmail.com
<template>
  <div id="snackbar" :class="snackbarClass">{{ msg }}</div>
</template>

<script>
export default {
  name: "Snackbar",
  data() {
		return {
			snackbarClass: "",
			msg: "",
		};
  },
  methods: {
	timeout: function(ms){
		return new Promise((resolve) => setTimeout(resolve, ms));
	},
	setclass: function(param){
		let bgcolor = ''
		const hasBgcolor = Object.prototype.hasOwnProperty.call(param, 'bgcolor');
		if(hasBgcolor){
			bgcolor = param.bgcolor || '';
		}		
		this.snackbarClass = `show ${bgcolor}`;
	},
    show: async function(param){
		this.msg = param.msg || '';
		this.setclass(param);
		await this.timeout(3000).then(()=>{
			this.snackbarClass = "";
		}).then(()=>{
			const hasCallback = Object.prototype.hasOwnProperty.call(param, 'callback');
			if(hasCallback && typeof param.callback === "function"){
				param.callback();
			}
		});
    }
  },
};
</script>

<style scoped>
#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1000;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

#snackbar.show.primary {
  background-color: rgb(42, 92, 231);
}

#snackbar.show.secondary {
  background-color: rgb(61, 42, 231);
}

#snackbar.show.danger {
  background-color: rgb(204, 29, 29);
}

#snackbar.show.success {
  background-color: rgb(55, 131, 48);
}

#snackbar.show.warning {
  background-color: rgb(235, 131, 34);
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>