<template>
  <div class="password-email">
    <div class="password-email-form-header">
      {{ $t('auth.passwordEmail.passwordEmail') }}
    </div>
    <div class="password-email-form-body">
      <Form ref="emailForm" :model="emailForm" :rules="emailValidate">
        <FormItem prop="email" :error="serviceError.email">
          <Input prefix="ios-mail-outline" type="text" v-model="emailForm.email" :placeholder="info.email"/>
        </FormItem>
        <FormItem>
          <Button @click="handleSubmit('emailForm')" :loading="emailForm.busy" :disabled="disabled">
            <span v-if="!emailForm.busy">{{ $t('auth.passwordEmail.sendPasswordResetLink') }}</span>
            <span v-else>{{ $t('auth.submitting') }}</span>
            <span v-show="disabled">{{count}} s</span>
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Form from '@/libs/form'

export default {
  name: 'PasswordEmail',

  metaInfo () {
    return { title: this.$t('auth.passwordEmail.passwordEmailTitle') }
  },
  data () {
    return {
      emailForm: new Form({
        email: ''
      }),
      count: 0,
      disabled: false
    }
  },
  computed: {
    info () {
      return {
        email: this.$t('auth.email')
      }
    },
    serviceError () {
      return {
        email: this.emailForm.errors.get('email')
      }
    },
    emailValidate () {
      return {
        email: [
          { required: true, message: this.$t('auth.mailCannotEmpty'), trigger: 'blur' },
          { type: 'email', message: this.$t('auth.mailIncorrectFormat'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.send()
        }
      })
    },
    countDown () {
      this.disabled = true
      this.count = 120
      this.timer = setInterval(() => {
        if (this.count > 0) {
          this.count--
        } else {
          this.disabled = false
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    async send () {
      try {
        this.emailForm.startProcessing()
        const { message } = await this.$store.dispatch('auth/passwordEmail', this.emailForm.data())
        this.emailForm.finishProcessing()

        this.$Message.success(message)
        this.countDown()
      } catch (error) {
        this.emailForm.failProcessing(error)
      }
    }
  }
}
</script>
