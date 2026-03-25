import { supabase } from './supabase'

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled'
  planId: string
  userId: string
  createdAt: string
}

export interface ZPayConfig {
  merchantId: string
  merchantKey: string
  returnUrl: string
  notifyUrl: string
}

const zpayConfig: ZPayConfig = {
  merchantId: process.env.ZPAY_MERCHANT_ID || '',
  merchantKey: process.env.ZPAY_MERCHANT_KEY || '',
  returnUrl: process.env.ZPAY_RETURN_URL || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment/success`,
  notifyUrl: process.env.ZPAY_NOTIFY_URL || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/zpay/notify`,
}

export const createPayment = async (amount: number, planId: string, userId: string, description: string = '订阅支付'): Promise<{ url: string; orderId: string } | null> => {
  if (!zpayConfig.merchantId || !zpayConfig.merchantKey) {
    console.error('ZPay 配置缺失')
    return null
  }

  const orderId = `ZP${Date.now()}${Math.random().toString(36).substr(2, 9)}`
  
  const paymentData = {
    merchant_id: zpayConfig.merchantId,
    order_id: orderId,
    amount: amount,
    currency: 'CNY',
    subject: description,
    body: description,
    notify_url: zpayConfig.notifyUrl,
    return_url: zpayConfig.returnUrl,
    sign_type: 'MD5',
    sign: generateSign(orderId, amount),
  }

  const { data, error } = await supabase
    .from('payments')
    .insert([
      {
        order_id: orderId,
        amount: amount,
        currency: 'CNY',
        plan_id: planId,
        user_id: userId,
        status: 'pending',
        payment_method: 'zpay',
        extra_data: paymentData,
      },
    ])
    .select()

  if (error) {
    console.error('创建支付记录失败:', error)
    return null
  }

  const paymentUrl = `https://pay.zpay.com/pay?${new URLSearchParams(paymentData).toString()}`

  return {
    url: paymentUrl,
    orderId,
  }
}

export const verifyPayment = async (orderId: string, amount: number, sign: string): Promise<boolean> => {
  if (!zpayConfig.merchantId || !zpayConfig.merchantKey) {
    console.error('ZPay 配置缺失')
    return false
  }

  const expectedSign = generateSign(orderId, amount)
  
  if (sign !== expectedSign) {
    return false
  }

  const { data: payment, error } = await supabase
    .from('payments')
    .update({ status: 'succeeded' })
    .eq('order_id', orderId)
    .eq('amount', amount)
    .eq('status', 'pending')
    .select()
    .single()

  if (error) {
    console.error('更新支付状态失败:', error)
    return false
  }

  return payment !== null
}

export const getPaymentStatus = async (orderId: string): Promise<PaymentIntent | null> => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('order_id', orderId)
    .single()

  if (error) {
    console.error('获取支付状态失败:', error)
    return null
  }

  return data
}

const generateSign = (orderId: string, amount: number): string => {
  const params = {
    merchant_id: zpayConfig.merchantId,
    order_id: orderId,
    amount: amount.toString(),
    currency: 'CNY',
    key: zpayConfig.merchantKey,
  }

  const sortedKeys = Object.keys(params).sort()
  const signString = sortedKeys
    .map((key) => `${key}=${params[key as keyof typeof params]}`)
    .join('&')

  return require('crypto').createHash('md5').update(signString).digest('hex').toUpperCase()
}

export const createCheckoutSession = async (planId: string, userId: string): Promise<{ url: string; orderId: string } | null> => {
  const planPrices: Record<string, number> = {
    free: 0,
    professional: 20,
    enterprise: 200,
  }

  const amount = planPrices[planId] || 0

  if (amount === 0) {
    return { url: '/dashboard', orderId: 'free' }
  }

  return await createPayment(
    amount,
    planId,
    userId,
    `订阅支付 - ${planId} 计划`
  )
}
