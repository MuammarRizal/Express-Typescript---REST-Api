import supertest from 'supertest'
import web from '../middleware/web'
import prisma from '../utils/client'
import { generateRefreshToken } from '../utils/jwt'

const getRefreshToken = (): string => {
  const usr = {
    user_id: '7a759d31-9371-427e-af18-ea73ee61a326',
    email: 'alfinarahmalia@gmail.com',
    nama: 'Alfina Rahmalia',
    password: 'xxxxxxxx',
    role: 'regular',
    created_at: Date.now(),
    updated_at: Date.now()
  }
  return generateRefreshToken(usr)
}

describe('user', () => {
  it('User login data valid', async () => {
    const response = await supertest(web).post('/api/auth/login').send({
      email: 'alfinarahmalia@gmail.com',
      password: 'alfinarahmalia'
    })

    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Login Sukses')
  })

  it('User login email tidak valid', async () => {
    const response = await supertest(web).post('/api/auth/login').send({
      email: 'alfinarahmaliaxxx@gmail.com',
      password: 'alfinarahmalia'
    })

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: 'Login gagal',
      error: 'User not found'
    })
  })

  it('User login password tidak valid', async () => {
    const response = await supertest(web).post('/api/auth/login').send({
      email: 'alfinarahmalia@gmail.com',
      password: 'alfinarahmalia123'
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: 'Login Gagal',
      error: 'Password salah'
    })
  })
  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        email: 'muammarrizalwakwaw@gmail.com'
      }
    })
  })

  it('Register user data valid', async () => {
    const response = await supertest(web).post('/api/auth/register').send({
      email: 'muammarrizalwakwaw@gmail.com',
      nama: 'Rizalwakwaw',
      password: 'wakwaw',
      confirmPassword: 'wakwaw'
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toEqual('Create User Successfully')
  })

  it('Refresh token valid', async () => {
    const response = await supertest(web)
      .get('/api/auth/refresh')
      .set('Authorization', `Bearer ${getRefreshToken()}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Login sukses')
  })
  it('Refresh token tidak valid', async () => {
    const response = await supertest(web)
      .get('/api/auth/refresh')
      .set('Authorization', `Bearer 123123123}`)
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('Verifikasi token gagal')
  })
})
