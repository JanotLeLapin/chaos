<script lang="ts">
  export let name: string;
  export let ip: string;
  export let id: string;

  export const redirect = () => {
    window.location.href = '/' + id;
  };

</script>

<main on:click={redirect}>
  <h3 class="name">{name}</h3>
  <h4 class="ip">{ip}</h4>
</main>

<style>
  main {
    text-align: center;
    padding: 1rem;
    max-width: 240px;
  }

</style>
