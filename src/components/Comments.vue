<template>
<div id="comments">
  <ul v-for="comment in comments" :key="comment.id">
      <li>[{{comment.time_of_conversation}}] {{comment.text}}<button v-on:click="deleteComment(comment)">X</button></li>
</ul>
</div>
</template>

<script>
import { bus } from "../main.js";
import axios from "axios";

export default {
  data() {
    return {
        comments: []
    }
  },
  created() {
    this.getComments()
    bus.$once("addComment", this.addComment)
  },
  methods: {
    addComment(params) {
      axios
        .post(`http://127.0.0.1:8000/api/conversations/10/comments/`, {
          text: params.comment,
          time_of_conversation: params.time
        })
        .then(response => {
          this.comments.unshift(response.data)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getComments() {    
      axios.get(`http://127.0.0.1:8000/api/conversations/10/comments/`)
      .then(response => {
        this.comments = response.data
        console.log(this.comments)
        console.log(response)
        
      })
    },
    deleteComment(comment) {
      axios.delete(`http://127.0.0.1:8000/api/conversations/10/comments/`+comment.id+`/`,
        {data: comment}
      )
      .then(response => {
        const index = this.comments.indexOf(comment);
        this.comments.splice(index, 1);
      })
    }
  },
  
};
</script>

<style>

</style>
