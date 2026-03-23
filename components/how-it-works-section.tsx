"use client"

import { MessageSquare, Search, BarChart3, Car, ArrowRight } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: <MessageSquare className="w-8 h-8" />,
      title: "描述需求",
      description: "用自然语言告诉AI您的购车需求，包括预算、用途、偏好等。无需专业术语，像聊天一样轻松。"
    },
    {
      number: "02",
      icon: <Search className="w-8 h-8" />,
      title: "AI智能分析",
      description: "AI助手会根据您的需求，在100+车型中进行智能匹配，综合考虑续航、价格、空间等多维度因素。"
    },
    {
      number: "03",
      icon: <BarChart3 className="w-8 h-8" />,
      title: "对比推荐",
      description: "获得个性化的车型推荐列表，包含详细的对比分析、优缺点说明和购买建议。"
    },
    {
      number: "04",
      icon: <Car className="w-8 h-8" />,
      title: "做出选择",
      description: "基于全面的信息，自信地做出购车决策。我们还提供试驾预约和优惠信息服务。"
    }
  ]

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <ArrowRight className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">使用流程</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            四步找到理想座驾
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            简单四步，从迷茫到自信，让选车变得轻松愉快
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0"></div>
              )}
              
              <div className="relative z-10 p-6 bg-card rounded-2xl border border-border/50 h-full card-hover">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-base font-semibold hover:bg-primary/90 transition-all glow-effect inline-flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            立即开始对话
          </button>
          <p className="mt-4 text-sm text-muted-foreground">免费使用，无需注册</p>
        </div>
      </div>
    </section>
  )
}
