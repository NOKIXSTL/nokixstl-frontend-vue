<template>
  <div id="app">
 <div class="container-fluid">

<b-tabs pills card vertical>
  <b-tab title="Mapa"  style="width: 80vw; height: 100vh">
   <GmapMap  :center="{lat:-4.970140, lng:-39.018348}" :zoom="17" map-type-id="terrain" style="width: 100%; height: 100%">  </GmapMap>
  </b-tab>
 
  <b-tab title="Semaforos" active style="width: 80vw; height: 100vh">

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="tokenForm" label="Token:" label-for="token" description="Token do semaforo">
        <b-form-input id="token" type="text" v-model="form._id" required placeholder="token"></b-form-input>
      </b-form-group>

      <b-form-group id="nomeForm" label="Nome:" label-for="nome" description="Nome do semaforo">
        <b-form-input id="nome" type="text" v-model="form.nome" required placeholder="nome"></b-form-input>
      </b-form-group>

      <b-form-group id="tipoForm" label="Tipo:" label-for="tipo" description="Tipo do semaforo">
        <b-form-input id="tipo" type="text" v-model="form.tipo" required placeholder="Veicular ou Pedestre"></b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-around">
        <b-button type="submit" variant="primary">Cadastrar</b-button>
        <b-button type="reset" variant="danger">Limpar</b-button>
      </div>
    </b-form>
    
    <b-table striped hover :items="semaforos" :fields="fields" class="mt-5" v-if="showTable"></b-table>
    <b-card class="text-center mt-5" v-if="!showTable">
      Nenhum semaforo encontrado ou erro na comunicação com API.
    </b-card>
  </b-tab>
</b-tabs>
 </div>
  </div>
</template>

<script>
import Semaforos from '../services/semaforos'

export default {
  name: 'Home',
  data () {
    return {
      form: {
        _id: '',
        "nome": '',
        "tipo": '',
        "tempo": 0,
        "sinal": "VERMELHO"
      },
      show: true,
      showTable: true,
      semaforos: [],
        fields: [
        {
          key: '_id',
          label: 'Token',
          sortable: true
        },
        {
          key: 'nome',
          sortable: true
        },
        {
          key: 'sinal',
          sortable: false
        },
        {
          key: 'tempo',
          sortable: false,
        }],
    }
  },
   methods: {
    onSubmit (evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.form));
      Semaforos.salvar(this.form);
//      this.form._id = '';     
//      this.form.nome = '';     
//      this.form.tipo = '';     
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },
    onReset (evt) {
      evt.preventDefault();
      this.form._id = ''; 
      this.form.nome = '';     
      this.form.tipo = '';     
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }

    

  },
  mounted() {
    setInterval(() => {
        Semaforos.listar().then(respota => {
          this.semaforos = respota.data.docs;
        })
      },10);
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
