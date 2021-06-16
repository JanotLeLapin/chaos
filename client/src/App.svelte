<script lang="ts">
  import { Link, Route, Router } from 'svelte-navigator';
  import Dashboard from './pages/Dashboard.svelte';
  import Home from './pages/Home.svelte';
  import Targets from './pages/Targets.svelte';

  import { openConnection } from './websocket';

  openConnection();

</script>

<Router>
  <main>
    <Route path="/" component={Home} />
    <Route path="targets" component={Targets} />
    <Route path="targets/:id" component={Dashboard} />
  </main>
</Router>

<style>
  :root {
    --dark-0: #1a1a1a;
    --dark-1: #262626;
    --dark-2: #333333;
    --light-0: #b3b3b3;
    --light-1: #cccccc;
    --light-2: #e6e6e6;
    --main-0: #f20d0d;
    --main-1: #f42525;
    --main-2: #f53d3d;
  }

  :global(body) {
    color: var(--light-1);
    background-color: var(--dark-1);

    padding: 0;
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
    padding: 0;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

</style>
