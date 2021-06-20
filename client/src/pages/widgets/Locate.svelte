<script lang="ts">
  import { onMount } from 'svelte';

  import { Api } from '../../api';

  import type { Socket, Location } from '../../api';

  export let socket: Socket;

  let location: Location;

  onMount(async () => {
    location = await Api.locate(socket.id);
  });

</script>

<main>
  {#if location}
    <h3>
      That right here is {socket.name}'s sweet home. Well it's not exactly where
      he lives, but near enough.
    </h3>
    <iframe
      class="map"
      title="Map"
      src={'https://www.google.com/maps/embed/v1/place?q=' +
        location.latitude +
        ',' +
        location.longitude +
        '&key=AIzaSyAlxOKNkrwVVR8HcyE9vAqB_aYJ6SSoRJ4'}
      frameborder="0"
    />
  {/if}
</main>

<style>
  .map {
    border-radius: 0.5rem;

    width: 100vh;
    height: 100vh;
  }

</style>
