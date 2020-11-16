<template>
  <div id="dialog" class="modal">
    <div class="modal-content">
      <div class="modal-header">        
        <span class="close" @click="cancel()">&times;</span>
      </div>
      <div class="modal-body">
        <h2 class="title">{{title ? title : 'Deseja realmente excluir ?'}}</h2>
        <p class="text">{{description ? description : 'Após exclusão os dados não poderão mais ser recuperados'}}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" id="confirm" @click="confirm()">Confirmar</button>
        <button type="button" class="btn btn-secondary" id="cancel" @click="cancel()">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
    props: {
        visible: { type: Boolean },
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
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 25%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Add Animation */
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

/* The Close Button */
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

