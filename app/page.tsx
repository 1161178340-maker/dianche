"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Car, Zap, Brain, MessageSquare, BarChart3, Shield, Battery, Gauge, ChevronRight, Sparkles } from "lucide-react"
import FeaturesSection from "@/components/features-section"
import AboutSection from "@/components/about-section"
import HowItWorksSection from "@/components/how-it-works-section"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import CTASection from "@/components/cta-section"
import FooterSection from "@/components/footer-section"

// Badge Component
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-4 py-2 bg-secondary/50 backdrop-blur-sm rounded-full flex items-center gap-2 border border-border/50">
      <div className="w-4 h-4 text-primary">{icon}</div>
      <span className="text-sm font-medium text-foreground/90">{text}</span>
    </div>
  )
}

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const mountedRef = useRef(true)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (!mountedRef.current) return

      setProgress((prev) => {
        if (prev >= 100) {
          if (mountedRef.current) {
            setActiveFeature((current) => (current + 1) % 3)
          }
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => {
      clearInterval(progressInterval)
      mountedRef.current = false
    }
  }, [])

  const handleFeatureClick = (index: number) => {
    if (!mountedRef.current) return
    setActiveFeature(index)
    setProgress(0)
  }

  const features = [
    {
      title: "智能问答推荐",
      description: "通过自然对话了解您的需求，AI为您精准匹配最适合的新能源车型。",
      image: "/ai-chat-interface.jpg"
    },
    {
      title: "多维度对比分析",
      description: "续航、价格、充电速度、空间等多维度智能对比，让选择更清晰。",
      image: "/ev-comparison.jpg"
    },
    {
      title: "实时市场洞察",
      description: "掌握最新优惠政策、补贴信息和市场动态，助您把握购车最佳时机。",
      image: "/ev-hero-car.jpg"
    }
  ]

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-semibold text-foreground">智驾未来</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">功能特点</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">关于我们</a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">使用流程</a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">用户评价</a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">常见问题</a>
            </div>

            <button className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              开始体验
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge icon={<Sparkles className="w-4 h-4" />} text="AI 驱动的智能选车助手" />
            
            <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              发现最适合你的
              <br />
              <span className="gradient-text">新能源汽车</span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              通过AI智能对话，深度分析您的出行需求、预算和偏好，为您精准推荐最合适的新能源车型，让选车不再困难。
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full text-base font-semibold hover:bg-primary/90 transition-all glow-effect flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                立即开始对话
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground rounded-full text-base font-semibold hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
                了解更多
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "100+", label: "覆盖车型" },
                { value: "50万+", label: "用户咨询" },
                { value: "98%", label: "推荐满意度" },
                { value: "24/7", label: "在线服务" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-20 relative">
            <div className="aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border/50 glow-effect">
              <img
                src={features[activeFeature].image}
                alt="智能选车界面"
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>

            {/* Feature Tabs */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => handleFeatureClick(index)}
                  className={`p-5 rounded-xl text-left transition-all relative overflow-hidden ${
                    activeFeature === index
                      ? "bg-card border border-primary/50"
                      : "bg-card/50 border border-border/50 hover:border-border"
                  }`}
                >
                  {activeFeature === index && (
                    <div className="absolute top-0 left-0 h-1 bg-primary/30 w-full">
                      <div
                        className="h-full bg-primary transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="py-16 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-8">覆盖主流新能源汽车品牌</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {["比亚迪", "特斯拉", "蔚来", "小鹏", "理想", "问界", "极氪", "智己"].map((brand, index) => (
              <div key={index} className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* About Section */}
      <AboutSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer Section */}
      <FooterSection />
    </div>
  )
}
