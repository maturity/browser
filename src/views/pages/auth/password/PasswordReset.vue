<template>
  <div class="password-reset">
    <div class="password-reset-form-header">
      {{ $t('auth.passwordReset.passwordReset') }}
    </div>
    <div class="password-reset-form-body">
      <Form ref="resetForm" :model="resetForm" :rules="resetValidate">
        <FormItem :label="info.email" prop="email" :error="serviceError.email">
          <Input v-model="resetForm.email" :disabled="true"/>
        </FormItem>
        <FormItem :label="info.password" prop="password" :error="serviceError.password">
          <Input type="password" v-model="resetForm.password"/>
        </FormItem>
        <FormItem :label="info.confirm" prop="password_confirmation" :error="serviceError.confirm">
          <Input type="password" v-model="resetForm.password_confirmation"/>
        </FormItem>
        <FormItem>
          <Button :loading="resetForm.busy" @click="handleSubmit('resetForm')">
            <span v-if="!resetForm.busy">{{ $t('auth.submit') }}</span>
            <span v-else>{{ $t('auth.submitting') }}</span>
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Form from '@/libs/form'

export default {
  name: 'PasswordReset',

  metaInfo () {
    return { title: this.$t('auth.passwordReset.passwordResetTitle') }
  },
  data () {
    return {
      resetForm: new Form({
        token: '',
        email: '',
        password: '',
        password_confirmation: ''
      })
    }
  },
  created () {
    this.resetForm.email = this.$route.query.email
    this.resetForm.token = this.$route.params.token
  },
  computed: {
    info () {
      return {
        email: this.$t('auth.email'),
        password: this.$t('auth.password'),
        confirm: this.$t('auth.passwordConfirm')
      }
    },
    serviceError () {
      return {
        email: this.resetForm.errors.get('email'),
        password: this.resetForm.errors.get('password'),
        confirm: this.resetForm.errors.get('password_confirmation')
      }
    },
    resetValidate () {
      return {
        email: [
          { required: true, message: this.$t('auth.mailCannotEmpty'), trigger: 'blur' },
          { type: 'email', message: this.$t('auth.mailIncorrectFormat'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('auth.passwordCannotEmpty'), trigger: 'blur' },
          {
            type: 'string',
            min: 8,
            message: this.$t('auth.passwordLengthShort'),
            trigger: 'blur'
          }
        ],
        password_confirmation: [
          { required: true, message: this.$t('auth.passwordCannotEmpty'), trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.resetForm.password) {
                callback(new Error(this.$t('auth.passwordNotMatch')))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.reset()
        }
      })
    },
    async reset () {
      try {
        this.resetForm.startProcessing()
        const { message } = await this.$store.dispatch('auth/passwordReset', this.resetForm.data())
        this.resetForm.finishProcessing()

        this.$Message.success(message)
        this.$router.push({ name: 'login' })
      } catch (error) {
        this.resetForm.failProcessing(error)
      }
    }
  }
}
</script>
