<script lang="ts">
  import { useParams } from 'svelte-navigator';
  import { Api } from '../api';
  import type { Socket } from '../api';
  import { onMount } from 'svelte';
  import { secondsToString } from '../util';

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

<main>
  {#if socket}
    <h1>Currently viewing {socket.name}. Have fun</h1>
    <h3>Up for {secondsToString(time)}</h3>
  {/if}
</main>
