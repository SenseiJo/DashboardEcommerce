<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div class="flex h-screen">
      <div class="w-80  h-full bg-gray-500 text-white overflow-y-auto">
        <img src="/images/logo_fastbrocode.png" class="size-24 mx-auto p-2 bg-white rounded-full my-4"
          alt="Logo FastBroCode" />


        <RouterLink class="block-url" to="/" active-class="text-gray-200 border-y">
          Clients
        </RouterLink>

        <RouterLink class="block-url" to="/employees" active-class="text-gray-200 border-y">
          Employés
        </RouterLink>

        <RouterLink class="block-url" to="/orders" active-class="text-gray-200 border-y">
          Commandes
        </RouterLink>
      </div>
      <RouterView class="size-full overflow-y-auto"></RouterView>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
