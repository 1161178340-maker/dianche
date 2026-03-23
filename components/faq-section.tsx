"use client"

import { useState } from "react"
import { HelpCircle, ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "智驾未来是什么？它如何帮助我选车？",
    answer: "智驾未来是一个AI驱动的新能源汽车智能推荐平台。通过自然语言对话，AI助手会深入了解您的购车需求（预算、用途、偏好等），然后在100+车型中进行智能匹配，为您推荐最适合的新能源汽车，并提供详细的对比分析和购买建议。"
  },
  {
    question: "使用智驾未来需要付费吗？",
    answer: "智驾未来的基础功能完全免费，包括AI对话咨询、车型推荐和基础对比功能。我们希望让每个人都能轻松获得专业的选车建议。高级功能如深度分析报告、专属顾问服务等可能需要付费，但基础使用永久免费。"
  },
  {
    question: "AI推荐的车型准确吗？会不会有品牌偏向？",
    answer: "我们的AI推荐系统基于客观数据和用户需求进行匹配，不会偏向任何品牌。我们收录了市面上主流的新能源汽车品牌和车型，包括比亚迪、特斯拉、蔚来、小鹏、理想等。推荐结果完全基于您的实际需求和车型的客观参数，确保中立公正。"
  },
  {
    question: "我对电动车完全不了解，能用智驾未来吗？",
    answer: "当然可以！智驾未来就是为像您这样的用户设计的。您不需要了解任何专业术语，只需要用日常语言描述您的需求，比如'我家有两个小孩，周末经常自驾游'或'主要市区代步，预算15万左右'。AI助手会用通俗易懂的方式为您解释各项参数，帮您做出明智的选择。"
  },
  {
    question: "智驾未来会保护我的隐私吗？",
    answer: "我们非常重视用户隐私。您与AI的对话内容仅用于为您提供个性化推荐，不会分享给第三方。我们采用行业标准的数据加密技术保护您的信息安全。您可以随时要求删除您的对话记录和个人数据。"
  },
  {
    question: "除了推荐车型，智驾未来还能提供什么服务？",
    answer: "除了车型推荐，智驾未来还提供：政策解读（各地新能源补贴、上牌政策等）、充电设施查询、续航分析（根据您的日常通勤计算实际续航需求）、试驾预约协助、购车优惠信息等。我们的目标是成为您购买新能源汽车的一站式服务平台。"
  }
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([0])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">常见问题</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              有问题？
              <br />
              我们来解答
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              这里汇集了用户最常问的问题。如果没有找到您想要的答案，欢迎直接与AI助手对话咨询。
            </p>
            <button className="mt-8 px-6 py-3 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors">
              更多问题？联系我们
            </button>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(index)

              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all ${
                    isOpen ? "bg-card border-primary/30" : "bg-card/50 border-border/50"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-6 flex items-start justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-foreground">{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
