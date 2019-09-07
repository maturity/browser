<template>
  <div class="f-layout-default">
    <Layout>
      <Content class="f-layout-default-content">
        <router-view/>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
