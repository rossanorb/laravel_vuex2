// Component Dialog - Rossano Bavaresco - rossanorb@gmail.com
<template>
    <div id="dialog" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">                    
                    <button type="button" class="close"  @click="cancel()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h2 class="title">{{title ? title : 'Deseja realmente excluir ?'}}</h2>
                    <p class="text">{{description ? description : 'Após exclusão os dados não poderão mais ser recuperados'}}</p>
                </div>
                <div class="modal-footer">                    
                    <div class="col-xs-12 col-sm-4">
                        <button type="button" class="btn btn-danger btn-md btn-block" id="confirm" @click="confirm()">Confirmar</button>
                    </div>
                    <div class="col-xs-12 col-sm-4">
                        <button type="button" class="btn btn-secondary btn-md btn-block" id="cancel" @click="cancel()">Cancelar</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
  name: "Dialog",
    props: {        
        title: { type: String},
        description: { type: String},
        callback: { type: Function },
    },
    data() {
        return {};
    },
    methods: {
        cancel: function () {
            this.$emit("show", false);
        },

        confirm: function () {
            this.cancel();            
            this.callback();
        }
    },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content{
    position: relative;
    background-color: #fefefe;
    margin: auto;
    border: 1px solid #888;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;
}

@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

.close {
  color: gray;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  border-bottom: none;
  
  padding: 2px 16px;  
  color: white;
}

.modal-body {
  padding: 2px 16px;  
  text-align: center;
}

.modal-footer {
  padding: 2px 16px;  
  color: white;
  border-top: none;
  justify-content: center;
}
</style>

