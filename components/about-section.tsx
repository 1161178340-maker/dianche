"use client"

import { Leaf, Globe, Users, Award } from "lucide-react"

export default function AboutSection() {
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "50万+",
      label: "累计用户"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      value: "100+",
      label: "覆盖城市"
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: "98%",
      label: "推荐准确率"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      value: "绿色出行",
      label: "我们的使命"
    }
  ]

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">关于我们</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              让每个人都能轻松
              <br />
              <span className="gradient-text">选择新能源汽车</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              智驾未来是一个AI驱动的新能源汽车智能推荐平台。我们相信，选择一辆新能源汽车不应该是一件复杂的事情。通过先进的人工智能技术，我们帮助用户快速找到最适合自己的电动汽车。
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              我们的团队由汽车行业专家和AI技术专家组成，致力于打造最智能、最精准的选车助手。我们不仅提供车型推荐，更帮助用户理解新能源汽车的各项指标，做出明智的购车决策。
            </p>

            {/* Values */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { title: "专业", desc: "深耕新能源汽车领域" },
                { title: "中立", desc: "不偏向任何品牌" },
                { title: "智能", desc: "AI驱动精准推荐" },
                { title: "贴心", desc: "7×24小时在线服务" }
              ].map((value, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-2xl border border-border/50 text-center card-hover"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
                <div className="mt-4 text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 p-8 md:p-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl border border-border/50">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">我们的愿景</h3>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              加速全球向可持续能源的转变，让每一位用户都能轻松拥抱绿色出行。我们相信，通过技术的力量，可以让新能源汽车的选择变得简单、透明、高效，最终推动整个社会的绿色转型。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
