<template>
    <div>
        <div class='header1' style="color:#1270bd;"><h2>Post Jobs Here</h2>
        </div>
        <div class="addedWrapper">
            <div class="form-wrapper">
                <h2>Enter Job Details:</h2><br/>
                <form v-on:submit.prevent="addJob">
                    <input v-model="aPosition" placeholder="Position"><br/><br/>
                    <input v-model="aDate" placeholder="Current Date"><br/><br/>
                    <input v-model="aOpening" placeholder="Openings"><br/><br/>
                    <input v-model="aStart" placeholder="Start Date"><br/><br/>
                    <input v-model="aShift" placeholder="Shift"><br/><br/>
                    <input v-model="aWage" placeholder="Hourly Wage"><br/><br/>
                    <textarea rows="4" cols="50"  v-model="description" placeholder="Description"></textarea><br/><br/>
                    <button type="submit">Post Job</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'post',
  data() {
    return {
        aPosition: '',
        aDate: '',
        aOpening: '',
        aStart: '',
        aShift: '',
        aWage: '',
        description: ''
    }
  },
  methods: {
    async addJob() {
      try {
        await axios.post("/api/jobs", {
            position: this.aPosition,
            posteddate: this.aDate,
            openings: this.aOpening,
            startdate: this.aStart,
            shift: this.aShift,
            wage: this.aWage,
            description: this.description
        });
        this.aPosition = "";
        this.aDate = "";
        this.aOpening = "";
        this.aStart = "";
        this.aShift = "";
        this.aWage = "";
        this.description = "";
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>


<style scoped>

.header1 {
  margin-bottom: 60px;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
}

</style>