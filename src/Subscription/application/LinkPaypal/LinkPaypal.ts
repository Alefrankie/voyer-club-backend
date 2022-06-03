import { HttpService } from '@nestjs/axios'
import { Injectable, NotFoundException } from '@nestjs/common'
import axios from 'axios'
import { SubscriptionsRepository } from 'src/Subscription/domain/Subscription.repository'

const API_PAYPAL_CLIENT_ID =
  'AVmUlF0IzWEWJfCWb9QlkCY_kJpsLoZbtrug7MTSg2bUTJB8GqKV7lq3cNsmZJQp1Ep_eh38ejBS-xYN'
const API_PAYPAL_SECRET =
  'EI4oC2_RpHXYHjZmSBa8QF3Zve565ZMLe3eTRrK4uUFwgcj7WbqROhJTYhvfZi80LcGI9KebKXGWVVtM'
const API_PAYPAL_URL = 'https://api-m.sandbox.paypal.com'
//const API_PAYPAL_URL = 'https://api-m.paypal.com'
const HOST = 'http://192.168.3.79:3000'

@Injectable()
export class LinkPaypal {
  constructor(
    private subscriptionsRepository: SubscriptionsRepository,
    private httpService: HttpService
  ) {}
  async link(body) {
    try {
      const order = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: body.amount
            }
          }
        ],
        application_context: {
          brand_name: 'VoyerClub',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${HOST}/check-pay?id=${body.creator}&days=${body.days}&amount=${body.amount}`,
          cancel_url: `${HOST}/user/subscribe?id=${body.creator}`
        }
      }

      // format the body
      const params = new URLSearchParams()
      params.append('grant_type', 'client_credentials')

      // Generate an access token
      const {
        data: { access_token }
      } = await axios.post(`${API_PAYPAL_URL}/v1/oauth2/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: API_PAYPAL_CLIENT_ID,
          password: API_PAYPAL_SECRET
        }
      })

      // make a request
      const response = await axios.post(
        `${API_PAYPAL_URL}/v2/checkout/orders`,
        order,
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      )
      return await response.data.links[1].href
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async checkPay(body) {
    /* const { creator, subscriber, token, PayerID } = body */

    try {
      /* const pay = this.httpService
        .post(
          `${API_PAYPAL_URL}/v2/checkout/orders/${token}/capture`,
          {},
          {
            auth: {
              username: API_PAYPAL_CLIENT_ID,
              password: API_PAYPAL_SECRET
            }
          }
        )
        .toPromise()
        .then((res) => res.data) */

        body =  {
          amount: 10,
          creatorId: 'e09c2f33-049c-4900-8a0e-29585dd6f33d',
          subscriberId: 'f07abf13-52b2-4351-a111-e4f249a9bba0',
          rateId: '4c2aedd3-6416-4cf6-bd45-9e9b509636f1'
        }

          const subscription = await this.subscriptionsRepository.create(body)

        return {asd:'asd'}
        /* return pay */
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }
}
