<template>
  <card class="card" title="Edit Profile">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-5">
            <fg-input
              type="text"
              label="Company"
              :disabled="true"
              placeholder="Paper dashboard"
              v-model="user.company"
            ></fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input
              type="text"
              label="First Name"
              placeholder="First Name"
              v-model="user.firstName"
            ></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text" label="Last Name" placeholder="Last Name" v-model="user.lastName"></fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input type="text" label="Address" placeholder="Home Address" v-model="user.address"></fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text" label="City" placeholder="City" v-model="user.city"></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text" label="Country" placeholder="Country" v-model="user.country"></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              type="number"
              label="Postal Code"
              placeholder="ZIP Code"
              v-model="user.postalCode"
            ></fg-input>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info" round @click.native.prevent="updateProfile">Update Profile</p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        company: "Paper Dashboard",
        username: "Hamilton Silva",
        email: "",
        firstName: "Chet",
        lastName: "Faker",
        address: "Melbourne, Australia",
        city: "Melbourne",
        postalCode: "",
        aboutMe: `We must accept finite disappointment, but hold on to infinite hope.`
      },
      response: ""
    };
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    },

    getUser: function() {
      this.$http
        .get("/user/5d62bd0a5b8b3a79488cbb14/")
        .then(response => {
          this.response = response;
        })
        .catch(error => {
          console.log("deu ruim");
          this.response = "Error: " + error.response;
        });
    }
  }
};
</script>
<style>
</style>
