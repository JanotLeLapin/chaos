<script lang="ts">
  import { Link } from 'svelte-navigator';

  export let name: string;
  export let ip: string;
  export let id: string;

</script>

<main>
  <h2 class="name">{name}</h2>
  <h3 class="ip">{ip}</h3>
  <Link to={'/targets/' + id}><button>Select</button></Link>
</main>

<style>
  main {
    background-color: var(--dark-2);
    border-radius: 0.5rem;

    text-align: center;

    max-width: 240px;

    padding: 1rem;

    transition: 0.15s ease-in-out;
  }
  main:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    transform: translateY(-10px);
  }

  .name {
    color: var(--light-2);
  }

  .ip {
    color: var(--light-0);
  }

  button {
    padding: 0.5rem 2rem;
  }

</style>
