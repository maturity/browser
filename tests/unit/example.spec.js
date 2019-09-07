// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'
//
// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

describe('测试套件-样例', () => {
  it('测试用例-样例', () => {
    expect(true).toEqual(true)
  })

  it('一加一等于二', () => {
    expect(1 + 1).toBe(2)
  })
})
