<template>
    <div class="container">
        <div class="py-5 text-center">            
            <h2>Novo Contrato</h2>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form @submit="submit" >

                    <div class="form-group">
                        <label for="contratante">* Nome completo do contratante</label>
                        <input type="text" 
                        v-bind:class="{ 'form-control is-invalid': contratanteHasError, 'form-control': !contratanteHasError }"
                        id="contratante" maxlength="50" placeholder="" v-model="form.contratante">
                        <div class="invalid-feedback">{{ errors.contratante }}</div>
                    </div>

                    <div class="form-group">
                        <label for="email">*  E-mail do contratante</label>
                        <input type="text"
                         v-bind:class="{ 'form-control is-invalid': emailHasError, 'form-control': !emailHasError }"
                         id="email" maxlength="30" placeholder="" v-model="form.email">
                        <div class="invalid-feedback" v-for="error in errors.email" :key="error">{{ error }}</div>
                    </div>

                    <div class="form-group">
                        <label for="tipo_pessoa">*  Tipo pessoa</label>
                        <select id="tipo_pessoa"  v-model="form.tipo_pessoa" v-bind:class="{ 'form-control is-invalid': tipoPessoaHasError, 'form-control': !tipoPessoaHasError }">
                            <option value="">Selecione...</option>
                            <option value="true">Pessoa física</option>
                            <option value="false">Pessoa jurídica</option>
                        </select>
                        <div class="invalid-feedback">{{ errors.tipo_pessoa }}</div>
                    </div>                   
                    
                    <div class="form-group">
                        <label for="documento">*  Documento</label>
                        <input type="text" v-bind:class="{ 'form-control is-invalid': documentoHasError, 'form-control': !documentoHasError }"
                        v-mask="['###.###.###-##', '##.###.###/####-##']"
                         id="documento" maxlength="20" v-model="form.documento">
                        <div class="invalid-feedback">{{ errors.documento }}</div>
                    </div>

                    <div class="form-group">
                        <label for="propriedade">*  Propriedade</label>
                        <select id="propriedade" v-model="form.propriedade" v-bind:class="{ 'form-control is-invalid': propriedadeHasError, 'form-control': !propriedadeHasError }">
                            <option value="">Selecione...</option>
                            <option v-for="(imovel, index) in this.imoveis.result" :key="imovel.id" :value="imovel.id">
                                {{ getText[index] }}
                            </option>
                        </select>
                        <div class="invalid-feedback">{{ errors.propriedade }}</div>
                    </div>

                    <p>*  campos obrigatórios</p>
                    
                    <div class="col-md-12 mt-5">
                        <div class="form-group row">
                            <router-link class="btn btn-secondary" to="/">Cancelar</router-link>
                            <button type="submit" class="btn btn-primary ml-1" >Salvar</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
        <Snackbar ref='msgComponent' />
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import {mask} from 'vue-the-mask';
import Snackbar from '@/components/snackbar';

