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
			<div class="table-responsive">	
				<table class="table">
				<thead class="thead-light">
					<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
					</tr>
				</thead>
				<tbody>
					<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
					</tr>
					<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
					</tr>
					<tr>
					<th scope="row">3</th>
					<td>Larry</td>
					<td>the Bird</td>
					<td>@twitter</td>
					</tr>
				</tbody>
				</table>			
			</div>	
		</div>
	</div>
  </div>
</template>

<script>
export default {
  name: "Imoveis",
  props: {
    msg: String,
  },
};
</script>
