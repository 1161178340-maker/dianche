import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header-auth"
import { ThemeProvider } from "@/components/theme-provider"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">支付成功！</h1>
          <p className="text-lg text-muted-foreground">感谢您的订阅，您现在可以享受所有高级功能。</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>订阅详情</CardTitle>
            <CardDescription>您的订阅信息已发送至您的邮箱</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">状态</span>
              <span className="font-medium text-green-600">已激活</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">订阅计划</span>
              <span className="font-medium">专业版</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">支付方式</span>
              <span className="font-medium">ZPay</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">交易ID</span>
              <span className="font-medium font-mono">ZP123456789</span>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" onClick={() => (window.location.href = "/dashboard")}>
          转到仪表板
        </Button>
      </div>
    </div>
  )
}
