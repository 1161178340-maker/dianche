import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { getPaymentStatus } from "@/lib/zpay"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://db.bikbmxqjwizdebrwvqla.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const order_id = searchParams.get("order_id")
    const extra_data = searchParams.get("extra_data")

    if (!order_id) {
      return NextResponse.redirect(new URL("/pricing?error=missing_order", req.url))
    }

    const payment = await getPaymentStatus(order_id)

    if (!payment) {
      return NextResponse.redirect(new URL("/pricing?error=payment_not_found", req.url))
    }

    if (payment.status === "succeeded") {
      return NextResponse.redirect(new URL("/dashboard?payment=success", req.url))
    }

    return NextResponse.redirect(new URL("/pricing?error=payment_failed", req.url))
  } catch (error) {
    console.error("支付结果处理失败:", error)
    return NextResponse.redirect(new URL("/pricing?error=server_error", req.url))
  }
}
