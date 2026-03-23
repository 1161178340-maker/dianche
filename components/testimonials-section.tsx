"use client"

import { useState, useEffect } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const testimonials = [
    {
      quote: "作为一个完全不懂车的人，智驾未来帮我在两周内就确定了心仪的车型。AI助手非常专业，解答了我所有关于续航和充电的疑问。最终入手了比亚迪汉EV，非常满意！",
      name: "张先生",
      role: "互联网从业者",
      location: "北京",
      car: "比亚迪汉EV",
      avatar: "/testimonial-avatar-1.jpg"
    },
    {
      quote: "之前在各个品牌之间纠结了很久，智驾未来的多维度对比功能让我看清了每款车的优缺点。而且AI还根据我的通勤距离推荐了最合适的续航版本，省了不少钱！",
      name: "李女士",
      role: "企业高管",
      location: "上海",
      car: "蔚来ES6",
      avatar: "/testimonial-avatar-2.jpg"
    },
    {
      quote: "第一次买电动车真的很迷茫，不知道该关注什么参数。智驾助手一步步引导我，从预算到用车场景都考虑到了。最后选了小鹏G6，开了半年体验很好。",
      name: "王先生",
      role: "自由职业者",
      location: "深圳",
      car: "小鹏G6",
      avatar: "/testimonial-avatar-3.jpg"
    },
    {
      quote: "给父母选车用的智驾未来，专门问了很多关于老年人用车的问题，AI都给了很实用的建议。最后选了五菱缤果，操作简单，续航够用，父母很喜欢！",
      name: "陈女士",
      role: "教师",
      location: "杭州",
      car: "五菱缤果",
      avatar: "/professional-woman-avatar-with-short-brown-hair-an.jpg"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 100)
      }, 300)
    }, 8000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleNavigationClick = (direction: "prev" | "next") => {
    setIsTransitioning(true)
    setTimeout(() => {
      if (direction === "prev") {
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      } else {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
      }
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 300)
  }

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">用户评价</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            听听他们怎么说
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            数十万用户通过智驾未来找到了心仪的新能源汽车
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-3xl border border-border/50 p-8 md:p-12">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/20" />
            
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <p
                className={`text-xl md:text-2xl text-foreground leading-relaxed transition-all duration-500 ${
                  isTransitioning ? "opacity-0 blur-sm" : "opacity-100 blur-0"
                }`}
              >
                "{testimonials[activeTestimonial].quote}"
              </p>

              {/* Author */}
              <div className={`mt-8 flex items-center gap-4 transition-all duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}>
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[activeTestimonial].role} · {testimonials[activeTestimonial].location}
                  </div>
                  <div className="text-sm text-primary">
                    购买车型：{testimonials[activeTestimonial].car}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 flex items-center gap-3">
              <button
                onClick={() => handleNavigationClick("prev")}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleNavigationClick("next")}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true)
                    setTimeout(() => {
                      setActiveTestimonial(index)
                      setTimeout(() => setIsTransitioning(false), 100)
                    }, 300)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeTestimonial ? "w-8 bg-primary" : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "4.9/5", label: "平均评分" },
            { value: "50万+", label: "服务用户" },
            { value: "98%", label: "推荐准确率" },
            { value: "85%", label: "首次推荐成交" }
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
