<script lang="ts">
  type Props = {
    variant?: "primary" | "secondary";
  };

  export let variant: Props["variant"] = "primary";
</script>

<button
  on:click
  class={`font-semibold py-3 px-10 text-3xl max-w-max rounded-full focus:outline-none ${
    variant === "primary"
      ? "bg-white hover:bg-gray-100 text-black "
      : "bg-black hover:bg-gray-800 text-white"
  }`}
>
  <slot />
</button>
