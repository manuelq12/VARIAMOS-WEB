<template>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ $t("coffee_title") }}
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <a @click="set_coffee_configuration()" class="dropdown-item">{{ $t("coffee_configuration") }}</a>
      <a @click="coffee_execute()" class="dropdown-item">{{ $t("coffee_execution") }}</a>
    </div>

  </li>
</template>

<script>
import axios from "axios";

export default {
  data: function(){
    return {
      model_data:"",
      errors:[] //errors
    }
  },
  props: {
   current_graph: {
    type: Object,
    required: true
   }
  },
  methods: {
    set_coffee_configuration(){
      // modal header
      let c_header = modalH3(this.$t("coffee_configuration_title"))

      let solvers = require('@/locales/solver.json'); //it works
      //var options = require('../../locales/solver.json'); //it works to
      let selectOptions = []
      for(const solverOption in solvers){
        let solverName = solvers[solverOption]
        let option = {"value":solverOption,"innerHTML":solverName}
        selectOptions.push(option)
      }

      // modal body
      var setupForm = {
        "coffee_solver":{
          "text":this.$t("coffee_solver"),
          "tag":"select",
          "attributes":{
            "required":true
          },
          "childrenTag":"option",
          "childrenMark":"selected",
          "children":selectOptions
        },
        "coffee_number_of_solutions":{
          "tag":"input",
          "text":this.$t("coffee_number_of_solutions"),
          "attributes":{
            "type":"number",
            "min":1,
            "required":true
          }
        },
        "coffee_parameters":{
          "tag":"textarea",
          "text":this.$t("coffee_parameters"),
          "attributes":{
            "cols":"50",
            "rows":"5",
            "required":true
          }
        }
      }

      var c_body = modalForm(setupForm)
      // modal footer
      var c_footer = modalButton(this.$t("modal_save"),this.save_coffee_configuration)
      setupModal(c_header,c_body,c_footer)
    },
    save_coffee_configuration(){
      localStorage["coffee_number_of_solutions"] = document.getElementById("coffee_number_of_solutions").value;
      localStorage["coffee_solver"]              = document.getElementById("coffee_solver").value;
      localStorage["coffee_parameters"]          =  document.getElementById("coffee_parameters").value;
      document.getElementById('main_modal').style.display="none";
    },
    coffee_execute(){

      if (localStorage["coffee_number_of_solutions"]
       && localStorage["coffee_solver"]
       && localStorage["coffee_parameters"]) {
        this.errors=[];
        var encoder = new mxCodec();
        var result = encoder.encode(this.current_graph.getModel());
        var xml = encodeURIComponent(mxUtils.getXml(result));
        axios.post(localStorage["domain_implementation_main_path"]+'/coffee'
        /*
        +"modelType=VARXML&resourceType=TEXT&resourceContent="+xml
        +"&responseType=JSON"+
        +"&solverParameters="+localStorage["coffee_parameters"]
        +"&solverType="+localStorage["coffee_solver"]
        +"&problemType=BOOL"
        +"&numberOfSolutions="+localStorage["coffee_number_of_solutions"]
        */
        , {
          resourceContent: xml,
          modelType:"VARXML",
          resourceType:"TEXT",
          responseType:"JSON",
          solverParameters:localStorage["coffee_parameters"],
          solverType:localStorage["coffee_solver"],
          problemType:"BOOL",
          numberOfSolutions:localStorage["coffee_number_of_solutions"]
        }, {
        headers: {
           'Content-Type': 'application/json;charset=UTF-8',
           'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => {
          var c_header = modalH3("Test response");
          var c_body = modalSimpleText(response.data);
          setupModal(c_header,c_body);
        })
        .catch(e => {
          this.errors.push(e); 
          var c_header = modalH3(this.$t("modal_error"),"error");
          var c_body = modalSimpleText(e + this.$t("model_actions_backend_problem"));
          setupModal(c_header,c_body);
        });
      }else{
        var c_header = modalH3(this.$t("modal_error"),"error");
        var c_body = modalSimpleText(this.$t("verification_path_problem"));
        setupModal(c_header,c_body);
      }
    }
  }
}

</script>


<style scoped>
</style>
