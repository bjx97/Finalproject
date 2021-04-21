<template>
    <div>
        <div class='header1' style="color:#1270bd;"><h2>Edit Job Posts Here</h2></div>
        <br/>
        <h4><i>Details will be updated after clicking "Update Post"</i></h4>
        <hr/>
        <br/>
        <div class="addedWrapper">
            <div class="form-wrapper">
                <form v-on:submit.prevent="editJob()">
                    <input v-model="ePosition" placeholder="Position"><br/><br/>
                    <input v-model="eDate" placeholder="Posted Date"><br/><br/>
                    <input v-model="eOpening" placeholder="Openings"><br/><br/>
                    <input v-model="eStart" placeholder="Start Date"><br/><br/>
                    <input v-model="eShift" placeholder="Shift"><br/><br/>
                    <input v-model="eWage" placeholder="Hourly Wage"><br/><br/>
                    <textarea rows="4" cols="50"  v-model="eDescription" placeholder="Description"></textarea><br/><br/>
                    <button type="submit">Update Post</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'edit',
  data() {
    return {
        updatejob: null,
        ePosition: "",
        eDate: "",
        eOpening: "",
        eStart: "",
        eShift: "",
        eWage: "",
        eDescription: ""
    }
  },
  methods: {
    async getJobs() {
      try {
        let response = await axios.get("/api/jobs/" + this.$route.params.id);
        this.updatejob = response.data;
        this.ePosition = this.updatejob.position;
        this.eDate = this.updatejob.posteddate;
        this.eOpening = this.updatejob.openings;
        this.eStart = this.updatejob.startdate;
        this.eShift = this.updatejob.shift;
        this.eWage = this.updatejob.wage;
        this.eDescription = this.updatejob.description;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editJob() {
      try {
        await axios.put("/api/jobs/" + this.$route.params.id, {
          position: this.ePosition,
          posteddate: this.eDate,
          openings:  this.eOpening,
          startdate: this.eStart,
          shift: this.eShift,
          wage:  this.eWage,
          description: this.eDescription
        });
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created () {
    this.getJobs();
  }
}
</script>