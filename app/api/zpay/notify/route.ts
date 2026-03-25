import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { verifyPayment } from "@/lib/zpay"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://db.bikbmxqjwizdebrwvqla.supabase.co"
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ""

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const { order_id, amount, sign, extra_data } = body

    if (!order_id || !amount || !sign) {
      return NextResponse.json({ success: false, message: "缺少必要参数" }, { status: 400 })
    }

    const isValid = await verifyPayment(order_id, amount, sign)

    if (!isValid) {
      return NextResponse.json({ success: false, message: "支付验证失败" }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "支付验证成功" }, { status: 200 })
  } catch (error) {
    console.error("支付回调处理失败:", error)
    return NextResponse.json({ success: false, message: "服务器错误" }, { status: 500 })
  }
}
