import { db } from "@/app/_lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  console.log({query})
  const productID = params.id;
  const product = await db.product.findUnique({
    where: { id: Number(productID) },
  });
  if (!product) {
    return Response.json("Product not found", { status: 404 });
  }
  return Response.json(product, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const productID = params.id;
  const product = await db.product.delete({
    where: { id: Number(productID) },
  });
  if (!product) {
    return Response.json("Product not found", { status: 404 });
  }
  return Response.json(product, { status: 200 });
}
