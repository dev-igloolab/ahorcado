<script lang="ts">
  export let text = "Button";
  export let onClick = () => {};
</script>

<button class="bg-white hover:bg-gray-100 text-black font-semibold py-3 px-10 text-3xl max-w-max rounded-full" on:click={onClick}>
  {text}
</button>