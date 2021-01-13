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
				@show=closeDialog				
				:callback=this.callback
				:title="'Deseja excluir o imóvel ?'"				
			/>
			<Table 
				:columns="this.columns" 
				:items="this.imoveis.result" 
				:headers="this.headers"
				:data="this.table"
			/>
		</div>		
	</div>	
	<Snackbar ref='msgComponent' />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
// import iconTrash from '@/components/icons/trash';
// import caretdown from '@/components/icons/caretdown';
import Dialog from '@/components/dialog';
// import Paginate from '@/components/paginate';
import Snackbar from '@/components/snackbar';
import Table from '@/components/table';

export default {
	name: "Imoveis",	
	components: {
		// iconTrash,
		// caretdown,
		// Paginate,
		Dialog,
		Table,
		Snackbar		
	},
    props: {
		msg: String,
	},
	data: function(){
		return {

			columns: [
				{
					name: 'Cidade',
					sort: true
				},
				{
					name: 'Bairro',
					sort: false
				},
				{
					name: 'E-mail',
					sort: false
				}				
			],
			headers: ['cidade','bairro', 'email'],
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
		...mapGetters('paginate', ['current_page']),
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
        sort(sort) {
            let order = '';
			this.order = !this.order;
            if (this.order) {
                order = 'asc';
            } else {
                order = 'desc';
            }

			switch (sort) {
            case 'email': this.$refs.sorter_email.change(order); break;
			}

            this.queryString = `order=${sort}&by=${order}`;
			this.list(this.queryString);
		},
        showMessage: function(msg, bg) {            
            this.$refs.msgComponent.show({
                msg: msg,
                bgcolor: bg,  // parametro opcional                
            })            
        },		

		remove(){
			this.$store.dispatch('imovel/remove', this.id);
			this.list();			
		},
		confirmDelete(imovel){
			this.isVisibleDialog = true;
			this.id = imovel.id;
			this.callback = this.remove;
		},
		closeDialog(arg){
			this.isVisibleDialog = arg;
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
		},
		current_page: function(newVal, oldVal){
			if(newVal != oldVal){
				this.list(this.queryString);
			}
		}		
	}		
};
</script>

<style scoped>
    .btn-delete{
        cursor: pointer;
        color: red;
    }
	span .sort{
		margin-left: 10px;
	}

	th:nth-child(1) {
		width: 30%;
	}
	th:nth-child(2) {
		width: 40%;
	}
	th:nth-child(3) {
		width: 15%;
	}
	th:nth-child(4) {
		width: 5%;
	}	
</style>
