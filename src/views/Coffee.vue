<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="1">
          <h1 class="h2">{{ $t("app_menu_coffee") }}</h1>
        </b-col>
        <b-col>
          <img style="float:right;height:50px;" src="@/assets/images/coffee.png">
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
                      <br>
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

              <br>
              <b-button v-on:click="test_micro">Compile code</b-button>
              <br>
              <br>
            </b-container>

            <b-container class="bv-example-row">
              <div>
                <b-row>
                  <b-col cols="8">
                    <h6 class="m-0 font-weight-bold">HLVL Console</h6>

                    <b-form-textarea
                      id="textarea-hlvl-console"
                      v-model="input_hlvl_console"
                      rows="4"
                      max-rows="14"
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
    <br>
    <p style="text-align:left;">
      Powered by
      <strong>Coffee Framework</strong>
    </p>

    <!--<div>
      <label class="text-reader">
        Read File
        <input type="file" @change="loadTextFromFile">
      </label>
      <textarea rows="10" id="sara" v-model="text"></textarea>
      <br>
    </div>-->
  </div>
</template>

<script>
var content;
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
    loadTextFromFile(event) {
      var input = event.target;

      var reader = new FileReader();
      reader.onload = function() {
        var text = reader.result;
        content = text;
        /*document.getElementById("sara").value = text;*/
      };
      reader.readAsText(input.files[0]);
    },

    test_micro() {
      alert(content);
      if (localStorage["domain_implementation_main_path"]) {
        this.errors = [];
        axios
          .post(
            localStorage["domain_implementation_main_path"] + "NewMicro/test",
            {
              data: content
            }
          )
          .then(response => {
            var c_header = modalH3("Test response");
            /*var c_body = modalSimpleText(response.data);*/
            var hlvl_editor = document.getElementById("textarea-hlvl-editor");
            hlvl_editor.value = response.data;
            setupModal(c_header, c_body);
          })
          .catch(e => {
            this.errors.push(e);
            var c_header = modalH3(this.$t("modal_error"), "error");
            var c_body = modalSimpleText(
              e + this.$t("model_actions_backend_problem")
            );
            setupModal(c_header, c_body);
          });
      } else {
        var c_header = modalH3(this.$t("modal_error"), "error");
        var c_body = modalSimpleText(this.$t("verification_path_problem"));
        setupModal(c_header, c_body);
      }
    },
    clearFiles() {
      this.$refs["file"].reset();
    },
    submit() {
      /*alert(content);*/
      var firstLine = content.split("\n")[0];
      var a = firstLine + "";
      if (a.includes("xml")) {
        alert("ES XML");
      } else {
        try {
          JSON.parse(content);
          content = JSON.parse(content);
          alert("Es JSON");
        } catch (e) {
          alert("No es JSON");
        }
      }
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
