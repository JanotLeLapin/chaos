<script lang="ts">
  import { Api } from '../api';
  import type { Socket } from '../api';
  import Target from '../Target.svelte';

  let targets: Socket[] = [];

  Api.targets()
    .then((data) => (targets = data))
    .catch((err) => console.error(err));

</script>

<main>
  {#each targets as target}
    <Target name={target.name} id={target.id} ip={target.ip} slot={target.id} />
  {/each}
</main>
