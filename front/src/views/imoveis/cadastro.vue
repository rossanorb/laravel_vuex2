<template>
    <div class="container">
        <div class="py-5 text-center">            
            <h2>Cadastro de Imóvel</h2>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form @submit="submit" >
                    <div class="form-group">
                        <label for="email">* Email do Proprietário</label>
                        <input type="text"
                         v-bind:class="{ 'form-control is-invalid': emailHasError, 'form-control': !emailHasError }"
                         id="email" maxlength="30" placeholder="" v-model="form.email">
                        <div class="invalid-feedback" v-for="error in errors.email" :key="error">{{ error }}</div>
                    </div>

                    <div class="form-group">
                        <label for="rua">* Rua</label>
                        <input type="text" 
                        v-bind:class="{ 'form-control is-invalid': ruaHasError, 'form-control': !ruaHasError }"
                        id="rua" maxlength="50" placeholder="" v-model="form.rua">
                        <div class="invalid-feedback">{{ errors.rua }}</div>
                    </div>

                    <div class="form-group">
                        <label for="numero">Número</label>
                        <input type="text" class="form-control" id="numero" maxlength="15" placeholder="" v-model="form.numero">
                    </div>                    

                    <div class="form-group">
                        <label for="complemento">Complemento</label>
                        <input type="text" class="form-control" id="complemento" maxlength="50" placeholder="" v-model="form.complemento">
                    </div>

                    <div class="form-group">
                        <label for="bairro">* Bairro</label>
                        <input type="text" v-bind:class="{ 'form-control is-invalid': bairroHasError, 'form-control': !bairroHasError }"
                        id="bairro" maxlength="50" placeholder="" v-model="form.bairro">
                        <div class="invalid-feedback">{{ errors.bairro }}</div>
                    </div>

                    <div class="form-group">
                        <label for="cidade">* Cidade</label>
                        <input type="text" v-bind:class="{ 'form-control is-invalid': cidadeHasError, 'form-control': !cidadeHasError }"
                        id="cidade" maxlength="50" placeholder="" v-model="form.cidade">
                        <div class="invalid-feedback">{{ errors.cidade }}</div>
                    </div>

                    <div class="form-group">
                        <label for="estado">* Estado</label>
                        <select v-bind:class="{ 'form-control is-invalid': estadoHasError, 'form-control': !estadoHasError }" id="estado" v-model="form.estado">
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>                            
                        </select>
                        <div class="invalid-feedback">{{ errors.estado }}</div>
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
import { mapState, mapGetters } from 'vuex';
import Snackbar from '@/components/snackbar';

export default {
	components: {
		Snackbar
	},
    data: function(){
        return {
            showMsg:false,
            frontValidation: true, // habilita validação front-end
            emailHasError: false,
            ruaHasError: false,
            bairroHasError: false,
            cidadeHasError: false,
            estadoHasError: false,
            errors: {
                email:[],
                rua:null,                
                bairro:null,
                cidade:null,
                estado:null
            },
            form: {
                email:null,
                rua:null,
                numero:null,
                complemento:null,
                bairro:null,
                cidade:null,
                estado:null
            }
        }
    },    
    computed: mapState({
        ...mapGetters('imovel', ['imovel','imoveis','action'])
    }),
    watch: {
        imovel() {
            if(this.action == 'create'){
                if(this.imovel.status){
                    this.showMessage();
                }else{
                    const hasErrors = Object.prototype.hasOwnProperty.call(this.imovel.result, 'errors');
                    if (hasErrors) {

                        const email = Object.prototype.hasOwnProperty.call(this.imovel.result.errors, 'email');
                        if(email){
                            this.emailHasError = true;
                            let errors = this.errors.bairro = this.imovel.result.errors.email;                            
                            for(let error of errors){
                                this.errors.email.push(error);
                            }
                        }

                        const rua = Object.prototype.hasOwnProperty.call(this.imovel.result.errors, 'rua');
                        if(rua){
                            this.ruaHasError = true;
                            this.errors.rua = this.imovel.result.errors.rua[0];
                        }

                        const bairro = Object.prototype.hasOwnProperty.call(this.imovel.result.errors, 'bairro');
                        if(bairro){
                            this.bairroHasError = true;
                            this.errors.bairro = this.imovel.result.errors.bairro[0];
                        }

                        const cidade = Object.prototype.hasOwnProperty.call(this.imovel.result.errors, 'cidade');
                        if(cidade){
                            this.cidadeHasError = true;
                            this.errors.cidade = this.imovel.result.errors.cidade[0];
                        }

                        const estado = Object.prototype.hasOwnProperty.call(this.imovel.result.errors, 'estado');
                        if(estado){
                            this.estadoHasError = true;
                            this.errors.estado = this.imovel.result.errors.estado[0];
                        }

                    }
                }
            }
        }
    },
    methods: {
        showMessage: function() {
            const router = this.$router;
            this.$refs.msgComponent.show({                
                msg: 'Imóvel cadastrado com sucesso!',
                bgcolor: 'success',  // parametro opcional
                callback: function(){ // parametro opcional
                    router.push('/');
                }
            })            
        },
        
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

            if(!this.form.rua){
                this.ruaHasError = true;
                this.errors.rua = 'O preenchimento do campo rua é obrigatório.';
            }

            if(!this.form.bairro){
                this.bairroHasError = true;
                this.errors.bairro = 'O preenchimento do campo bairro é obrigatório.';
            }

            if(!this.form.cidade){
                this.cidadeHasError = true;
                this.errors.cidade = 'O preenchimento do campo cidade é obrigatório.';
            }

            if(!this.form.estado){
                this.estadoHasError = true;
                this.errors.estado = 'O preenchimento do campo estado é obrigatório.';
            }

            if(this.errors.email.length > 0 || this.emailHasError || this.ruaHasError || this.bairroHasError || this.cidadeHasError || this.form.estadoHasError){
                return false;
            }

            return true;            
        },
        submit: function(e){
            
            if(this.checkForm()){                
                this.$store.dispatch('imovel/create', this.form);
            }

            e.preventDefault();
        }

    }


}
</script>