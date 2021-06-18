<script lang="ts">
  import { Link } from 'svelte-navigator';

  export let title: string;
  export let description: string;
  export let icon: string;

</script>

<main>
  <div class="title">
    <img src={icon} alt={title} />
    <h3>{title}</h3>
  </div>
  <p>{description}</p>
  <Link to={title.toLowerCase()}>
    <button>Start</button>
  </Link>
</main>

<style>
  main {
    background-color: var(--dark-2);

    border-radius: 0.5rem;

    text-align: justify;

    max-width: 240px;

    padding: 1rem;
  }

  .title {
    display: flex;
    align-items: center;

    color: var(--light-2);
  }

  img {
    max-width: 6rem;
    margin: 0 2rem 0 1rem;
  }

  button {
    width: 100%;
  }

</style>
