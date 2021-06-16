<script lang="ts">
  import { Link, Route, Router } from 'svelte-navigator';
  import Targets from './pages/Targets.svelte';

</script>

<Router>
  <nav>
    <Link to="targets">Targets</Link>
  </nav>
  <main>
    <h1>Svelte rules</h1>
    <Route path="targets" component={Targets} />
  </main>
</Router>

<style>
  :root {
    --dark-0: #1a1a1a;
    --dark-1: #262626;
    --dark-2: #333333;
    --light-0: #cccccc;
    --light-1: #d9d9d9;
    --light-2: #e6e6e6;
    --main-0: #f20d0d;
    --main-1: #f42525;
    --main-2: #f53d3d;
  }

  :global(body) {
    color: var(--light-1);
    background-color: var(--dark-1);
  }

  :global(button) {
    cursor: pointer;

    color: var(--light-0);
    background-color: var(--main-1);

    border: none;
    border-radius: 0.2rem;

    transition: 0.15s ease-in-out;
  }
  :global(button:hover) {
    background-color: var(--main-2);
  }

  main {
    text-align: center;
    max-width: 240px;

    margin: 0 auto;
    padding: 1em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

</style>
