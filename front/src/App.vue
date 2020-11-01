<template>
    <div id="wrapper">
        <header>
            <ul class="nav justify-content-center">                
                <li class="nav-item">                    
                    <router-link class="nav-link" to="/">Imóveis</router-link>
                </li>
                <li class="nav-item">                    
                    <router-link class="nav-link" to="/contratos/novo">Contratos</router-link>
                </li>
            </ul>
        </header>
        <main role="main">
            <div class="container">
                <router-view />
            </div>
            <footer class="container">                
                <p>© 2017-2020 Company, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
            </footer>            
        </main>
    </div>
</template>

<style lang="css">
  #wrapper header ul {
      background-color: #343a40;
  }
  #wrapper header ul a {
      color: white;
  }
</style>