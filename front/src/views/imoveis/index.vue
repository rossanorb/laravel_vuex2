<template>
  <div class="container-fluid">	
    <div class="py-5 text-center">
      <h2>Imóveis</h2>
    </div>
	<div class="row">
		<div class="col-sm-12">			
			<router-link to="/imoveis/cadastro" class="btn btn-success mb-3">Cadastrar</router-link>
		</div>
		<div class="col-sm-12">			
			<Dialog 
				v-if="isVisibleDialog" 
				@show="showDialog"
				:callback="this.callback"
				:title="'Deseja excluir o imóvel ?'"				
			/>
			<Table 
				:data="this.table" 
				:items="this.imoveis.result"				
				@list="list"
				@confirmDelete="confirmDelete"								
			/>
		</div>		
	</div>	
	<Snackbar ref='msgComponent' />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Dialog from '@/components/dialog';
import Snackbar from '@/components/snackbar';
import Table from '@/components/table';

export default {
	name: "Imoveis",	
	components: {
		Dialog,
		Table,
		Snackbar		
	},
    props: {
		msg: String,
	},
	data: function(){
		return {
			table: {
				columns: [
					{
						name: 'E-mail',
						mapping: 'email',
						sort: true
					},
					{
						name: 'Cidade',
						mapping: 'cidade',
						sort: false
					},
					{
						name: 'Bairro',
						mapping: 'bairro',
						sort: false
					}
				]				
			},
			order: false,
			isVisibleDialog: false,
			callback: Function,
			id: null,
			queryString: ''
		}
	},

    created() {		
		this.$store.state.imovel.imoveis = {};		
		this.list();
	},

    computed: mapState({
		...mapGetters('imovel', ['imoveis','action', 'imovel']),
        contrato: function(){
            return this.imoveis.result.map(item =>{
				if(item.contrato){
					return 'Contratado';
				}
				
				return 'Não contratado';
			})
		}
	}),
	methods: {
		...mapActions('imovel', ['list']),
        showMessage: function(msg, bg) {            
            this.$refs.msgComponent.show({
                msg: msg,
                bgcolor: bg  // parametro opcional                
            })            
        },		

		remove(){
			this.$store.dispatch('imovel/remove', this.id);
		},

		confirmDelete(imovel){			
			this.showDialog(true);
			this.id = imovel.id;
			this.callback = this.remove;
		},
		
		showDialog(state){
			this.isVisibleDialog = state;
		}
	

	},
    watch: {
		imovel() {
			if(this.action == 'delete'){
				if(this.imovel.status){
					this.showMessage('Imóvel removido com sucesso!', 'success');					
					this.list();
				}else{
					this.showMessage('Ocorreu um erro!', 'danger');					
				}
			}
		}		
	}		
};
</script>

<style scoped>
</style>
