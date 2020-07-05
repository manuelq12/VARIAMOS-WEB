
<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="1">
          <h1 class="h2">{{ $t("app_menu_coffee") }}</h1>
        </b-col>
        <b-col>
          <img style="float:right;height:50px;" src="@/assets/images/coffee.png" />
        </b-col>
      </b-row>
    </b-container>

    <div id="menu_coffee">
      <b-tabs content-class="mt-3">
        <b-tab title="HLVL" active>
          <div class="div-text-area">
            <b-container>
              <div>
                <b-row>
                  <b-col cols="8">
                    <h6 class="m-0 font-weight-bold">HLVL Editor</h6>

                    <b-form-textarea
                      id="textarea-hlvl-editor"
                      v-model="input_hlvl_editor"
                      rows="10"
                      max-rows="10"
                      placeholder="HLVL Editor"
                    ></b-form-textarea>
                  </b-col>

                  <b-col cols="4">
                    <div>
                      <br />
                      <!-- Start Browse -->
                      <b-form-file
                        input="file"
                        id="file"
                        class="mb-2"
                        accept=".hlvl, .sfxm, .xml, .tvl, .txt, .json"
                        placeholder="Choose a model..."
                        @change="loadTextFromFile"
                      ></b-form-file>
                      <!-- End Browse -->

                      <!-- Start Sumbit -->
                      <b-button v-on:click="submit" class="mr-2">
                        <i class="fas fa-upload fa-sm text-white-50"></i>
                        Submit
                      </b-button>
                      <!-- End Sumbit -->

                      <!-- Start Cancel 
                      <b-button class="btn btn-danger" @click="file = null">Cancel</b-button>
                      End Cancel-->
                    </div>
                    <h6 id="model-title" class="m-0 font-weight-bold">Model Configuration</h6>

                    <b-form-textarea
                      id="textarea-configuration"
                      v-model="configuration"
                      rows="5"
                      max-rows="5"
                    ></b-form-textarea>
                  </b-col>
                </b-row>
              </div>

              <br />
              <b-row class="justify-content-start">
                <b-col>
                  <b-button v-on:click="compile">Compile code</b-button>
                </b-col>
              </b-row>

              <br />
              <br />
            </b-container>

            <b-container class="bv-example-row">
              <div>
                <b-row>
                  <b-col cols="8">
                    <h6 class="m-0 font-weight-bold">HLVL Console</h6>

                    <b-form-textarea
                      id="textarea-hlvl-console"
                      v-model="input_hlvl_console"
                      rows="10"
                      max-rows="10"
                    ></b-form-textarea>
                  </b-col>

                  <b-col cols="4">
                    <div>
                      <div class="card shadow mb-4">
                        <!-- Start Statistic's Header -->
                        <div
                          class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
                        >
                          <h6 class="m-0 font-weight-bold">Statistics</h6>
                        </div>
                        <!-- End Statistics Header -->

                        <!-- Start Statistic's Body -->
                        <div class="card-body">
                          <table class="table table-hover">
                            <tbody>
                              <tr>
                                <td style="width: 70%">Satisfactory model:</td>
                                <td style="width: 30%" id="satisfactory_model"></td>
                              </tr>
                              <tr>
                                <td>Number of products that can be generated:</td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>Number of elements:</td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>Number of relationships (by type):</td>
                                <td></td>
                              </tr>

                              <tr>
                                <td>Overall time of analysis:</td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!-- End Statistic's Body -->
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-container>
          </div>
        </b-tab>

        <b-tab title="HLCL">
          <div class="div-text-area">
            <div>
              <h6 class="m-0 font-weight-bold">HLCL</h6>
            </div>

            <div>
              <b-form-textarea id="textarea-hlcl" v-model="input_hlcl" rows="10"></b-form-textarea>
            </div>
          </div>
        </b-tab>

        <b-tab title="Solving">
          <div class="div-text-area">
            <div>
              <h6 class="m-0 font-weight-bold">Solving</h6>
            </div>

            <div>
              <b-form-textarea id="textarea-solving" v-model="input_solving" rows="10"></b-form-textarea>
            </div>
          </div>
        </b-tab>

        <b-tab title="Solution">
          <div class="div-text-area">
            <div>
              <h6 class="m-0 font-weight-bold">Solution</h6>
            </div>

            <div>
              <b-form-textarea id="textarea-solution" v-model="input_solution" rows="10"></b-form-textarea>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <br />
    <p style="text-align:left;">
      Powered by
      <strong>Coffee Framework</strong>
    </p>
  </div>
