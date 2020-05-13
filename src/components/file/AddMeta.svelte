<script>
  export let userInputs;
  let showDialog = false;
  let name = "";
  function handleSubmit(){
      console.log('hello')
      userInputs = [...userInputs, {name, value:null}]
  }
</script>

<form action="" on:submit|preventDefault={handleSubmit}>

  <input type="text" bind:value={name} />
  <button>Add meta</button>
</form>
