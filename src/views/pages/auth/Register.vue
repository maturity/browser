<template>
  <div class="register">
    <div class="register-form-header">
      {{ $t('auth.register.register') }}
    </div>
    <div class="register-form-body">
      <Form ref="registerForm" :model="registerForm" :rules="registerValidate">
        <FormItem :label="info.name" prop="name" :error="serviceError.name">
          <Input v-model="registerForm.name"/>
        </FormItem>
        <FormItem :label="info.email" prop="email" :error="serviceError.email">
          <Input v-model="registerForm.email"/>
        </FormItem>
        <FormItem :label="info.password" prop="password" :error="serviceError.password">
          <Input type="password" v-model="registerForm.password"/>
        </FormItem>
        <FormItem :label="info.confirm" prop="password_confirmation" :error="serviceError.confirm">
          <Input type="password" v-model="registerForm.password_confirmation"/>
        </FormItem>
        <FormItem>
          <Button :loading="registerForm.busy" @click="handleSubmit('registerForm')">
            <span v-if="!registerForm.busy">{{ $t('auth.register.register') }}</span>
            <span v-else>{{ $t('auth.register.submitting') }}</span>
          </Button>
          <Button @click="handleReset('registerForm')">{{ $t('auth.register.reset') }}
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import Form from '@/libs/form'

export default {
  name: 'Register',

  metaInfo () {
    return { title: this.$t('auth.register.registerTitle') }
  },

  data () {
    return {
      registerForm: new Form({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      })
    }
  },
  computed: {
    info () {
      return {
        name: this.$t('auth.name'),
        email: this.$t('auth.email'),
        password: this.$t('auth.password'),
        confirm: this.$t('auth.passwordConfirm')
      }
    },
    serviceError () {
      return {
        name: this.registerForm.errors.get('name'),
        email: this.registerForm.errors.get('email'),
        password: this.registerForm.errors.get('password'),
        confirm: this.registerForm.errors.get('password_confirmation')
      }
    },
    registerValidate () {
      return {
        name: [
          { required: true, message: this.$t('auth.nameCannotEmpty'), trigger: 'blur' }
        ],
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
              if (value !== this.registerForm.password) {
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
          this.register()
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    async register () {
      try {
        this.registerForm.startProcessing()

        await this.$store.dispatch('auth/register', this.registerForm.data())

        this.registerForm.finishProcessing()

        this.$router.push({ name: 'home' })
      } catch (error) {
        this.registerForm.failProcessing(error)
      }
    }
  }
}
</script>
