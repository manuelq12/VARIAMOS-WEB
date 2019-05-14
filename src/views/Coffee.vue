<template>
  <div>
    <b-container class="bv-example-row">
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
            <b-container class="bv-example-row">
              <div>
                <b-row>
                  <b-col cols="8">
                    <label>HLVL Editor</label>
                  </b-col>

                  <b-col cols="4">
                    <label><strong>Model Configuration</strong></label>
                  </b-col>
                </b-row>
              </div>
              <b-row>
                <b-col cols="8">
                  <b-form-textarea id="textarea" v-model="input" rows="4" max-rows="10"></b-form-textarea>
                </b-col>

                <b-col cols="4">
                  <b-form-textarea
                    id="textarea-configuracion"
                    v-model="configuration"
                    rows="4"
                    max-rows="10"
                  ></b-form-textarea>
                </b-col>
              </b-row>

              <br>
              <b-button v-on:click="compile">Compile code</b-button>
              <br>
              <br>
            </b-container>

            <b-container class="bv-example-row">
              <div>
                <b-row>
                  <b-col cols="8">
                    <label>HLVL Console</label>
                  </b-col>

                  <b-col cols="4">
                    <label><strong>Statistics</strong></label>
                  </b-col>
                </b-row>
              </div>
              <b-row>
                <b-col cols="8">
                  <b-form-textarea id="textarea" v-model="response" rows="4" max-rows="10"></b-form-textarea>
                </b-col>
                <b-col cols="4">
                  <table class="table table-hover">
                    <tbody>
                      <tr>
                        <td style="width: 70%">Satisfactory model:</td>
                        <td style="width: 30%">YES</td>
                      </tr>
                      <tr>
                        <td>Number of products that can be generated:</td>
                        <td>100</td>
                      </tr>
                      <tr>
                        <td>Number of elements:</td>
                        <td>100</td>
                      </tr>
                      <tr>
                        <td>Number of relationships (by type):</td>
                        <td>100</td>
                      </tr>

                      <tr>
                        <td>Overall time of analysis:</td>
                        <td>30 sec</td>
                      </tr>
                    </tbody>
                  </table>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </b-tab>

        <b-tab title="HLCL">
          <div class="div-text-area">
            <div>
              <label>HLCL</label>
            </div>

            <div>
              <b-form-textarea id="textarea" v-model="input" rows="10"></b-form-textarea>
            </div>
          </div>
        </b-tab>

        <b-tab title="Solving">
          <div class="div-text-area">
            <div>
              <label>Solving</label>
            </div>

            <div>
              <b-form-textarea id="textarea" v-model="input" rows="10"></b-form-textarea>
            </div>
          </div>
        </b-tab>

        <b-tab title="Solution">
          <div class="div-text-area">
            <div>
              <label>Solution</label>
            </div>

            <div>
              <b-form-textarea id="textarea" v-model="input" rows="10"></b-form-textarea>
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
  </div>
</template>

<script>
export default {
  name: "coffee",
  data() {
    return {
      input: "",
      response: [],
      errors: []
    };
  },
  methods: {
    compile: function() {
      alert("Compile");
      AXIOS.get(`http://localhost:8888/variamosbackend/coffee`, {
        params: {
          input: this.input
        }
      }) // base URL is in http-commons.js
        .then(response => {
          // JSON responses are automatically parsed.
          this.response = response.data["content"];
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
