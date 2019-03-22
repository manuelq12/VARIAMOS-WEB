<template>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ $t("coffee_title") }}
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <a @click="set_coffee_configuration()" class="dropdown-item">{{ $t("coffee_configuration") }}</a>
      <a @click="set_coffee_solver()" class="dropdown-item">{{ $t("coffee_solver") }}</a>
    </div>

  </li>
</template>

<script>
export default {
  data: function(){
    return {
    }
  },
  methods: {
    set_coffee_configuration(){
      // modal header
      var c_header = modalH3(this.$t("coffee_configuration_title"));
      // modal body
      var default_vals = "";
      var texts = [this.$t("coffee_configuration")];
      var inputs = ["coffee_configuration"];
      if (localStorage["coffee_configuration"]) {
        default_vals = [localStorage["coffee_configuration"]];
      }else{
        default_vals = ['"elementName":elementValue'];
      }
      var c_body = modalAreaTexts(texts,inputs,default_vals);
      // modal footer
      var c_footer = modalButton(this.$t("modal_save"),this.save_coffee_configuration);
      setupModal(c_header,c_body,c_footer);
    },
    set_coffee_solver(){
      // modal header
      var c_header = modalH3(this.$t("coffee_solver"));
      // modal body
      var default_val = "";
      var text = this.$t("coffee_solver");
      var input = "coffee_solver";
      if (localStorage["coffee_solver"]) {
        default_val = localStorage["coffee_solver"];
      }else{
        default_val = '';
      }
      var options = [
        {"name":"solver1","value":"Solver One"},
        {"name":"solver2","value":"Solver Two"},
        {"name":"solver3","value":"Solver Three"}
      ];
      var c_body = modalSelect(text,input,default_val,options);
      // modal footer
      var c_footer = modalButton(this.$t("modal_save"),this.save_coffee_solver);
      setupModal(c_header,c_body,c_footer);
    },
    save_coffee_configuration(){
      localStorage["coffee_configuration"] =  document.getElementById("coffee_configuration").value;
      document.getElementById('main_modal').style.display="none";
    },
    save_coffee_solver(){
      localStorage["coffee_solver"] =  document.getElementById("coffee_solver").value;
      document.getElementById('main_modal').style.display="none";
    }
  }
}
</script>


<style scoped>
</style>
