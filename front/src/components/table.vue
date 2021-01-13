<template>
    <div>
		<div class="table-responsive">
			<table class="table">
				<thead class="thead-light">
					<tr>						
						<th  v-for="(column, index) in this.columns" :key="index" @click="sort(`${column.name}`, column.sort)" >
						{{column.name}}
						</th>						
					</tr>
				</thead>				
				<tbody>
					<tr v-for="(tr, index) in this.list" :key="index" v-html="tr"></tr>
				</tbody>
			</table>
			<Paginate />
		</div>    
    </div>
</template>

<script>
import { mapState } from 'vuex';
// import icontrash from '@/components/icons/trash';
// import caretdown from '@/components/icons/caretdown';
import Paginate from '@/components/paginate';

export default {
	name: 'Table',

    props: {        
        columns: { type: Array},
		items: { type: Array }
    },

	data: function(){
		return {
			list: [],
			body: `<td> cidade </td><td> bairro</td>`
		}
	},

	components: {
		// icontrash,
		// caretdown,
		Paginate
	},

	computed: mapState({}),

	watch: {
		items(){
			this.doList();
		}
	},

	methods: {
		doList: function(){
			let columns = [];
			
			for(let col of this.columns){
				columns.push(col.name.toLowerCase());
			}			
		
			if(this.items){
				for(let item of this.items){
					let keys = Object.keys(item);
					let body = this.body;	
					
					for(let k of keys) {
						if(columns.includes(k)){
							let pattern = `${k}`;
							body = body.replace(pattern, item[k]);							
						}						
					}

					this.list.push(body);
				}
			}
		},
		sort(name, sort){
			name = name.toLowerCase()
			console.log(name);
			console.log(sort);
		}
	}	
}	
    
</script>

