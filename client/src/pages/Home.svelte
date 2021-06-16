<script lang="ts">
  import { Link } from 'svelte-navigator';

</script>

<main>
  <div class="title">
    <h1>Chaos</h1>
    <h3>If you're reading this, you're a psychopath.</h3>
  </div>
  <div class="buttons">
    <Link to="/targets"><button>Connected Targets</button></Link>
  </div>
  <p>With this tool, you can spy on people. That's basically it.</p>
  <p>Have fun you sick bastard.</p>
</main>

<style>
  main {
    text-align: center;
  }

  .title {
    color: var(--light-2);

    margin: 12rem 0;
  }

  .buttons > button {
    padding: 0.5rem 4rem;
  }

  h1 {
    font-size: 86px;
    font-weight: bolder;
  }

  h3 {
    font-size: 26px;
    font-weight: normal;
  }

</style>
