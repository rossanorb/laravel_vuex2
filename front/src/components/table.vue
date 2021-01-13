<template>
    <div>
		<div class="table-responsive">			
			<table class="table">
				<thead class="thead-light">
					<tr>						
						<th  v-for="(column, index) in data.columns" :key="index" @click="sort(`${column.mapping}`, column.sort)" >
						{{column.name}}
						<span :id="`${column.mapping}`"><caretdown :ref="`${column.mapping}`" class="sort" /></span>
						</th>
						<th >Ações</th>
					</tr>
				</thead>				
				<tbody>
					<tr v-for="(item, index) in this.items" :key="index">
						<td v-for="(header, index) in data.columns" :key="index">
							{{item[header.mapping]}}
						</td>
						<td>
							<span class="btn-delete" v-on:click="confirmDelete(item)"> <iconTrash  /> </span>
						</td>
					</tr>
				</tbody>
			</table>
			<Paginate />
		</div>    
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import iconTrash from '@/components/icons/trash';
import caretdown from '@/components/icons/caretdown';
import Paginate from '@/components/paginate';

export default {
	name: 'Table',

    props: {
		items: { type: Array },
		data: { type: Object }		
    },

	data: function(){
		return {}
	},

	components: {
		iconTrash,
		caretdown,
		Paginate
	},

    computed: mapState({
		...mapGetters('paginate', ['current_page']) 
	}),	

	methods: {
		sort(name, sort){
			name = name.toLowerCase()

			if(sort){
				let order = '';
				this.order = !this.order;
				if (this.order) {
					order = 'asc';
				} else {
					order = 'desc';
				}

				this.$refs.[name][0].change(order);
				this.$parent.queryString = `order=${name}&by=${order}`;
				this.$emit("list", this.$parent.queryString);			
				
			}
		},

		confirmDelete(item){
			this.$emit("confirmDelete", item);
		}
		
	},

    watch: {
		current_page: function(newVal, oldVal){
			if(newVal != oldVal){
				this.$emit("list", this.$parent.queryString);
			}
		}		
	}		
}	
    
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
