<template>
<div id="comments">
  <ul v-for="comment in comments" :key="comment.id">
      <li>[{{comment.time_of_conversation}}] {{comment.text}}</li>
</ul>
</div>
</template>

<script>
import { bus } from "../main.js";
import axios from "axios";

export default {
  data: {
    comments: []
  },
  methods: {
    addComment(params) {
      axios
        .post(`http://127.0.0.1:8000/api/conversations/10/comments/`, {
          text: params.comment,
          time_of_conversation: params.time
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getComments() {    
      axios.get(`http://127.0.0.1:8000/api/conversations/10/comments/`)
      .then(response => {
      // JSON responses are automatically parsed.
        this.comments = response.data.comments
        console.log(this.comments)
        console.log(response)
        
      })
    },
    deleteComment() {}
  },
  mounted() {
      this.getComments()
  },
  created() {
    bus.$once("addComment", this.addComment)
  }
};
</script>

<style>

</style>
