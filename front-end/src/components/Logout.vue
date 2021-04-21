<template>
<div class="main">
  <div class="menu">
    <p><a @click="toggleUpload"></a></p>
    <h2><strong>Logged in as: </strong><i>{{user.firstName}} {{user.lastName}}</i>  <button @click="logout">Logout</button></h2>
  </div>
  <div>
    <Add/>
  </div>
  <p v-if="error">{{error}}</p>
</div>
</template>


<script>
import axios from 'axios';
import Add from '../views/Addjob.vue';
export default {
  name: 'Logout',
  components: {
    Add
  },
  data() {
    return {
      show: false,
      error: '',
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getPhotos();
    },
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
}

.menu h2 {
  font-size: 14px;
}

.button{
  padding:5px;
  font-size: 13px;
  transition-duration: 0.4s;
  width: 100px;
}

.button:hover {
  background-color: #227eb4;
  color: white;
}
</style>