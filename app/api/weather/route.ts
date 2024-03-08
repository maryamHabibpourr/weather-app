import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const searchParams = req.nextUrl.searchParams;
    // const lat = searchParams.get("lat");
    // const lon = searchParams.get("lon");
    const lat =51.5074;
    const lon =  0.1278;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error in getting pollusion data ", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}
