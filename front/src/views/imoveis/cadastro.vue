<template>
    <div class="container">
        <div class="py-5 text-center">            
            <h2>Cadastro de Imóvel</h2>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form @submit="submit" >
                    <div class="form-group">
                        <label for="email">Email do Proprietário</label>
                        <input type="text"
                         v-bind:class="{ 'form-control is-invalid': emailHasError, 'form-control': !emailHasError }"
                         id="email" maxlength="30" placeholder="" v-model="form.email">
                        <div class="invalid-feedback" v-for="error in errors.email" :key="error">{{ error }}</div>
                    </div>

                    <div class="form-group">
                        <label for="rua">Rua</label>
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
                        <label for="bairro">Bairro</label>
                        <input type="text" v-bind:class="{ 'form-control is-invalid': bairroHasError, 'form-control': !bairroHasError }"
                        id="bairro" maxlength="50" placeholder="" v-model="form.bairro">
                        <div class="invalid-feedback">{{ errors.bairro }}</div>
                    </div>

                    <div class="form-group">
                        <label for="cidade">Cidade</label>
                        <input type="text" v-bind:class="{ 'form-control is-invalid': cidadeHasError, 'form-control': !cidadeHasError }"
                        id="cidade" maxlength="50" placeholder="" v-model="form.cidade">
                        <div class="invalid-feedback">{{ errors.cidade }}</div>
                    </div>

                    <div class="form-group">
                        <label for="estado">Estado</label>
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

            console.log(this.errors.email.length);
            console.log(this.emailHasError);
            console.log(this.ruaHasError);
            console.log(this.bairroHasError);
            console.log(this.cidadeHasError);
            console.log(this.estadoHasError);

            if(this.errors.email.length > 0 || this.emailHasError || this.ruaHasError || this.bairroHasError || this.cidadeHasError || this.form.estadoHasError){
                return false;
            }

            return true;            
        },
        submit: function(e){
            
            if(this.checkForm()){
                console.log('Envia Form');
            }

            e.preventDefault();
        }

    }


}
</script>