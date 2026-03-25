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
      </div>
    </div>
  )
}
