<template>
  <div class="f-layout-index">
    <Layout>
      <Header class="f-layout-index-top">Top</Header>
      <Header class="f-layout-index-header">Header</Header>
      <Content class="f-layout-index-content">
        <router-view/>
      </Content>
      <Footer class="f-layout-index-footer">Footer</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'IndexLayout'
}
</script>
