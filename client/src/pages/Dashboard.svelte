<script lang="ts">
  import { useParams } from 'svelte-navigator';
  import { Api } from '../api';
  import type { Socket } from '../api';

  const params = useParams();
  let socket: Socket;
  Api.target($params.id)
    .then((data) => (socket = data))
    .catch((err) => console.error(err));

</script>

<main>
  {#if socket}
    <h1>Currently viewing {socket.name}. Have fun</h1>
    <h3>
      Up since {socket.up.getHours() < 10
        ? '0'
        : ''}{socket.up.getHours()}:{socket.up.getMinutes() < 10
        ? '0'
        : ''}{socket.up.getMinutes()}
    </h3>
  {/if}
</main>
