<template>
  <div>
    <h3>List of Comments:</h3>
    <br/><br/><br/>
    <div v-for="comment in allcom" v-bind:key="comment._id" class="com">
      <p><strong>Email: </strong>{{comment.jobEmail}}</p>
      <p><strong>Comment: </strong>{{comment.text}}</p>
      <!--<p><i><strong>Date: </strong>{{comment.whenDate}}</i></p>-->
      <p><strong>Time Posted: </strong>{{formatDate(comment.created)}}</p>
      <p>--<i>{{comment.user.firstName}} {{comment.user.lastName}}</i></p>
      <button v-if="loggedin" @click.prevent="deleteComment(comment, job)">Delete</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'comment',
  data() {
    return {
      job: {
        user: {firstName: '', lastName: ''},
        create: ''
      },
      user: {firstName: '', lastName: ''},
      allcom: [],
    }
  },
  created () {
    this.getComments();
  },
  computed: {
    loggedin() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async getComments() {
      try {
        //let response = await axios.get("/api/comments/" + this.$route.params.id);
        //this.comments = response.data;
        this.allcom = [];
        let getcomments = await axios.get("/api/comments/" + this.$route.params.id);
        this.allcom = getcomments.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(comment, job) {
      try {
        await axios.delete('/api/comments/' + this.$route.params.id + '/' + comment._id);
        this.getComments(job);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>

<style scoped>
.com {
  text-align: left;
  margin-left: 300px;
  margin-bottom: 30px;
}
</style>