<script lang="ts">
  import { onMount } from 'svelte';

  import { sendCommand, subscribe } from '../../websocket';

  export let id: string;

  let output: string = '';
  let input: HTMLInputElement;

  const keydown = (key: KeyboardEvent) => {
    if (key.code !== 'Enter') return;
    const inp = input.value;
    if (!inp) return;
    input.value = '';
    if (inp === 'clear') return (output = '');
    output += '> ' + inp + '\n';
    sendCommand({
      name: 'cmd',
      data: { input: inp },
      from: '-1',
      to: id,
    });
  };

  onMount(() => {
    subscribe((command) => {
      if (command.name !== 'cmd' || command.from !== id) return;
      const out = command.data?.out || '';
      output += out ? out + '\n' : '';
    });
  });

</script>

<main>
  <textarea
    bind:value={output}
    readonly={true}
    name="output"
    id="out"
    cols="30"
    rows="10"
  />
  <input
    bind:this={input}
    on:keydown={keydown}
    type="text"
    name="input"
    id="in"
  />
</main>

<style>
  textarea,
  input {
    font-family: 'Fira Code', 'Menlo', 'Consolas';
  }

  textarea {
    resize: none;

    width: calc(100% - 4rem);
  }

  input {
    width: calc(100% - 8rem);
  }

</style>
