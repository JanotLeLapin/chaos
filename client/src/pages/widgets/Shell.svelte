<script lang="ts">
  import { sendCommand } from '../../websocket';

  export let id: string;

  let input: HTMLInputElement;

  const keydown = (key: KeyboardEvent) => {
    if (key.code !== 'Enter') return;
    sendCommand({
      name: 'cmd',
      data: { input: input.value },
      from: '-1',
      to: id,
    });
    input.value = '';
  };

</script>

<main>
  <input
    bind:this={input}
    on:keydown={keydown}
    type="text"
    name="input"
    id="in"
  />
</main>

<style>
  input {
    font-family: 'Fira Code', 'Menlo', 'Consolas';

    width: calc(100% - 8rem);
  }

</style>
