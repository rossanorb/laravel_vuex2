<template>
    <div class="container">
        <div class="py-5 text-center">            
            <h2>Novo Contratox</h2>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form @submit="submit" >
                    <div class="form-group">
                        <label for="email">Email do Proprietário</label>
                        <input type="text"
                         v-bind:class="{ 'form-control is-invalid': emailHasError, 'form-control': !emailHasError }"
                         id="email" maxlength="100" placeholder="" v-model="form.email">
                        <div class="invalid-feedback" v-for="error in errors.email" :key="error">{{ error }}</div>
                    </div>

                    <div class="col-md-12 mt-5">
                        <div class="form-group row">
                            <router-link class="btn btn-secondary" to="/">Cancelar</router-link>
                            <button type="submit" class="btn btn-primary ml-1" >Salvar</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            frontValidation: true, // habilita validação front-end
            emailHasError: false,
            errors: {
                email:[],
            },
            form: {                
                email: null,
                nome: null,
                documento: null,
                tipo_pessoa: null,
                propriedade: null
            }
        }
    },

    methods: {
        clearErrors: function () {
            this.emailHasError = false;
            this.ruaHasError = false;
            this.bairroHasError = false;
            this.cidadeHasError = false;
            this.estadoHasError = false;
            this.errors.email = [];
        },
        checkForm: function () {
            this.clearErrors();

            if(!this.frontValidation){
                return true;
            }

            const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if(!this.form.email){
                this.emailHasError = true;
                this.errors.email.push('O preenchimento do campo e-mail é obrigatório.');
            }else if (!this.form.email.match(mailformat)) {
                this.emailHasError = true;
                this.errors.email.push('O e-mail é inválido.');                
            }            
            
            if(this.errors.email.length > 0 || this.emailHasError ){
                return false;
            }

            return true;             
        },                
        submit: function(e){
            if(this.checkForm()){                
                // this.$store.dispatch('imovel/create', this.form);
                console.log('envia form');
            }            
            
            e.preventDefault();
        }
    }    
}
</script>

<style scoped>

</style>