<template>
    <div class="container">
        <div class="py-5 text-center">            
            <h2>Novo Contrato</h2>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form @submit="submit" >

                    <div class="form-group">
                        <label for="nome">Nome completo do contratante</label>
                        <input type="text" 
                        v-bind:class="{ 'form-control is-invalid': nomeHasError, 'form-control': !nomeHasError }"
                        id="nome" maxlength="50" placeholder="" v-model="form.nome">
                        <div class="invalid-feedback">{{ errors.nome }}</div>
                    </div>

                    <div class="form-group">
                        <label for="email">E-mail do contratante</label>
                        <input type="text"
                         v-bind:class="{ 'form-control is-invalid': emailHasError, 'form-control': !emailHasError }"
                         id="email" maxlength="100" placeholder="" v-model="form.email">
                        <div class="invalid-feedback" v-for="error in errors.email" :key="error">{{ error }}</div>
                    </div>

                    <div class="form-group">
                        <label for="tipo_pessoa">Tipo pessoa</label>
                        <select id="tipo_pessoa"  v-model="form.tipo_pessoa" v-bind:class="{ 'form-control is-invalid': tipoPessoaHasError, 'form-control': !tipoPessoaHasError }">
                            <option value="">Selecione...</option>
                            <option value="true">Pessoa física</option>
                            <option value="false">Pessoa jurídica</option>
                        </select>
                        <div class="invalid-feedback">{{ errors.tipo_pessoa }}</div>
                    </div>                   
                    
                    <div class="form-group">
                        <label for="documento">Documento</label>
                        <input type="text" v-bind:class="{ 'form-control is-invalid': documentoHasError, 'form-control': !documentoHasError }"
                        v-mask="['###.###.###-##', '##.###.###/####-##']"
                         id="documento" maxlength="100" v-model="form.documento">
                        <div class="invalid-feedback">{{ errors.documento }}</div>
                    </div>

                    <div class="form-group">
                        <label for="propriedade">Propriedade</label>
                        <select id="propriedade" v-model="form.propriedade" v-bind:class="{ 'form-control is-invalid': propriedadeHasError, 'form-control': !propriedadeHasError }">
                            <option value="">Selecione...</option>
                            <option v-for="(imovel, index) in this.response.result" :key="imovel.id" :value="imovel.id">
                                {{ getText[index] }}
                            </option>
                        </select>
                        <div class="invalid-feedback">{{ errors.propriedade }}</div>
                    </div>
                    {{this.form}}
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
import { mapState, mapGetters, mapActions } from 'vuex';
import {mask} from 'vue-the-mask';

export default {
    components: {},
    directives: {mask},
    data: function(){
        return {            
            frontValidation: true, // habilita validação front-end
            emailHasError: false,
            nomeHasError: false,
            tipoPessoaHasError: false,
            documentoHasError: false,
            propriedadeHasError: false,
            errors: {
                email:[],
                nome: []
            },
            form: {                
                email: null,
                nome: null,
                documento: null,                
                tipo_pessoa: "",
                propriedade: ""
            }
        }
    },

    computed: mapState({
        ...mapGetters('imovel', ['response']),
        getText: function(){
           return this.response.result.map(item =>{
               const complemento = Object.prototype.hasOwnProperty.call(item, 'complemento');
				if(complemento){
					return `${item.rua}, ${item.numero}, ${item.complemento}, ${item.bairro}`;
				}
				
				return `${item.rua}, ${item.numero}, ${item.bairro}`;
			});            
        }
    }),

    created() {
		this.list();
    },
    
    methods: {
        ...mapActions('imovel', ['remove','list']),
        clearErrors: function () {
            this.emailHasError = false;            
            this.nomeHasError = false;
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

            if(!this.form.nome){
                this.nomeHasError = true;
                this.errors.nome = 'O preenchimento do campo nome é obrigatório.';
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
            
            if(this.errors.email.length > 0 || this.emailHasError || this.nomeHasError || this.tipoPessoaHasError || this.documentoHasError || this.propriedadeHasError ){
                return false;
            }

            return true;             
        },
        
        submit: function(e){
            if(this.checkForm()){                
                // this.$store.dispatch('contrato/create', this.form);
                console.log('envia form');
            }            
            
            e.preventDefault();
        }
    }    
}
</script>

<style scoped>

</style>