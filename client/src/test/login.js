function login () {
    this.alert.show = false
    const credentials = { email: this.email, password: this.password }
    userServices.login(credentials)
    .then((response) => {
      this.alert.message = 'You are connected successfully'
      this.alert.type = "success"
      this.alert.show = true
      this.$store.dispatch('setToken', response.data.token)
      this.$store.dispatch('setUser', response.data.user)
    }).catch((error) => {
      this.alert.message = error.response.data.message
      this.alert.type = "error"
      this.alert.show = true
    })
  }