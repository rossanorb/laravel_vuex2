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
			<div class="table-responsive">	
				<table class="table">
					<thead class="thead-light">
						<tr>
							<th  @click="sort('email')">E-mail<span><caretdown ref="sorter_email" class="sort" /></span></th>
							<th >Endereço</th>
							<th >Status</th>
							<th >Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(imovel, index) in this.imoveis.result" :key="imovel.key">
						<td>{{ imovel.email }}</td>
						<td>{{ imovel.rua }}, {{ imovel.bairro }}, {{ imovel.cidade }}, {{ imovel.estado }}</td>
						<td>{{ contrato[index] }}</td>
						<td>
							<span class="btn-delete" v-on:click="confirmDelete(imovel)"> <iconTrash  /> </span>
						</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>		
	</div>
	<Paginate  />
	<Snackbar ref='msgComponent' />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import iconTrash from '@/components/icons/trash';
import caretdown from '@/components/icons/caretdown';
import Dialog from '@/components/dialog';
import Paginate from '@/components/paginate';
import Snackbar from '@/components/snackbar';

export default {
	name: "Imoveis",
	components: {
		iconTrash,
		caretdown,
		Paginate,
		Dialog,
		Snackbar		
	},
    props: {
		msg: String,
	},
	data: function(){
		return {			
			order: false,			
			isVisibleDialog: false,
			callback: Function,
			id: null,
			queryString: ''
		}
	},

    created() {		
		this.$store.state.imovel.imoveis = {}
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
