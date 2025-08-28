<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
        <q-tabs align="right" shrink>
          <q-route-tab name="tab1" label="Tab 1" />
        </q-tabs>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/dashboard" name="dashboard" label="List" />
        <q-route-tab to="/permission" name="permission" label="Permission" />
        <q-route-tab to="/role" name="role" label="Roles" />
        <q-route-tab to="/user" name="user" label="Users"/>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
//
</script>
