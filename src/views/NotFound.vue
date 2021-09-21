<template>
 <div> 
   <h3>Page not found.</h3>
    <input type="button" value="Back" @click="this.$router.push('/')" />
 </div>
</template>
<script>
export default {
  name: "NotFound",
};
</script>