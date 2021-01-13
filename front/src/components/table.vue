<template>
    <div>
		<div class="table-responsive">		
			<table class="table">
				<thead class="thead-light">
					<tr>						
						<th  v-for="(column, index) in columns" :key="index" @click="sort(`${column.name}`, column.sort)" >
						{{column.name}}
						</th>
					</tr>
				</thead>				
				<tbody>
					<tr v-for="(item, index) in this.items" :key="index">
						<td v-for="(header, index) in fields" :key="index">
							{{item[header]}}
						</td>
					</tr>
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
		items: { type: Array },
		fields: { type: Array }
    },

	data: function(){
		return {
			list: []
		}
	},

	components: {
		// icontrash,
		// caretdown,
		Paginate
	},

	created() {

	},

	computed: mapState({}),

	methods: {
		sort(name, sort){
			name = name.toLowerCase()
			console.log(name);
			console.log(sort);
		}
	}	
}	
    
</script>

