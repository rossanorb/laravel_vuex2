<template>
	<div>
		<ul class="pagination justify-content-center" v-show="showPagination">
			<li class="page-item"><a class="page-link" @click.prevent="previous()" href=""> &lt; </a></li>

            <li v-for="item in this.pages" :key="item" :class="{'page-item active':item == current_page, 'page-item':item != current_page }">
                <a class="page-link" @click.prevent="changePage(item)" href="">{{item}}</a>
            </li>

			<li class="page-item"><a class="page-link" @click.prevent="next()" href=""> &gt; </a></li>
		</ul>
	</div>    
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex';

export default {
     name: 'Paginate',
     data(){
         return {
            pages: []
         }
     },
    computed: mapState({
        ...mapGetters('paginate', ['paginate', 'current_page']),
        showPagination: function(){
            if( this.pages.length > 1) return true;

            return false;
        }
    }),
    watch: {
        paginate() {
            this.pages = [];
            for(let i=1; i <= this.paginate.last_page; i++){
                this.pages.push(i);
            }            
        }
    },
    methods: {
        ...mapActions('paginate', ['changePage']),
        previous() {
            let page = this.current_page - 1;
            if(page < 1) page = 1;
            this.changePage(page);
        },
        next() {
            let page = this.current_page + 1;
            if(page > this.paginate.last_page) page = this.paginate.last_page;
            this.changePage(page);
        }

     }
    
    
}
</script>

<style scoped>

</style>