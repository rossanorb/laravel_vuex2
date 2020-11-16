<template>
  <div class="container-fluid">	
    <div class="py-5 text-center">
      <h2>Imóveis</h2>
    </div>
	<div class="row">
		<div class="col-sm-12">			
			<router-link to="/imoveis/cadastro" class="btn btn-success mb-3">Cadastrar</router-link>
			<button @click="confirmDelete(2)" class="btn btn-danger mb-3 ml-3">Excluir</button>
			<button @click="confirmHello()" class="btn btn-primary mb-3 ml-3">Hello</button>
		</div>
		<div class="col-sm-12">
			{{isVisibleDialog}}
			<Dialog 
				v-if="isVisibleDialog" 
				@show=closeDialog
				:callback=this.callback
					
			/>
			<div class="table-responsive">	
				<table class="table">
				<thead class="thead-light">
					<tr>
					<th @click="sort('email')" scope="col">E-mail<span><caretdown class="sort" /></span></th>
					<th scope="col">Endereço</th>
					<th scope="col">Status</th>
					<th scope="col">Ações</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(imovel, index) in this.response.result" :key="imovel.key">
					<td>{{ imovel.email }}</td>
					<td>{{ imovel.rua }}, {{ imovel.bairro }}, {{ imovel.cidade }}, {{ imovel.estado }}</td>
					<td>{{ contrato[index] }}</td>
					<td>
						<span class="btn-delete" v-on:click="remove(imovel.id)"> <iconTrash  /> </span>
					</td>
					</tr>
				</tbody>
				</table>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import iconTrash from '@/components/icons/trash';
import caretdown from '@/components/icons/caretdown';
import Dialog from '@/components/dialog';

export default {
	name: "Imoveis",
	components: {
		iconTrash,
		caretdown,
		Dialog
	},
    props: {
		msg: String,
	},
	data: function(){
		return {
			isVisibleDialog: false,
			callback: Function,
			id: null
		}
	},
    created() {		
		this.list();
	},
    computed: mapState({
        ...mapGetters('imovel', ['response','action']),
        contrato: function(){
            return this.response.result.map(item =>{
				if(item.contrato){
					return 'Contratado';
				}
				
				return 'Não contratado';
			})
        }
	}),
	methods: {
		...mapActions('imovel', ['remove','list']),
        sort(sort) {
            let order = '';
            this.order = !this.order;
            if (this.order) {
                order = 'asc';
            } else {
                order = 'desc';
            }
            const queryString = `?order=${sort}&by=${order}&limit`;
            this.$store.dispatch('imovel/filter', queryString);
		},

		hello(){
			alert('hello');
		},
		excluir(){
			alert(`Excluir id ${this.id}`);
			this.id = 0;
		},

		confirmDelete(id){
			this.isVisibleDialog = true;
			this.id = id;
			this.callback = this.excluir;
		},
		confirmHello(){
			this.isVisibleDialog = true;
			this.callback = this.hello;
		},

		closeDialog(arg){
			this.isVisibleDialog = arg;
		}
	

	},
    watch: {
		response() {
			if(this.action == 'delete'){
				if(this.response.status){
					alert('Imóvel removido com sucesso!');
					this.list();
				}else{
					alert('Ocorreu um erro!');
				}
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


</style>
