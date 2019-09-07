import Mock from 'mockjs'

var Random = Mock.Random

export const customer = {
  // 'uuid': 'c41af15c35c8454bbc44e673d3b78d1d',
  'uuid': Random.string('0123456789abcdf', 32),
  'name': Random.name(),
  'email': Random.email(),
  'email_verified_at': Random.now(),
  'created_at': Random.now(),
  'updated_at': Random.now()
}
export const customerLogin = {
  'accessToken': Random.string('upper', 64),
  'tokenType': 'Bearer',
  'expiresIn': 691200,
  'customer': customer
}
export const customerFetch = {
  'customer': customer
}
