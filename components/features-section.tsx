"use client"

import { Car, Zap, Brain, MessageSquare, BarChart3, Shield, Battery, Gauge, Target, Lightbulb } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI智能推荐",
      description: "基于深度学习算法，分析您的需求和偏好，精准匹配最适合的车型。"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "自然语言对话",
      description: "像和朋友聊天一样，用自然语言描述您的需求，AI即刻理解并给出建议。"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "多维度对比",
      description: "续航、价格、空间、性能等多维度数据可视化对比，一目了然。"
    },
    {
      icon: <Battery className="w-6 h-6" />,
      title: "续航分析",
      description: "基于您的日常通勤距离，智能分析续航需求，告别里程焦虑。"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "预算优化",
      description: "根据您的预算范围，推荐最具性价比的车型配置组合。"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "政策解读",
      description: "实时追踪各地新能源补贴政策，帮您最大化购车优惠。"
    }
  ]

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">核心功能</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            智能、精准、高效
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            我们的AI助手具备强大的功能，帮助您在新能源汽车的海洋中找到最适合的那一款
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/50 transition-all card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              AI驱动的智能对话系统
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              我们的AI助手经过海量新能源汽车数据训练，能够理解您的各种需求表达方式。无论是"我想要一辆家用SUV"还是"预算30万，主要市区通勤"，AI都能准确理解并给出专业建议。
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "支持自然语言输入，无需专业术语",
                "实时更新的车型数据库",
                "基于用户画像的个性化推荐",
                "多轮对话逐步精确需求"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex items-center justify-center">
              <div className="w-full max-w-sm bg-card rounded-xl p-4 border border-border/50 shadow-2xl">
                <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">智驾助手</span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="bg-secondary/50 rounded-lg p-3 text-sm text-foreground/80">
                    您好！我是智驾助手，请告诉我您的购车需求？
                  </div>
                  <div className="bg-primary/20 rounded-lg p-3 text-sm text-foreground/80 ml-8">
                    预算25万左右，家用为主，偶尔跑长途
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-sm text-foreground/80">
                    根据您的需求，我推荐以下车型：比亚迪汉EV、小鹏P7...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