export default {
	components: {
		Snackbar
	},
    directives: {mask},
    data: function(){
        return {            
            frontValidation: true, // habilita validação front-end
            emailHasError: false,
            contratanteHasError: false,
            tipoPessoaHasError: false,
            documentoHasError: false,
            propriedadeHasError: false,
            errors: {
                email:[],
                nome: []
            },
            form: {                
                email: null,
                contratante: null,
                documento: null,                
                tipo_pessoa: "",
                propriedade: ""
            }
        }
    },

    computed: mapState({
        ...mapGetters('imovel', ['imoveis']),
        ...mapGetters('contrato', ['contrato','action']),
        getText: function(){
           return this.imoveis.result.map(item =>{
               let endereco = '';

               endereco = `${item.rua}, `;

               if(item.numero){
                    endereco += `${item.numero}, `;
               }

               if(item.complemento){
                   endereco += `${item.complemento}, `;
               }

                endereco += `${item.bairro} `;

				
				return endereco;
			});            
        }
    }),

    watch: {
        contrato() {

            if(this.action == 'create'){
                
                if(this.contrato.status){                    
                    this.showMessage();
                }else{
                    const hasErrors = Object.prototype.hasOwnProperty.call(this.contrato.result, 'errors');
                    if (hasErrors) {

                        const imovel = Object.prototype.hasOwnProperty.call(this.contrato.result.errors, 'imovel');
                        if(imovel){
                            let error = this.errors.bairro = this.contrato.result.errors.imovel;
                            alert(error);
                        }

                        const contratante = Object.prototype.hasOwnProperty.call(this.contrato.result.errors, 'contratante');
                        if(contratante){
                            this.contratanteHasError = true;
                            this.errors.contratante = this.contrato.result.errors.contratante[0];
                        }

                       const email = Object.prototype.hasOwnProperty.call(this.contrato.result.errors, 'email');
                        if(email){
                            this.emailHasError = true;
                            let errors = this.errors.bairro = this.contrato.result.errors.email;                            
                            for(let error of errors){
                                this.errors.email.push(error);
                            }
                        }

                        const tipo_pessoa = Object.prototype.hasOwnProperty.call(this.contrato.result.errors, 'tipo_pessoa');
                        if(tipo_pessoa){
                            this.tipoPessoaHasError = true;
                            this.errors.tipo_pessoa = this.contrato.result.errors.tipo_pessoa[0];
                        }

                        const documento = Object.prototype.hasOwnProperty.call(this.contrato.result.errors, 'documento');
                        if(documento){
                            this.documentoHasError = true;
                            this.errors.documento = this.contrato.result.errors.documento[0];
                        }

                        const propriedade = Object.prototype.hasOwnProperty.call(this.contrato.result.errors, 'imovel_id');
                        if(propriedade){
                            this.propriedadeHasError = true;
                            this.errors.propriedade = this.contrato.result.errors.propriedade[0];
                        }                        

                        
                    }
                }

            }
            
            
        }
    },

    created() {
		this.propriedades('contrato=false');
    },
    
    methods: {
        ...mapActions('imovel', ['remove','propriedades']),
        showMessage: function() {
            const router = this.$router;
            this.$refs.msgComponent.show({
                msg: 'Contrato realizado com sucesso!',
                bgcolor: 'success',  // parametro opcional
                callback: function(){ // parametro opcional
                    router.push('/');
                }
            })            
        },
        clearErrors: function () {
            this.emailHasError = false;            
            this.contratanteHasError = false;
            this.tipoPessoaHasError = false;
            this.documentoHasError = false,
            this.propriedadeHasError = false,
            this.errors.email = [];
        },
        checkForm: function () {
            this.clearErrors();

            if(!this.frontValidation){
                return true;
            }

            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if(!this.form.email){
                this.emailHasError = true;
                this.errors.email.push('O preenchimento do campo e-mail é obrigatório.');
            }else if (!this.form.email.match(emailRegex)) {
                this.emailHasError = true;
                this.errors.email.push('O e-mail é inválido.');                
            }

            if(!this.form.contratante){
                this.contratanteHasError = true;
                this.errors.contratante = 'O preenchimento do campo contratante é obrigatório.';
            }

            let documentoRegex = '';
            if(this.form.tipo_pessoa == ''){
                this.tipoPessoaHasError = true;
                this.errors.tipo_pessoa = 'Selecione o tipo pessoa.';

            }else if(this.form.tipo_pessoa == 'true'){
                documentoRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
            }else if(this.form.tipo_pessoa == 'false'){
                documentoRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
            }

            if(!this.form.documento){
                this.documentoHasError = true;
                this.errors.documento = 'O preenchimento do campo documento é obrigatório.';
            }else{
                if (!this.form.documento.match(documentoRegex)) {
                    this.documentoHasError = true;
                    if(this.form.tipo_pessoa == 'true'){
                        this.errors.documento = 'O CPF é inválido.';
                    }else if(this.form.tipo_pessoa == 'false'){
                        this.errors.documento = 'O CNPJ é inválido.';
                    }

                }
            }

            if(!this.form.propriedade){
                this.propriedadeHasError = true;
                this.errors.propriedade = 'Selecione a propriedade.';
            }
            
            if(
                this.errors.email.length > 0 || this.emailHasError || this.contratanteHasError || 
                this.tipoPessoaHasError || this.documentoHasError || this.propriedadeHasError 
            ){
                return false;
            }

            return true;             
        },
        
        submit: function(e){
            if(this.checkForm()){                
                this.$store.dispatch('contrato/create', this.form);
            }
            
            e.preventDefault();
        }
    }    
}
</script>

<style scoped>

</style>