</template>

<script>
var content;
var path;
var response_mnz;
var response_jsn;

import axios from "axios";
import { setupModal, modalH3, modalSimpleText } from "../assets/js/common/util";
export default {
  name: "coffee",
  data() {
    return {
      input_hlvl_editor: "",
      errors: [],
      file: null
    };
  },
  methods: {
    /** Connection with HLVL Parser microservices */
    async compile() {
      var hlvl_editor = document.getElementById("textarea-hlvl-editor");
      var content = hlvl_editor.value;
      var path = "coffeeHLVLP/hlvlParserFile";
      var response_hlvl = "";
      this.errors = [];

      try {
        const response = await axios.post("http://localhost:7071/" + path, {
          data: content
        });
        console.log(response.data)
        response_mnz = response.data.mzn;
        response_jsn = response.data.json;  
        var hlcl = document.getElementById("textarea-hlcl");
        hlcl.value = response_jsn;
        var solving = document.getElementById("textarea-solving");
        solving.value = response_mnz;
      } catch (e) {
        this.errors.push(e);
        var c_header = modalH3(this.$t("modal_error"), "error");
        var c_body = modalSimpleText(
          e + this.$t("model_actions_backend_problem")
        );
        setupModal(c_header, c_body);
      }

      /** Connection with Reasoning microservices */
      path = "reasoning/oneConfiguration";
      try {
      
        const response = await axios.post("http://localhost:9091/" + path, {
          mzn: response_mnz,
          json: response_jsn
        });
        var a = JSON.stringify(response.data);
        var hlvl_editor = document.getElementById("textarea-solution");
        hlvl_editor.value = a;
      } catch (e) {
        this.errors.push(e);
        var c_header = modalH3(this.$t("modal_error"), "error");
        var c_body = modalSimpleText(
          e + this.$t("model_actions_backend_problem")
        );
        setupModal(c_header, c_body);
      }
    },

    loadTextFromFile(event) {
      var input = event.target;

      var reader = new FileReader();
      reader.onload = function() {
        var text = reader.result;
        content = text;
      };
      try {
        reader.readAsText(input.files[0]);
      } catch (e) {
        alert(e);
      }
    },

    /** Connection with Model Parser microservices */
    submit() {
      var firstLine = content.split("\n")[0] + "";
      var secondLine = content.split("\n")[1] + "";

      if (firstLine.includes("mxGraphModel")) {
        path = "varXML2Hlvl";
      } else if (secondLine.includes("featureModel")) {
        path = "feature2Hlvl";
      } else if (
        firstLine.includes("feature_model") &&
        secondLine.includes("meta")
        || secondLine.includes("feature_model")
      ) {
        path = "splot2Hlvl/";
      }
      this.errors = [];
      axios
      /*  .post("http://i2thub.icesi.edu.co/coffeMP/" + path, {*/
      .post("http://localhost:9090/coffeMP/" + path,{
          data: content
        })
        .then(response => {
          var hlvl_editor = document.getElementById("textarea-hlvl-editor");
          hlvl_editor.value = response.data;
        })
        .catch(e => {
          this.errors.push(e);
          var c_header = modalH3(this.$t("modal_error"), "error");
          var c_body = modalSimpleText(
            e + this.$t("model_actions_backend_problem")
          );
          setupModal(c_header, c_body);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.font-weight-bold {
  padding: 5px;
}

#model-title {
  padding-top: 17px;
}

.card-body {
  padding-top: 0px;
  padding: 0.25rem;
  margin-top: -5px;
}
</style>
