"use client"

import type React from "react"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Shield, Headphones } from "lucide-react"
import { createCheckoutSession } from "@/lib/zpay"

interface PricingPlan {
  id: string
  name: string
  price: number
  period: "monthly" | "annually"
  description: string
  features: string[]
  recommended?: boolean
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly")
  const [loading, setLoading] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const router = useRouter()

  const plans: PricingPlan[] = [
    {
      id: "free",
      name: "免费版",
      price: 0,
      period: "monthly",
      description: "适合个人用户和初学者",
      features: ["5 个项目", "基础文档工具", "社区支持", "标准模板", "基本分析"],
    },
    {
      id: "professional",
      name: "专业版",
      price: billingPeriod === "monthly" ? 20 : 16,
      period: billingPeriod,
      description: "适合成长中的团队和企业",
      features: ["无限项目", "高级文档工具", "优先支持", "自定义模板", "高级分析", "团队协作", "API 访问", "自定义集成"],
      recommended: true,
    },
    {
      id: "enterprise",
      name: "企业版",
      price: billingPeriod === "monthly" ? 200 : 160,
      period: billingPeriod,
      description: "适合大型组织和企业",
      features: ["专业版所有功能", "专属客户经理", "24/7 电话支持", "自定义入职", "高级安全功能", "SSO 集成", "自定义合同", "白标选项"],
    },
  ]

  const handleSubscribe = async (planId: string) => {
    setLoading(planId)
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        router.push("/login")
        return
      }

      const result = await createCheckoutSession(planId, user.id)
      
      if (!result) {
        console.error("创建支付会话失败")
        return
      }

      if (result.url) {
        window.location.href = result.url
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      console.error("订阅失败:", err)
    } finally {
      setLoading(null)
    }
  }

  const handlePayment = async (planId: string) => {
    setSelectedPlan(planId)
    setShowPaymentModal(true)
  }

  const closePaymentModal = () => {
    setShowPaymentModal(false)
    setSelectedPlan(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            价格方案
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">选择适合您的计划</h1>
          <p className="text-lg text-muted-foreground">
            从免费计划开始，随着您的需求增长而升级。所有计划都包含 14 天免费试用。
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm ${billingPeriod === "monthly" ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
              月付
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annually" : "monthly")}
              className="relative w-14 h-7 rounded-full bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-primary rounded-full transition-transform duration-200 ${
                  billingPeriod === "annually" ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm ${billingPeriod === "annually" ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
              年付 <span className="text-primary text-xs ml-1">(节省 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col ${
                plan.recommended
                  ? "border-primary shadow-2xl scale-105 z-10"
                  : "border-border hover:border-border/80"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground shadow-lg">
                    最受欢迎
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 pb-6">
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">¥{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period === "monthly" ? "月" : "年"}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {plan.period === "annually" ? "每年支付" : "每月支付"}
                  </p>
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.recommended ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                >
                  {loading === plan.id ? "处理中..." : plan.price === 0 ? "免费开始" : "立即订阅"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">无风险试用</h3>
            <p className="text-sm text-muted-foreground">
              所有付费计划都包含 14 天免费试用。试用期内随时可以取消。
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">安全支付</h3>
            <p className="text-sm text-muted-foreground">
              我们使用 ZPay 支付，确保您的财务信息安全无忧。
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">24/7 支持</h3>
            <p className="text-sm text-muted-foreground">
              我们的团队随时为您服务，解答任何问题并提供帮助。
            </p>
          </Card>
        </div>

        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">选择支付方式</h3>
                <button
                  onClick={closePaymentModal}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div 
                  className="p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                  onClick={() => {
                    if (selectedPlan) {
                      closePaymentModal()
                      handleSubscribe(selectedPlan)
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">ZPay 支付</h4>
                      <p className="text-sm text-muted-foreground">支持微信、支付宝、银联</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                  onClick={() => {
                    closePaymentModal()
                    window.location.href = 'https://pay.zpay.com'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">个人收款码</h4>
                      <p className="text-sm text-muted-foreground">微信、支付宝扫码支付</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
