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
  <h3 class="description">
    The shell gives you a lot of control over the target, as long as you know
    what you're doing.
  </h3>
  <p class="hint">
    You can also clear the output log with the command <code>clear</code>.
  </p>
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
