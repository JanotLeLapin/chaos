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
    display: grid;

    background-color: var(--dark-2);

    border-radius: 0.5rem;

    text-align: justify;

    max-width: 240px;

    padding: 1rem;
    margin: 2rem;

    transition: 0.15s ease-in-out;
  }
  main:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    transform: translateY(-10px);
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
    align-self: end;

    width: 100%;
  }

</style>
